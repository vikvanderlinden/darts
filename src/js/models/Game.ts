import { User } from "./User";
import { Variant } from "./../game-variants/Variant";
import { BooleanSetting, GameState, Score, SelectionSetting } from "../datatypes";

export default class Game {
    private static SCORE_REGEX: RegExp = new RegExp("^([0-9]{1,2})$");

    private static _VARIANTS: Record<string, Variant> = {};

    public users: Array<User> = [];
    private _current_user: number = 0;
    private _winning_user: number = 0;

    private _game_state: GameState = GameState.INIT;
    private _round: number = 1;
    private _variant: Variant = null;

    private _auto_commit_turns: boolean = true;
    private _should_shuffle_users: boolean = false;

    private get state_init(): boolean {
        return this._game_state == GameState.INIT;
    }

    private get state_ready(): boolean {
        return this._game_state == GameState.READY;
    }

    private get state_started(): boolean {
        return this._game_state == GameState.STARTED;
    }

    private get state_paused(): boolean {
        return this._game_state == GameState.PAUSED;
    }

    private get state_finished(): boolean {
        return this._game_state == GameState.FINISHED;
    }

    public get can_change_settings(): boolean {
        return this.state_init || this.state_ready;
    }

    public get can_start(): boolean {
        return this.state_ready || this.state_paused;
    }

    public get can_reset(): boolean {
        return this.state_started || this.state_paused || this.state_finished;
    }

    public get show_score(): boolean {
        return this.state_ready || this.state_started || this.state_paused || this.state_finished;
    }

    public get round(): number {
        return this._round;
    }

    public get variant_settings(): Record<string,Array<BooleanSetting>|Array<SelectionSetting>> {
        return {
            "boolean": this._variant.boolean_settings,
            "selection": this._variant.selection_settings,
        }
    }

    public static register_variant(variant: Variant): void {
        Game._VARIANTS[variant.id] = variant;
    }

    public set_variant(variant_id: string) {
        if (!(variant_id in Game._VARIANTS)) {
            throw Error("Selected game variant should exist");
        }

        this._variant = Game._VARIANTS[variant_id];

        this.users.forEach(user => user.set_variant(this._variant));
        this._update_init_state();
    }

    public get variants() {
        return Object.values(Game._VARIANTS);
    }

    public get should_shuffle_users(): boolean {
        return this._should_shuffle_users;
    }

    public set should_shuffle_users(new_value: boolean) {
        this._should_shuffle_users = new_value;
    }

    public get auto_commit_turns(): boolean {
        return this._auto_commit_turns;
    }

    public set auto_commit_turns(new_value: boolean) {
        this._auto_commit_turns = new_value;
    }

    public get current_user(): number {
        return this._current_user;
    }

    public get winning_user(): number {
        return this._winning_user;
    }

    public get current_player(): User {
        return this.users[this._current_user];
    }

    public start(): void {
        if (!this.can_start) {
            throw Error("Cannot start the game at this moment");
        }

        if (this._variant === null) {
            throw Error("A game variant should be selected before starting the game");
        }

        if (this.users.length === 0) {
            throw Error("Users should be added to start a game");
        }

        if (this.should_shuffle_users && !this.state_paused) {
            shuffle_array(this.users);
        }

        this._game_state = GameState.STARTED;
    }

    public pause(): void {
        if (!this.state_started) {
            throw Error("Game can only be paused if it was started");
        }

        this._game_state = GameState.PAUSED;
    }

    public register_score(score: Score): void {
        if (!this.state_started) {
            throw Error("Game should be started to register a score");
        }

        if (!Game.SCORE_REGEX.test(score.value.toString())) {
            throw Error("Score must be a valid value");
        }

        this.current_player.add_throw({multiplier: score.multiplier, value: score.value});

        if (this.current_player.is_out) {
            this.current_player.commit_turn(this.round);
            this._game_state = GameState.FINISHED;
        }

        this.update_stats();
    }

    public register_bull(multiplier: number): void {
        if (!this.state_started) {
            throw Error("Game should be started to register a bull");
        }

        if (multiplier !== 1 && multiplier !== 2) {
            throw Error("Bull multiplier should be 1 or 2");
        }

        this._variant.register_bull(this, multiplier);
    }

    public register_miss(multiplier: number): void {
        if (!this.state_started) {
            throw Error("Game should be started to register a miss");
        }

        if (multiplier < 1 || multiplier > 3) {
            throw Error("The miss multiplier should be between 1 and 3");
        }

        if (multiplier + this.current_player.current_turn_length > this._variant.turn_length) {
            throw Error("Cannot enter more than 3 throws in total");
        }

        for (let i = 0; i < multiplier; i++) {
            this.register_score({multiplier:0,value:0});
        }
    }

    public delete_previous(): void {
        if (!this.state_started) {
            throw Error("Game should be started to delete a throw");
        }

        this.current_player.delete_throw();
        this.update_stats();
    }

    public next_user(): void {
        if (!this.state_started) {
            throw Error("Game should be started to advance the user");
        }

        this.current_player.commit_turn(this._round);

        if (++this._current_user >= this.users.length) {
            this._current_user = 0;
            this._round++;
        }

        this.update_stats();
    }

    private update_stats(): void {
        if (this._auto_commit_turns &&
            this.current_player.current_turn_length === this._variant.turn_length) {

            this.current_player.commit_turn(this._round);

            if (++this._current_user >= this.users.length) {
                this._current_user = 0;
                this._round++;
            }
        }

        this._calculate_prelim_winner();
    }

    private _calculate_prelim_winner(): void {
        let lowest_score = Infinity;
        let lowest_index = 0;

        this.users.forEach((v,i) => {
            if (v.score < lowest_score) {
                lowest_score = v.score;
                lowest_index = i;
            }
        });

        this._winning_user = lowest_index;
    }

    public current_turn_calculation(): string {
        if (this.users.length === 0) {
            return "Add users to start a game";
        }

        if (this._variant === null) {
            return "Select a game variant";
        }

        if (this.state_finished) {
            return `Congrats, ${this.users[this._winning_user].name} won!`;
        }

        if (!this.state_started) {
            return "Start the game";
        }

        return this.current_player.current_turn_calculation();
    }

    public reset(): void {
        if (!this.can_reset) {
            throw Error("Cannot reset at this moment");
        }

        this._current_user = 0;
        this._game_state = GameState.READY;
        this._round = 1;

        this.users.forEach(user => user.reset());

        this._calculate_prelim_winner();
    }

    public add_user(name: string): void {
        if (!this.can_change_settings) {
            throw Error("Cannot add users when game is active");
        }

        let existing_names: Array<string> = this.users.map((e) => e["name"]);
        if (existing_names.indexOf(name) > -1) {
            throw Error("This name already exists, please use another one");
        }

        if (this._variant === null) {
            throw Error("Select a game variant before adding users");
        }

        this.users.push(new User(name, this._variant));
        this._update_init_state();
    }

    public remove_user(user: User): void {
        if (!this.can_change_settings) {
            throw Error("Cannot remove users when game is active");
        }

        let user_index: number = this.users.indexOf(user);
        if (user_index === -1) {
            throw Error("Cannot remove non-existing user");
        }

        this.users.splice(user_index, 1);
        this._update_init_state();
    }

    private _update_init_state(): void {
        if (!this.can_change_settings) {
            throw Error("Cannot change state");
        }

        if (this.users.length > 0 && this._variant !== null) {
            this._game_state = GameState.READY;
        } else {
            this._game_state = GameState.INIT;
        }
    }
}

// Adapted from: https://stackoverflow.com/a/2450976
function shuffle_array(array: Array<any>): Array<any> {
    let currentIndex: number = array.length;
    let randomIndex: number;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

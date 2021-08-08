import { User } from "./User";
import { Variant } from "./../game-variants/Variant";

type Score = {
    multiplier: number,
    value: number,
};

enum GameState {
    INIT,   // Not ready to start
    READY,  // Ready to start
    STARTED,// Game running
    PAUSED, // Game stopped temporarily
    FINISHED// Game done, somebody won
};

export default class Game {
    private static SCORE_REGEX: RegExp = new RegExp("^([0-9]{1,2}|ib|ob)$");

    private static VARIANTS: Record<string, Variant> = {};

    public users: Array<User> = [];
    public current_user: number = 0;
    public winning_user: number = 0;

    private _game_state: GameState = GameState.INIT;
    private _round: number = 1;
    private _variant: Variant = null;

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

    public static register_variant(variant: Variant): void {
        Game.VARIANTS[variant.id] = variant;
    }

    public set_variant(variant_id: string) {
        this._variant = Game.VARIANTS[variant_id];

        this.users.forEach(user => user.set_variant(this._variant));
        this._update_init_state();
    }

    public get current_player(): User {
        return this.users[this.current_user];
    }

    // public get can_start(): boolean {
    //     return (this.users.length > 0) && (this._variant !== null);
    // }

    public start(should_shuffle: boolean): void {
        if (this._variant === null) {
            throw Error("A game variant should be selected before starting the game");
        }

        console.log("playing " + this._variant.human_name);
        if (should_shuffle) shuffle_array(this.users);
        this._game_state = GameState.STARTED;
    }

    public pause(): void {
        this._game_state = GameState.PAUSED;
    }

    public register_score(score: Score): void {
        if (!Game.SCORE_REGEX.test(score.value.toString())) {
            throw Error("Score must be valid value");
        }

        // if (score.value === "ib") {
        //     score.value = 50;
        // } else if (score.value === "ob") {
        //     score.value = 25;
        // }

        this.current_player.add_throw({multiplier: score.multiplier, value: score.value});
        this.update_stats();

        if (this.current_player.updated_score == 0) {
            this.current_player.commit_play(this.round);
            this._game_state = GameState.FINISHED;
        }
    }

    public register_miss(): void {
        this.register_score({multiplier: 0,value:0});
    }

    public delete_previous(): void {
        this.current_player.delete_throw();
        this.update_stats();
    }

    public next_user(): void {
        this.current_player.commit_play(this._round);

        if (++this.current_user >= this.users.length) {
            this.current_user = 0;
            this._round++;
        }

        this.update_stats();
    }

    private update_stats(): void {
        // if (this.current_play.length == 3) {
            // this.current_player.commit_play(this.round);

            // if (++this.current_user >= this.users.length) {
            //     this.current_user = 0;
            //     this.round++;
            // }

            // this.current_play = [];
        // }

        this.calculate_prelim_winner();
    }

    private calculate_prelim_winner(): void {
        let lowest_score = Infinity;
        let lowest_index = 0;

        this.users.forEach((v,i) => {
            if (v.score < lowest_score) {
                lowest_score = v.score;
                lowest_index = i;
            }
        });

        this.winning_user = lowest_index;
    }

    public current_play_score(): number {
        return this.current_player.current_play_score();
    }

    public current_play_calculation(): string {
        if (!this.state_started) {
            return "Start the game";
        }

        if (this._variant === null) {
            return "Select a game variant";
        }

        if (this.state_finished) {
            return `Congrats, ${this.users[this.winning_user].name} won!`;
        }

        return this.current_player.current_play_calculation();
    }

    public reset(): void {
        if (!this.can_reset) {
            throw Error("Cannot reset at this moment");
        }

        this.current_user = 0;

        this._game_state = GameState.READY;
        this._round = 1;

        this.users.forEach(user => user.reset());

        this.calculate_prelim_winner();
    }

    public add_user(name: string): void {
        if (!this.can_change_settings) {
            throw Error("Cannot add users when game is active");
        }

        let existing_names: Array<string> = this.users.map((e) => e["name"]);
        if (existing_names.indexOf(name) > -1) {
            throw Error("This name already exists, please use another one");
        }

        this.users.push(new User(name));
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

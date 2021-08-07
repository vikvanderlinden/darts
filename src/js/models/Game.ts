import { User } from "./User";
import { Variant } from "./../game-variants/Variant";

type Score = {
    multiplier: number,
    value: number,
};

export default class Game {
    private static SCORE_REGEX: RegExp = new RegExp("^([0-9]{1,2}|ib|ob)$");

    private static VARIANTS: Record<string, Variant> = {};

    public users: Array<User> = [];
    public current_user: number = 0;
    public winning_user: number = 0;

    public game_started: Boolean = false;
    public round: number = 1;
    public current_play: Array<Score> = [];
    public variant: Variant = null;

    public get current_player(): User {
        return this.users[this.current_user];
    }

    public static register_variant(variant: Variant): void {
        Game.VARIANTS[variant.id] = variant;
    }

    public set_variant(variant_id: string) {
        this.variant = Game.VARIANTS[variant_id];
    }

    public get can_start(): boolean {
        return this.users.length > 0;
    }

    start(should_shuffle: boolean): void {
        console.log("playing " + this.variant.human_name);
        if (should_shuffle) shuffle_array(this.users);
        this.game_started = true;
    }

    end(): void {
        this.game_started = false;
    }

    register_score(score: Score): void {
        if (!Game.SCORE_REGEX.test(score.value.toString())) {
            throw Error("Score must be valid value");
        }

        // if (score.value === "ib") {
        //     score.value = 50;
        // } else if (score.value === "ob") {
        //     score.value = 25;
        // }

        this.current_play.push({multiplier: score.multiplier, value: score.value});
        this.update_stats();
    }

    register_miss(): void {
        this.register_score({multiplier: 0,value:0});
    }

    delete_previous(): void {
        this.current_play.pop();
        this.update_stats();
    }

    next_user(): void {
        // If current play empty, indicated skipped turn

        this.current_player.register_score(this.round, this.current_play);

        if (++this.current_user >= this.users.length) {
            this.current_user = 0;
            this.round++;
        }

        this.current_play = [];
        this.update_stats();
    }

    update_stats(): void {
        if (this.current_play.length == 3) {
            // this.users[this.current_user].register_score(this.round, this.current_play);

            // if (++this.current_user >= this.users.length) {
            //     this.current_user = 0;
            //     this.round++;
            // }

            // this.current_play = [];
        }

        this.calculate_prelim_winner();
    }

    calculate_prelim_winner(): void {
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

    current_play_score(): number {
        return this.current_play.reduce((p, c) => p + c.multiplier * c.value, 0);
    }

    current_play_calculation(): string {
        if (!this.game_started) {
            return "Start the game";
        }

        if (this.current_play.length == 0) {
            return `Throw your darts, ${this.current_player.name}`;
        }

        let mapper = (s: Score) => ((s.multiplier > 1) ? `${s.multiplier}x` : '') + s.value.toString();
        let calculation: string =
            this.current_play
                .map(mapper)
                .join(" + ");

        return `${calculation} = ${this.current_play_score()}`;
    }

    reset(): void {
        this.current_user = 0;

        this.game_started = false;
        this.round = 1;
        this.current_play = [];

        this.users.forEach(user => user.reset());

        this.calculate_prelim_winner();
    }

    add_user(name: string): void {
        if (this.game_started) {
            throw Error("Cannot add users when game is active");
        }

        let existing_names: Array<string> = this.users.map((e) => e["name"]);
        if (existing_names.indexOf(name) > -1) {
            throw Error("This name already exists, please use another one");
        }

        this.users.push(new User(name));
    }

    remove_user(user: User): void {
        if (this.game_started) {
            throw Error("Cannot remove users when game is active");
        }

        let user_index: number = this.users.indexOf(user);
        if (user_index === -1) {
            throw Error("Cannot remove non-existing user");
        }

        this.users.splice(user_index, 1);
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

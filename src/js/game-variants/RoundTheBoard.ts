import { Variant, Score } from "./Variant";
import Game from "./../models/Game";
import { User } from "./../models/User";

export default class RoundTheBoard implements Variant {
    private _id: string = "round-the-board";
    private _human_name: string = "Round the Board";

    private _init_score: number = 20;
    private _turn_length: number = 3;
    private _keyboard_disabled_keys: Array<string> = [];

    constructor() {
        this.register();
    }

    get id(): string {
        return this._id;
    }

    get human_name(): string {
        return this._human_name;
    }

    get init_score(): number {
        return this._init_score;
    }

    get turn_length(): number {
        return this._turn_length;
    }

    get keyboard_disabled_keys(): Array<string> {
        return this._keyboard_disabled_keys;
    }

    register(): void {
        Game.register_variant(this);
    }

    register_bull(game: Game, multiplier: number): void {
        throw Error("Bull has no value in this game");
    }

    is_out(user: User): boolean {
        return user.score === 0 ||
            (user.score == user.current_turn_score() &&
            this.is_valid_end_turn(user));
    }

    is_valid_end_turn(user: User): boolean {
        return true;
    }

    current_turn_is_bust(user: User): boolean {
        return false;
    }

    current_turn_score(user: User): number {
        let values = user.current_turn.map((s: Score) => s.value);
        let current_score = 0;

        for (let value of values) {
            if (value === user.score - current_score) {
                current_score++;
            }
        }

        return current_score;
    }

    current_turn_calculation(user: User): string {
        let calculation: string =
            user.current_turn
                .map((s: Score) => s.value.toString())
                .join(" + ");

        return `${calculation} = ${user.current_turn_score()}`;

    }
}

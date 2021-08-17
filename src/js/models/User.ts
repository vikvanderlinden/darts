import { Variant } from "./../game-variants/Variant";
import { Score } from "../datatypes";

export class User {
    private static NAME_REGEX: RegExp = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9-_ ]{0,19}$');

    private _name: string;
    private _score: number;
    private _current_turn: Array<Score> = [];
    private _history: Record<number,Array<Score>> = {};
    private _variant: Variant = null;

    public constructor(name: string, variant: Variant) {
        if (!User.NAME_REGEX.test(name)) {
            throw Error("The name must be alphanumeric with spaces, - or _ and max 20 characters");
        }

        this._name = name;
        this._variant = variant;
        this._score = this._variant.init_score;
    }

    public set_variant(variant: Variant): void {
        this._variant = variant;

        this.reset();
    }

    public get name(): string {
        return this._name;
    }

    public get score(): number {
        return this._score;
    }

    public get current_turn(): Array<Score> {
        return this._current_turn;
    }

    public get current_turn_length(): number {
        return this._current_turn.length;
    }

    public get updated_score(): number {
        return this.score - this.current_turn_score();
    }

    public reset(): void {
        this._score = this._variant.init_score;
        this._current_turn = [];
        this._history = {};
    }

    public get is_out(): boolean {
        return this._variant.is_out(this);
    }

    public commit_turn(round: number): void {
        let score: number = this.current_turn_score();

        this._history[round] = this._current_turn;

        if (!this._variant.current_turn_is_bust(this)) {
            this._score -= score;
        }

        this._current_turn = [];
    }

    private _is_valid_end_turn(): boolean {
        return this._variant.is_valid_end_turn(this);
    }

    public add_throw(new_throw: Score): void {
        if (this.current_turn_length === this._variant.turn_length) {
            throw Error("Max number of throws done");
        }

        if (new_throw.multiplier < 0 || new_throw.multiplier > 3) {
            throw Error("The score multiplier should be between 0 and 3");
        }

        this._current_turn.push(new_throw);
    }

    public delete_throw(): void {
        if (this.current_turn_length === 0) {
            throw Error("Cannot delete a throw when none are entered");
        }

        this._current_turn.pop();
    }

    public current_turn_score(): number {
        return this._variant.current_turn_score(this);
    }

    public current_turn_calculation(): string {
        if (this._current_turn.length == 0) {
            return `Throw your dart${this._variant.turn_length === 1 ? '' : 's'}, ${this.name}`;
        }

        return this._variant.current_turn_calculation(this);
    }

    public can_finish(): boolean {
        return false;
    }

    public next_throws_suggestion(): string {
        return "";
    }
}

import { Variant } from "./../game-variants/Variant";

type Score = {
    multiplier: number,
    value: number,
};

export class User {
    private static NAME_REGEX: RegExp = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9-_ ]{0,19}$');

    private _name: string;
    private _score: number;
    private _current_play: Array<Score> = [];
    private _history: Record<number,Array<Score>> = {};
    private _variant: Variant = null;

    public constructor(name: string) {
        if (!User.NAME_REGEX.test(name)) {
            throw Error("The name must be alphanumeric with - or _ and max 20 characters");
        }

        this._name = name;
        this._score = 501;
    }

    public set_variant(variant: Variant): void {
        this._variant = variant;
    }

    public get name(): string {
        return this._name;
    }

    public get score(): number {
        return this._score;
    }

    public get current_play_length(): number {
        return this._current_play.length;
    }

    public get updated_score(): number {
        return this.score - this.current_play_score();
    }

    public reset(): void {
        this._score = 501;
        this._current_play = [];
        this._history = {};
    }

    public get is_out(): boolean {
        return this._score === 0 ||
                (this.current_play_score() === this._score &&
                this._is_valid_endplay());
    }

    public commit_play(round: number): void {
        let score: number = this.current_play_score();

        this._history[round] = this._current_play;

        if ((this._score - score > 1) ||
            (score === this._score && this._is_valid_endplay())) {
            this._score -= score;
        }

        this._current_play = [];
    }

    private _is_valid_endplay(): boolean {
        return this._current_play.filter(s => s.multiplier === 2).length > 0;
    }

    public add_throw(new_throw: Score): void {
        this._current_play.push(new_throw);
    }

    public delete_throw(): void {
        this._current_play.pop();
    }

    public current_play_score(): number {
        return this._current_play.reduce((p, c) => p + c.multiplier * c.value, 0);
    }

    public current_play_calculation(): string {
        if (this._current_play.length == 0) {
            return `Throw your darts, ${this.name}`;
        }

        let mapper = (s: Score) => ((s.multiplier > 1) ? `${s.multiplier}x` : '') + s.value.toString();
        let calculation: string =
            this._current_play
                .map(mapper)
                .join(" + ");

        return `${calculation} = ${this.current_play_score()}`;
    }
}

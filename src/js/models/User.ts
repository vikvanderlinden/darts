type Score = {
    multiplier: number,
    value: number,
};

export class User {
    private static NAME_REGEX: RegExp = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9-_ ]{0,19}$');

    private _name: string;
    private _score: number;
    private _history: Record<number,number> = {};

    public constructor(name: string) {
        if (!User.NAME_REGEX.test(name)) {
            throw Error("The name must be alphanumeric with - or _ and max 20 characters");
        }

        this._name = name;
        this._score = 501;
    }

    public get name() {
        return this._name;
    }

    public get score() {
        return this._score;
    }

    public reset(): void {
        this._score = 501;
        this._history = {};
    }

    public register_score(round: number, play: Array<Score>): void {
        let score: number = play.reduce((p:number,c:Score) => p + c.multiplier*c.value,0);

        this._history[round] = score;

        if (score <= this._score) {
            this._score -= score;
        }
    }
}

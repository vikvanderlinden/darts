type Score = {
    multiplier: number,
    value: number,
};

export class User {
    name: string;
    score: number;
    history: Record<number,number>;

    constructor(name: string) {
        this.name = name;
        this.score = 501;
        this.history = {};
    }

    reset() {
        this.score = 501;
        this.history = {};
    }

    register_score(round: number, play: Array<Score>) {
        let score:number = play.reduce((p:number,c:Score) => p + c.multiplier*c.value,0);

        this.history[round] = score;

        if (score <= this.score) {
            this.score -= score;
        }
    }
}

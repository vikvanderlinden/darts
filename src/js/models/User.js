export default class User {
    constructor(name) {
        this.name = name;
        this.score = 501;
        this.history = {};
    }

    reset() {
        this.score = 501;
        this.history = {};
    }

    register_score(round, play) {
        let score = play.reduce((p,c) => p + c.multiplier*c.value,0);

        this.history[round] = score;

        if (score <= this.score) {
            this.score -= score;
        }
    }
}

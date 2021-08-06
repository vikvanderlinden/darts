import User from "@/models/User.js";

export default class Game {
    #score_regex;
    #name_regex;

    constructor() {
        this.#score_regex = new RegExp("^([0-9]{1,2}|ib|ob)$");
        this.#name_regex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9-_ ]{0,19}$');

        this.users = [];
        this.current_user = 0;
        this.winning_user = 0;

        this.game_started = false;
        this.round = 1;
        this.current_play = [];
    }

    can_start_game() {
        return this.users.length > 0;
    }

    start(should_shuffle) {
        if (should_shuffle) shuffle_array(this.users);
        this.game_started = true;
    }

    end() {
        this.game_started = false;
    }

    register_score(score) {
        if (this.#score_regex.test(score.value) === -1) {
            throw Error("Score must be valid value");
        }

        if (score.value === "ib") {
            score.value = 50;
        } else if (score.value === "ob") {
            score.value = 25;
        }

        this.current_play.push({multiplier: score.multiplier, value: score.value});
        this.update_stats();
    }

    register_miss() {
        this.register_score({multiplier: 0,value:0});
    }

    delete_previous() {
        this.current_play.pop();
        this.update_stats();
    }

    next_user() {
        // If current play empty, indicated skipped turn

        this.users[this.current_user].register_score(this.round, this.current_play);

        if (++this.current_user >= this.users.length) {
            this.current_user = 0;
            this.round++;
        }

        this.current_play = [];
        this.update_stats();
    }

    update_stats() {
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

    calculate_prelim_winner() {
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

    current_play_score() {
        return this.current_play.reduce((p, c) => p + c.multiplier * c.value, 0);
    }

    current_play_calculation() {
        if (!this.game_started) {
            return "Start the game";
        }

        if (this.current_play.length == 0) {
            return `Throw your darts, ${this.users[this.current_user].name}`;
        }

        let calculations = [];
        let total_score = 0;

        this.current_play.forEach((s) => {
            calculations.push((s.multiplier > 1) ? `${s.multiplier}x${s.value}` : `${s.value}`);
            total_score += s.value * s.multiplier;
        });

        return `${calculations.join(" + ")} = ${total_score}`;
    }

    add_user(name) {
        if (this.game_started) {
            throw Error("Cannot add users when game is active");
        }

        if (!this.#name_regex.test(name)) {
            throw Error("The name must be alphanumeric with dashes or underscores and max 20 characters");
        }

        let existing_names = this.users.map((e) => e["name"]);
        if (existing_names.indexOf(name) > -1) {
            throw Error("This name already exists, use another one");
        }

        this.users.push(new User(name));
    }

    remove_user(user) {
        if (this.game_started) {
            throw Error("Cannot remove users when game is active");
        }

        let user_index = this.users.indexOf(user);
        if (user_index === -1) {
            throw Error("Cannot remove non-existing user");
        }

        this.users.splice(user_index, 1);
    }

    reset() {
        this.current_user = 0;

        this.game_started = false;
        this.round = 1;
        this.current_play = [];

        this.users.forEach(user => user.reset());

        this.calculate_prelim_winner();
    }
}

// Adapted from: https://stackoverflow.com/a/2450976
function shuffle_array(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

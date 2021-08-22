import { Variant } from "./Variant";
import Game from "./../models/Game";
import { User } from "./../models/User";
import { BooleanSetting, Score, SelectionSetting } from "../datatypes";

export default class OhOneGames implements Variant {
    private _id = "01-games";
    private _human_name = "'01 Games";

    private _init_score: number;
    private _turn_length: number = 3;
    private _keyboard_disabled_keys: Array<string> = [];

    private _boolean_settings: Record<string,BooleanSetting> = {
        "double-in": {
            title: "Double In",
            default_value: false,
            selected_value: false,
        },
        "double-out": {
            title: "Double Out",
            default_value: true,
            selected_value: true,
        },
    };
    private _selection_settings: Record<string,SelectionSetting> = {
        "init-score": {
            title: "Starting Score",
            options: [101,301,501,701,901],
            default_value: 501,
            selected_value: 501,
        },
    };

    constructor(init_score?: number) {
        this._init_score = init_score ?? 501;

        this.register();
    }

    get id(): string {
        return this._id;
    }

    get human_name(): string {
        return this._human_name;
    }

    get init_score(): number {
        return this.selection_settings["init-score"].selected_value;
    }

    get turn_length(): number {
        return this._turn_length;
    }

    get keyboard_disabled_keys(): Array<string> {
        return this._keyboard_disabled_keys;
    }

    get boolean_settings(): Record<string,BooleanSetting> {
        return this._boolean_settings;
    }

    get selection_settings(): Record<string,SelectionSetting> {
        return this._selection_settings;
    }

    register(): void {
        Game.register_variant(this);
    }

    toggle_bool(id: string): void {
        if (!Object.keys(this._boolean_settings).includes(id)) {
            throw Error("This setting does not exist");
        }

        let current_value = this._boolean_settings[id].selected_value;
        this._boolean_settings[id].selected_value = !current_value;
    }

    set_selection(id: string, value: string): void {
        if (!Object.keys(this._selection_settings).includes(id)) {
            throw Error("This setting does not exist");
        }

        if (!this._selection_settings[id].options.map(i=>i.toString()).includes(value)) {
            throw Error("This is not a valid option");
        }

        this._selection_settings[id].selected_value = parseInt(value);
    }

    register_bull(game: Game, multiplier: number): void {
        game.register_score({
            multiplier: multiplier,
            value: 25
        });
    }

    is_out(user: User): boolean {
        return user.score === 0 ||
            (user.current_turn_score() === user.score &&
                this.is_valid_end_turn(user));
    }

    is_valid_start_turn(user: User): boolean {
        if (this.boolean_settings["double-in"].selected_value) {
            return user.current_turn.filter(value => value.multiplier === 2).length > 0;
        } else {
            return true;
        }
    }

    is_valid_end_turn(user: User): boolean {
        if (this.boolean_settings["double-out"].selected_value) {
            return user.current_turn[user.current_turn_length - 1].multiplier === 2;
        } else {
            return true;
        }
    }

    current_turn_is_bust(user: User): boolean {
        let new_score = user.score - user.current_turn_score();

        return new_score === 1 || new_score < 0 ||
            (new_score === 0 && !this.is_valid_end_turn(user));
    }

    current_turn_score(user: User): number {
        let valid_throws = user.current_turn;

        if (user.score === this.init_score && this.boolean_settings["double-in"].selected_value) {
            let doubled_in = false;
            valid_throws = valid_throws.filter(value => {
                if (value.multiplier === 2) {
                    doubled_in = true;
                }
                return doubled_in;
            });
        }
        return valid_throws.reduce((p, c) => p + c.multiplier * c.value, 0);
    }

    current_turn_calculation(user: User): string {
        const multipliers: Record<number, string> = {
            0: '',
            1: 'S',
            2: 'D',
            3: 'T'
        };

        let mapper = (s: Score) => {
            let value: string = (s.value == 25) ? "B" : s.value.toString();
            return `${multipliers[s.multiplier]}${value}`;
        }
        let calculation: string =
            user.current_turn
                .map(mapper)
                .join(" + ");

        return `${calculation} = ${user.current_turn_score()}`;
    }
}

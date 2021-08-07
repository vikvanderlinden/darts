import { Variant } from "./Variant";
import Game from "./../models/Game";

export default class OhOneGames implements Variant {
    _id = "01-games";
    _human_name = "'01 Games";

    _init_score: number;
    _keyboard_disabled_keys: Array<string> = [];

    constructor(init_score: number) {
        this._init_score = init_score;

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

    get keyboard_disabled_keys(): Array<string> {
        return this._keyboard_disabled_keys;
    }

    register(): void {
        Game.register_variant(this);
    }
}

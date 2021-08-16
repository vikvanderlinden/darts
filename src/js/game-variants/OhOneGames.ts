import { Variant, Score } from "./Variant";
import Game from "./../models/Game";
import { User } from "./../models/User";

export default class OhOneGames implements Variant {
    private _id = "01-games";
    private _human_name = "'01 Games";

    private _init_score: number;
    private _turn_length: number = 3;
    private _keyboard_disabled_keys: Array<string> = [];

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
        game.register_score({
            multiplier: 1,
            value: multiplier * 25
        });
    }

    is_out(user: User): boolean {
        return user.score === 0 ||
            (user.current_turn_score() === user.score &&
                this.is_valid_end_turn(user));
    }

    is_valid_end_turn(user: User): boolean {
        return user.current_turn[user.current_turn_length - 1].multiplier === 2;
    }

    current_turn_is_bust(user: User): boolean {
        let new_score = user.score - user.current_turn_score();

        return new_score === 1 || new_score < 0 ||
            (new_score === 0 && !this.is_valid_end_turn(user));
    }

    current_turn_score(user: User): number {
        return user.current_turn.reduce((p, c) => p + c.multiplier * c.value, 0);
    }

    current_turn_calculation(user: User): string {
        const multipliers: Record<number, string> = {
            0: '',
            1: 'S',
            2: 'D',
            3: 'T'
        };

        let mapper = (s: Score) => `${multipliers[s.multiplier]}${s.value.toString()}`;
        let calculation: string =
            user.current_turn
                .map(mapper)
                .join(" + ");

        return `${calculation} = ${user.current_turn_score()}`;
    }
}

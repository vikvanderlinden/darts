import { BooleanSetting, SelectionSetting } from "../datatypes";
import Game from "./../models/Game";
import { User } from "./../models/User";

// Acts as abstract class/interface to define
//  functions to be implemented by each variant
//  of the game.
export abstract class Variant {
    abstract get id(): string;
    abstract get human_name(): string;

    abstract get init_score(): number;
    abstract get turn_length(): number;
    abstract get keyboard_disabled_keys(): Array<string>;

    abstract get boolean_settings(): Record<string,BooleanSetting>;
    abstract get selection_settings(): Record<string,SelectionSetting>;

    register(): void {
        Game.register_variant(this);
    }

    abstract toggle_bool(id: string): void;
    abstract set_selection(id: string, value: string): void;

    abstract register_bull(game: Game, multiplier: number): void;
    abstract is_out(user: User): boolean;
    abstract is_valid_start_turn(user: User): boolean;
    abstract is_valid_end_turn(user: User): boolean;
    abstract current_turn_is_bust(user: User): boolean;
    abstract current_turn_score(user: User): number;
    abstract current_turn_calculation(user: User): string;
}

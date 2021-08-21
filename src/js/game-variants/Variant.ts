import { BooleanSetting, SelectionSetting } from "../datatypes";
import Game from "./../models/Game";
import { User } from "./../models/User";

// Acts as abstract class/interface to define
//  functions to be implemented by each variant
//  of the game.
export interface Variant {
    get id(): string;
    get human_name(): string;

    get init_score(): number;
    get turn_length(): number;
    get keyboard_disabled_keys(): Array<string>;

    get boolean_settings(): Record<string,BooleanSetting>;
    get selection_settings(): Record<string,SelectionSetting>;

    register(): void;

    toggle_bool(id: string): void;
    set_selection(id: string, value: string): void;

    register_bull(game: Game, multiplier: number): void;
    is_out(user: User): boolean;
    is_valid_start_turn(user: User): boolean;
    is_valid_end_turn(user: User): boolean;
    current_turn_is_bust(user: User): boolean;
    current_turn_score(user: User): number;
    current_turn_calculation(user: User): string;
}

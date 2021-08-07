// Acts as abstract class/interface to define
//  functions to be implemented by each variant
//  of the game.
export interface Variant {
    get id(): string;
    get human_name(): string;

    get init_score(): number;
    get keyboard_disabled_keys(): Array<string>;

    register(): void;
}

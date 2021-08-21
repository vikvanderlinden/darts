export enum GameState {
    INIT,   // Not ready to start
    READY,  // Ready to start
    STARTED,// Game running
    PAUSED, // Game stopped temporarily
    FINISHED// Game done, somebody won
};

export type Score = {
    multiplier: number,
    value: number,
};

type Setting<DataType> = {
    title: string,
    default_value: DataType,
    selected_value: DataType,
};

export type BooleanSetting = Setting<boolean>;
export type SelectionSetting = Setting<number> & {options: Array<number>};

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

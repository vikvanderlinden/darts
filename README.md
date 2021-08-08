# Darts Score Counter

This is a very simple score counter for some games of darts.

The rules implemented have been taken from [https://www.darting.com/Darts-Rules/](https://www.darting.com/Darts-Rules/)


## State Machine

```
INIT -> READY -> STARTED -> PAUSED
          ^       |   ^  ----|------> FINISHED
          |_______|   |______|         |
          |__________________|         |
          |____________________________|
            reset
```

1. `INIT`
    - Have to add users
    - Have to select game variant
    - Game cannot be played
    - Can change settings

2. `READY`
    - Start button shown
    - Game cannot be played
    - Can change settings

3. `STARTED`
    - Pause button shown
    - Reset button shown
    - Game can be played
    - Cannot change settings

4. `PAUSED`
    - Continue button shown
    - Reset button shown
    - Game cannot be played
    - Cannot change settings

5. `FINISHED`
    - One player has won
    - Reset button shown
    - Game cannot be played
    - Cannot change settings

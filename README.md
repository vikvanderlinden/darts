
[![MIT License](https://badgen.net/badge/license/MIT/blue)](https://github.com/vikvanderlinden/darts/blob/main/LICENSE)
[![Version](https://badgen.net/github/release/vikvanderlinden/darts)](https://github.com/vikvanderlinden/darts/)
[![Open Issues](https://badgen.net/github/open-issues/vikvanderlinden/darts)](https://github.com/vikvanderlinden/darts/issues)

# Darts

This is a very simple score counter for some games of darts.

The rules implemented have been taken from [https://www.darting.com/Darts-Rules/](https://www.darting.com/Darts-Rules/)

## Local setup

1. Install docker
2. install VS Code
3. Install devcontainers plugin (`ms-vscode-remote.remote-containers`, also included in `ms-vscode-remote.vscode-remote-extensionpack`)
4. Open project in devcontainer
5. Run run.sh: `./run.sh` (you might have to `chmod +x run.sh` first)
6. Go to http://127.0.0.1:8888

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

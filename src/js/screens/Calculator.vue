<template>
    <div>
        <Settings :game="game" @close="settings_modal_open=false" :open="settings_modal_open"></Settings>
        <div class="max-w-sm mx-auto p-4 text-center">
            <a
                class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="settings_modal_open=true">Settings</a>
            <a
                :class="{'bg-red-700 hover:bg-red-800': game.can_start, 'bg-gray-800 pointer-events-none cursor-default': !game.can_start}"
                class="ml-2 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="game.reset()">Reset Game</a>
            <a
                v-if="!game.game_started"
                :class="{'bg-green-700 hover:bg-green-800': game.can_start, 'bg-gray-800 pointer-events-none cursor-default': !game.can_start}"
                class="ml-2 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="start_game">Start Game</a>
            <a
                v-else
                class="ml-2 bg-red-700 hover:bg-red-800 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="end_game">End Game</a>
        </div>
        <div class="md:flex items-center">
            <ScoreCounter :game="game"></ScoreCounter>
            <ScoreInput
                @score="enter_score"
                @next="go_next"
                @miss="enter_miss"
                @del="bksp"
                :class="{'pointer-events-none opacity-50': !game.game_started}"></ScoreInput>
        </div>
    </div>
</template>

<script>
    import Settings from "@/screens/Settings.vue";
    import ScoreCounter from "@/components/ScoreCounter.vue";
    import ScoreInput from "@/components/ScoreInput.vue";
    import Game from "@/models/Game.ts";
    import OhOneGames from "@/game-variants/OhOneGames.ts";

    export default {
        name: "calculator-screen",
        data() {
            let game = new Game();
            let variants = [
                new OhOneGames(),
            ];

            game.set_variant("01-games");

            return {
                game,
                settings_modal_open: false,
            };
        },
        components: {
            Settings,
            ScoreCounter,
            ScoreInput
        },
        methods: {
            start_game() {
                if (this.game.can_start) {
                    this.game.start(this.should_shuffle_users);
                }
            },
            end_game() {
                this.game.end();
            },
            enter_score(score) {
                this.game.register_score(score);
            },
            enter_miss() {
                this.game.register_miss();
            },
            go_next() {
                this.game.next_user();
            },
            bksp() {
                this.game.delete_previous();
            },
        }
    };
</script>

<style scoped></style>

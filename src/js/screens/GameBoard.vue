<template>
    <div class="max-h-screen md:h-screen md:flex md:flex-col">
        <div class="max-w-md mx-auto py-4 px-1 text-center">
            <router-link
                class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded inline-block"
                to="/settings">Settings</router-link>
            <button
                :class="{'bg-red-700 hover:bg-red-800': game.can_reset, 'bg-gray-800 pointer-events-none cursor-default': !game.can_reset}"
                class="ml-1 px-3 py-2 rounded inline-block"
                @click.stop.prevent="reset_game">Reset Game</button>
            <button
                v-if="!game.state_started"
                :class="{'bg-green-700 hover:bg-green-800': game.can_start, 'bg-gray-800 pointer-events-none cursor-default': !game.can_start}"
                class="ml-1 px-3 py-2 rounded inline-block"
                @click.stop.prevent="start_game">Start Game</button>
            <button
                v-if="game.state_started"
                class="ml-1 bg-red-700 hover:bg-red-800 px-3 py-2 rounded inline-block"
                @click.stop.prevent="pause_game">Pause Game</button>
            <router-link
                class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded ml-1 inline-block"
                to="/about">?</router-link>
        </div>
        <div class="md:flex items-center md:flex-1">
            <ScoreCounter></ScoreCounter>
            <ScoreInput
                @score="enter_score"
                @bull="enter_bull"
                @next="go_next"
                @miss="enter_miss"
                @del="bksp"
                :disabled="game.keyboard_disabled_keys"
                :class="{'pointer-events-none opacity-50': !game.state_started}"></ScoreInput>
        </div>
    </div>
</template>

<script>
    import ScoreCounter from "@/components/ScoreCounter.vue";
    import ScoreInput from "@/components/ScoreInput.vue";

    export default {
        name: "darts-screen",
        inject: ["game"],
        components: {
            ScoreCounter,
            ScoreInput
        },
        methods: {
            start_game() {
                this.tor(_ => this.game.start());
            },
            pause_game() {
                this.tor(_ => this.game.pause());
            },
            reset_game() {
                this.tor(_ => this.game.reset());
            },
            enter_score(score) {
                this.tor(_ => this.game.register_score(score));
            },
            enter_bull(multiplier) {
                this.tor(_ => this.game.register_bull(multiplier));
            },
            enter_miss(multiplier) {
                this.tor(_ => this.game.register_miss(multiplier));
            },
            go_next() {
                this.tor(_ => this.game.next_user());
            },
            bksp() {
                this.tor(_ => this.game.delete_previous());
            },
            tor(func) {
                this.$store.commit("try_or_error", func);
            }
        }
    };
</script>

<style scoped></style>

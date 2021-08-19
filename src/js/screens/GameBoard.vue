<template>
    <div class="max-h-screen md:h-screen md:flex md:flex-col">
        <div class="max-w-md mx-auto p-4 text-center">
            <router-link
                class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded"
                to="/about">?</router-link>
            <router-link
                class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded ml-2"
                to="/settings">Settings</router-link>
            <a
                :class="{'bg-red-700 hover:bg-red-800': game.can_reset, 'bg-gray-800 pointer-events-none cursor-default': !game.can_reset}"
                class="ml-2 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="game.reset()">Reset Game</a>
            <a
                v-if="!game.state_started"
                :class="{'bg-green-700 hover:bg-green-800': game.can_start, 'bg-gray-800 pointer-events-none cursor-default': !game.can_start}"
                class="ml-2 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="start_game">Start Game</a>
            <a
                v-if="game.state_started"
                class="ml-2 bg-red-700 hover:bg-red-800 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="pause_game">Pause Game</a>
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
        data() {
            return {};
        },
        components: {
            ScoreCounter,
            ScoreInput
        },
        methods: {
            start_game() {
                this.$store.commit("try_or_error", _ => this.game.start());
            },
            pause_game() {
                this.$store.commit("try_or_error", _ => this.game.pause());
            },
            enter_score(score) {
                this.$store.commit("try_or_error", _ => this.game.register_score(score));
            },
            enter_bull(multiplier) {
                this.$store.commit("try_or_error", _ => this.game.register_bull(multiplier));
            },
            enter_miss(multiplier) {
                this.$store.commit("try_or_error", _ => this.game.register_miss(multiplier));
            },
            go_next() {
                this.$store.commit("try_or_error", _ => this.game.next_user());
            },
            bksp() {
                this.$store.commit("try_or_error", _ => this.game.delete_previous());
            },
        }
    };
</script>

<style scoped></style>

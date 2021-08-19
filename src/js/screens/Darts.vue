<template>
    <div class="max-h-screen md:h-screen md:flex md:flex-col" :class="{'overflow-hidden': settings_modal_open}">
        <Settings
            @close="settings_modal_open=false"
            :try_or_error="try_or_error"
            :open="settings_modal_open"></Settings>
        <div class="max-w-sm mx-auto p-4 text-center">
            <a
                class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded"
                href="#"
                @click.stop.prevent="settings_modal_open=true">Settings</a>
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
        <div class="bg-red-700 bottom-0 fixed flex items-start justify-between left-0 m-4 right-0 rounded-md z-30"
            :class="{'hidden': !error_visible}">
            <p class="p-4">{{ error }}</p>
            <a href="#" @click.prevent="error_visible=false" class="block py-4 px-6 hover:underline cursor-pointer">
                close
            </a>
        </div>
    </div>
</template>

<script>
    import Settings from "@/screens/Settings.vue";
    import ScoreCounter from "@/components/ScoreCounter.vue";
    import ScoreInput from "@/components/ScoreInput.vue";

    export default {
        name: "darts-screen",
        inject: ["game"],
        data() {
            return {
                settings_modal_open: false,
                error: "",
                error_visible: false,
                error_timeout: null,
            };
        },
        components: {
            Settings,
            ScoreCounter,
            ScoreInput
        },
        methods: {
            start_game() {
                this.try_or_error(_ => this.game.start());
            },
            pause_game() {
                this.try_or_error(_ => this.game.pause());
            },
            enter_score(score) {
                this.try_or_error(_ => this.game.register_score(score));
            },
            enter_bull(multiplier) {
                this.try_or_error(_ => this.game.register_bull(multiplier));
            },
            enter_miss(multiplier) {
                this.try_or_error(_ => this.game.register_miss(multiplier));
            },
            go_next() {
                this.try_or_error(_ => this.game.next_user());
            },
            bksp() {
                this.try_or_error(_ => this.game.delete_previous());
            },
            try_or_error(func) {
                try {
                    func();
                } catch (error) {
                    this.show_error(error);
                }
            },
            show_error(error) {
                if (this.error_timeout !== null) {
                    clearTimeout(this.error_timeout);
                    this.error_timeout = null;
                }

                this.error = error.message;
                this.error_visible = true;
                this.error_timeout = setTimeout(this.clear_error, 3000);
            },
            clear_error() {
                this.error_visible = false;
                this.error = "";

                if (this.error_timeout !== null) {
                    clearTimeout(this.error_timeout);
                    this.error_timeout = null;
                }
            }
        }
    };
</script>

<style scoped></style>

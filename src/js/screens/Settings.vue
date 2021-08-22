<template>
    <div class="bg-black fixed h-full px-4 py-4 w-full z-10 block max-h-full overflow-auto">
        <div class="max-w-xl m-auto">
            <TopLabels class="mb-4"></TopLabels>

            <div class="flex items-stretch justify-between">
                <div class="text-3xl">Settings</div>
                <router-link to="/" class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded">Close settings</router-link>
            </div>

            <div class="flex mt-4 mb-1">
                <a @click.prevent="active_tab='game'"
                    class="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded"
                    :class="{'bg-gray-900 cursor-default pointer-events-none': active_tab==='game'}"
                    href="#">Game</a>
                <a @click.prevent="active_tab='users'"
                    class="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded ml-1"
                    :class="{'bg-gray-900 cursor-default pointer-events-none': active_tab==='users'}"
                    href="#">Users</a>
                <a @click.prevent="active_tab='data'"
                    class="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded ml-1"
                    :class="{'bg-gray-900 cursor-default pointer-events-none': active_tab==='data'}"
                    href="#">Data</a>
            </div>

            <div v-if="active_tab==='game'" class="w-full bg-gray-900 rounded p-4">
                <div v-if="!game.can_change_settings" class="text-red-400 text-xl underline">You cannot change the variant settings when a game is active!</div>
                <div>
                    <label for="variant" class="text-xl">Game Variant <span class="text-gray-500 text-sm">(Additional game variants will be implemented later)</span></label>
                    <select @change="update_variant"
                        class="cursor-default px-4 py-3 bg-gray-700 rounded block mt-2 w-full"
                        id="variant"
                        :value="game.current_variant"
                        :class="{'cursor-pointer': game.can_change_settings}"
                        :disabled="!game.can_change_settings">
                        <option v-for="variant in game.variants"
                            :value="variant.id"
                            :key="variant.id">{{ variant.human_name }}</option>
                        <option value="cricket" disabled>Cricket</option>
                        <option value="baseball" disabled>Baseball</option>
                        <option value="killer" disabled>Killer</option>
                        <option value="shanghai" disabled>Shanghai</option>
                        <option value="legs" disabled>Legs</option>
                        <option value="51-by-5s" disabled>51 by 5's</option>
                        <option value="english-cricket" disabled>English Cricket</option>
                    </select>
                    <div>
                        <a href="https://www.darting.com/Darts-Rules/" target="_blank" class="hover:no-underline text-blue-500 underline">Learn the rules</a>
                    </div>
                    <label for="auto-commit" class="block mt-2 cursor-pointer"><input class="cursor-pointer" v-model="game.auto_commit_turns" type="checkbox" id="auto-commit"> Automatically end turns when throws are entered</label>
                </div>
                <hr class="border-t-2 border-gray-500 mt-4">
                <div class="mt-4">
                    <VariantSettings
                        @toggle_bool="toggle_variant_bool"
                        @set_selection="set_variant_selection"
                        :can_update="game.can_change_settings"
                        :settings="game.variant_settings"></VariantSettings>
                </div>
            </div>
            <div v-if="active_tab==='users'" class="w-full bg-gray-900 rounded p-4">
                <h2 class="text-xl">Users</h2>
                <label for="should-shuffle" class="block cursor-pointer mt-2"><input class="cursor-pointer" v-model="game.should_shuffle_users" type="checkbox" id="should-shuffle"> Shuffle Users On Game Start</label>
                <div v-if="!game.can_change_settings" class="mt-2 text-red-400 text-xl underline">You cannot change the users when a game is active!</div>
                <form method="POST" action="#" @submit.stop.prevent="add_user" class="mt-4 flex" v-if="game.can_change_settings">
                    <input v-model="user_name_input" placeholder="User name" class="bg-gray-700 flex-shrink min-w-0 px-4 py-3 rounded text-white">
                    <input @click.stop.prevent="add_user" type="submit" class="bg-green-600 hover:bg-green-700 ml-1 px-4 py-3 rounded cursor-pointer">
                </form>
                <div class="mt-4" v-if="game.users.length > 0">
                    <div v-for="(user,i) in game.users" :key="user.name" class="flex items-center justify-between px-4 py-4 bg-gray-700 first:rounded-t last:rounded-b" :class="{'bg-gray-800': i%2!=0}">
                        <div class="py-3">{{user.name}}</div>
                        <a href="#" @click.stop.prevent="remove_user(user)" class="bg-red-600 hover:bg-red-700 px-4 py-3 rounded" v-if="game.can_change_settings">remove user</a>
                    </div>
                </div>
            </div>
            <div v-if="active_tab==='data'" class="w-full bg-gray-900 rounded p-4">
                <h2 class="text-xl">Your Data</h2>
                <p>No data is saved at this moment, this section will be populated later.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import VariantSettings from "@/components/VariantSettings.vue";
    import TopLabels from "@/components/TopLabels.vue";

    export default {
        name: "settings-screen",
        inject: ["game"],
        components: {
            VariantSettings,
            TopLabels,
        },
        data() {
            return {
                active_tab: "game",
                user_name_input: ""
            };
        },
        methods: {
            add_user() {
                this.tor(_ => {
                    this.game.add_user(this.user_name_input);
                    this.user_name_input = "";
                });
            },
            remove_user(user) {
                this.tor(_ => this.game.remove_user(user));
            },
            update_variant(event) {
                this.tor(_ => this.game.set_variant(event.target.value));
            },
            toggle_variant_bool(id) {
                this.tor(_ => this.game.toggle_variant_bool(id));
            },
            set_variant_selection(id, value) {
                this.tor(_ => this.game.set_variant_selection(id, value));
            },
            tor(func) {
                this.$store.commit("try_or_error", func);
            }
        }
    }
</script>

<style scoped></style>

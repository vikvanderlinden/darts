<template>
    <div class="bg-black fixed h-full p-10 w-full z-10 block max-h-full overflow-auto" :class="{'hidden': !open}">
        <div class="flex items-center justify-between">
            <div class="text-3xl mb-4">Settings</div>
            <a href="#" @click.stop.prevent="$emit('close')" class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded">Close settings</a>
        </div>

        <label for="variant">Game Variant <span class="text-gray-500 text-sm">(Additional game variants will be implemented later)</span></label>
        <select class="px-4 py-3 bg-gray-700 rounded block mt-2" id="variant" :disabled="!game.can_change_settings">
            <option value="01-games" selected>'01 Games</option>
            <option value="round-the-board" disabled>Round the Board</option>
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

        <label for="should-shuffle" class="block mt-4"><input v-model="should_shuffle_users" @change="$emit('shuffle', should_shuffle_users)" type="checkbox" id="should-shuffle"> Shuffle Users On Game Start</label>
        <label for="auto-commit" class="block mt-2"><input v-model="auto_commit_plays" @change="$emit('autocommit', auto_commit_plays)" type="checkbox" id="auto-commit"> Automatically end plays when throws are entered</label>
        <div v-if="!game.can_change_settings" class="mt-4 text-red-400 text-xl underline">You cannot change the users when a game is active!</div>
        <form method="POST" action="#" @submit.stop.prevent="add_user" class="mt-4" v-if="game.can_change_settings">
            <input v-model="user_name_input" placeholder="User name" class="bg-gray-700 px-4 py-3 rounded text-white">
            <input @click.stop.prevent="add_user" type="submit" class="bg-green-600 hover:bg-green-700 ml-1 px-4 py-3 rounded cursor-pointer">
        </form>
        <div class="mt-4">
            <div v-for="(user,i) in game.users" :key="user.name" class="flex items-center justify-between px-4 py-4 bg-gray-800 first:rounded-t last:rounded-b" :class="{'bg-gray-900': i%2!=0}">
                <div class="py-3">{{user.name}}</div>
                <a href="#" @click.stop.prevent="game.remove_user(user)" class="bg-red-600 hover:bg-red-700 px-4 py-3 rounded" v-if="game.can_change_settings">remove user</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "settings-screen",
    props: ["game", "open"],
    emits: ["close", "shuffle", "autocommit"],
    data() {
        return {
            auto_commit_plays: false,
            should_shuffle_users: true,
            user_name_input: ""
        };
    },
    methods: {
        add_user() {
            this.game.add_user(this.user_name_input);
            this.user_name_input = "";
        },
    }
}
</script>

<style scoped></style>

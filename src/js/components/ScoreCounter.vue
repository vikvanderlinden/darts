<template>
    <div class="max-w-sm w-full mx-auto p-2">
        <div class="flex items-end" v-if="game.show_score">
            <div class="flex flex-col justify-end items-center w-2/5 flex-grow-0 flex-shrink-0">
                <div class="text-8xl">{{game.current_player.score}}</div>
                <div class="text-6xl">{{game.current_player.updated_score}}</div>
                <div class="text-blue-400">Now: {{game.current_player.name}}</div>
            </div>
            <div class="w-full ml-4 text-xl w-3/5">
                <table class="w-full">
                    <tr
                        v-for="(user,index) in game.users" :key="user.name"
                        :class="{'text-blue-400': index == game.current_user,
                                'text-green-400': index == game.winning_user}">
                        <td><div v-if="index == game.current_user" class="bg-blue-500 rounded w-4 h-4 text-xs text-center text-white" title="Current">C</div></td>
                        <td><div v-if="index == game.winning_user" class="bg-green-500 rounded w-4 h-4 text-xs text-center text-white" title="Winning">W</div></td>
                        <td>{{user.name}}</td>
                        <td class="text-right">{{user.score}}</td>
                    </tr>
                </table>
                <div class="mt-3 text-center text-base text-blue-400">Round {{game.round}}</div>
            </div>
        </div>
        <div class="mt-4 text-3xl text-center" v-if="game.show_score">{{game.current_turn_calculation()}}</div>
        <div v-else class="text-3xl text-center">{{game.current_turn_calculation()}}</div>
    </div>
</template>

<script>
export default {
    name: "score-counter-component",
    inject: ["game"],
}
</script>

<style scoped></style>

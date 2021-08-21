<template>
    <div class="bg-black fixed h-full px-8 py-4 w-full z-10 block max-h-full overflow-auto">
        <div class="max-w-xl m-auto">
            <TopLabels class="mb-4"></TopLabels>
            <div class="flex items-stretch justify-between">
                <div class="text-3xl">About</div>
                <div class="flex">
                    <router-link to="/terms-of-service" class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded mr-1">Terms of Service</router-link>
                    <router-link to="/" class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded">Close</router-link>
                </div>
            </div>

            <h1 class="mt-4 text-2xl">What is this and how does it work?</h1>
            <p class="mt-4">This is a darts score counter. It is completely free and ad-free and its main and only purpose is to let users keep their scores when darting.</p>
            <p class="mt-4">When you click on "settings" on the main screen, you can configure a game. To start, you have to select a game variant (one will be selected by default) and add users.</p>
            <p class="mt-4">Under the "Game" tab in the settings you will find the option to switch game variants and configure the game variant further if supported by the additional settings shown lower on the page. Under the "Users" tab in the settings you can add or remove users. Each user needs a name that only includes letters, numbers, '-', '_' or spaces and can at most be 20 characters long. Under the "Data" tab you will find the settings related to the data this application stores and the options to alter or remove that data.</p>

            <h1 class="text-2xl mt-4">Playing the game</h1>
            <p class="my-4">To play the game after all settings have been configured as wished, you can just click "Start Game". After this, the player whose turn it is is indicated by a "C" before his or her name as well as below the large score. The player that is winning is indicated by a "W" before his or her name. To enter a score, just press the correct buttons on the keyboard. You can delete the previous throw if necessary, except for the last throw when the turns are automatically ended. When a player wins the game, the game is finished and the player congratulated. You can reset the game at any moment during the game to restart. Note that during the game, the settings cannot be changed anymore, to change the settings, reset the game and then go to the settings page.</p>
        </div>
    </div>
</template>

<script>
    import TopLabels from "@/components/TopLabels.vue";

    export default {
        name: "about-screen",
        components: {
            TopLabels,
        }
    }
</script>

<style scoped>
</style>

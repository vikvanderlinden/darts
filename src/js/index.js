import './../css/index.css'
import Darts from '@/screens/Darts.vue';
import Game from "@/models/Game.ts";
import OhOneGames from "@/game-variants/OhOneGames.ts";
import { createApp, reactive } from 'vue';

if (process.env.NODE_ENV === 'development') {
    require('./../../dist/index.html');
}

// Create game instance and register variants
let game = reactive(new Game());
let variants = [
    new OhOneGames(),
];
game.set_variant("01-games");

// Create vuejs instance
const app = createApp(Darts);
app.provide('game', game);
app.mount("#app");

// Register service-worker for offline use
window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js");
    }
});

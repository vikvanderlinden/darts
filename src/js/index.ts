import './../css/index.css'
// @ts-ignore
import Darts from "./screens/Darts.vue";
import Game from "./models/Game";
import OhOneGames from "./game-variants/OhOneGames";
import RoundTheBoard from "./game-variants/RoundTheBoard";
import { createApp, reactive } from 'vue';

if (process.env.NODE_ENV === 'development') {
    require('./../html/index.html');
}

// Create game instance and register variants
let game = reactive(new Game());
let variants = [
    new OhOneGames(501),
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

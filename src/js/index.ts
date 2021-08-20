import './../css/index.css'
// @ts-ignore
import GameBoard from "./screens/GameBoard.vue";
// @ts-ignore
import Settings from "./screens/Settings.vue";
// @ts-ignore
import About from "./screens/About.vue";
import Game from "./models/Game";
import OhOneGames from "./game-variants/OhOneGames";
import RoundTheBoard from "./game-variants/RoundTheBoard";
import { errorStore } from "./stores/ErrorStore";
import { createApp, reactive } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

if (process.env.NODE_ENV === "development") {
    require("./../html/index.html");
}

// Create game instance and register variants
let game = reactive(new Game());
let variants = [
    new OhOneGames(),
    new RoundTheBoard(),
];
game.set_variant("01-games");

// Create router instance
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: GameBoard },
        { path: "/settings", component: Settings },
        { path: "/about", component: About },
    ],
});

// Create vuejs instance
const app = createApp({});
app.use(router);
app.use(errorStore);
app.provide("game", game);
app.mount("#app");

// Register service-worker for offline use
window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js");
    }
});

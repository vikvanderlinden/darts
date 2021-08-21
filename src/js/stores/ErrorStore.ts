//@ts-nocheck
import {createStore } from "vuex";

export const errorStore = createStore({
    state() {
        return {
            error: "",
            error_visible: false,
            //@ts-ignore
            error_timeout: null,
        }
    },
    mutations: {
        try_or_error(state, func: Function) {
            try {
                func();
            } catch (error) {
                this.commit("show_error", error);
            }
        },
        show_error(state, error: Error) {
            if (this.error_timeout !== null) {
                clearTimeout(state.error_timeout);
                state.error_timeout = null;
            }

            state.error = error.message;
            state.error_visible = true;
            state.error_timeout = setTimeout(_ => this.commit("clear_error"), 3000);
        },
        clear_error(state) {
            state.error_visible = false;
            state.error = "";

            if (state.error_timeout !== null) {
                clearTimeout(state.error_timeout);
                state.error_timeout = null;
            }
        },
        close_error(state) {
            this.commit("clear_error");
        }
    }
});

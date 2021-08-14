<template>
    <div class="mt-2 md:mt-0 mb-4 md:mb-0 p-2 max-w-sm w-full mx-auto">
        <div class="flex gap-2">
            <StickyButton :selected="score_multiplier === 2" @click="toggle_score_multiplier(2)" title="Double"></StickyButton>
            <StickyButton :selected="score_multiplier === 3" @click="toggle_score_multiplier(3)" title="Triple"></StickyButton>
            <a class="score-btn flex-1 red-btn" @click.stop.prevent="emit_miss()" href="#">Miss</a>
        </div>
        <div v-for="i in [0,1,2,3]" :key="i" class="flex justify-between mt-4">
            <a class="score-btn" v-for="j in [1,2,3,4,5]" :key="5*i+j" @click.stop.prevent="emit_score(5*i+j)" href="#">{{ 5*i + j }}</a>
        </div>
        <div class="flex gap-2 mt-4">
            <a class="score-btn flex-1 red-btn" @click.stop.prevent="emit_del()" href="#">Del</a>
            <a class="score-btn flex-1" @click.stop.prevent="emit_bull(1)" href="#">Outer</a>
            <a class="score-btn flex-1" @click.stop.prevent="emit_bull(2)" href="#">Bull</a>
            <a class="score-btn flex-1 green-btn" @click.stop.prevent="emit_next()" href="#">></a>
        </div>
    </div>
</template>

<script>
import StickyButton from "@/components/StickyButton.vue";

export default {
    name: "score-input-component",
    components: {
        StickyButton,
    },
    data() {
        return {
            score_multiplier: 1,
        }
    },
    emits: ["score", "bull", "next", "miss", "del"],
    methods: {
        toggle_score_multiplier(n) {
            if (this.score_multiplier === n) {
                this.reset_score_multiplier();
                return;
            }

            this.score_multiplier = n;
        },
        emit_score(value) {
            this.$emit("score", {
                multiplier: this.score_multiplier,
                value
            });
            this.reset_score_multiplier();
        },
        emit_bull(bull) {
            this.$emit("bull", bull);
            this.reset_score_multiplier();
        },
        emit_next() {
            this.$emit("next");
            this.reset_score_multiplier();
        },
        emit_miss() {
            this.$emit("miss");
            this.reset_score_multiplier();
        },
        emit_del() {
            this.$emit("del");
            this.reset_score_multiplier();
        },
        reset_score_multiplier() {
            this.score_multiplier = 1;
        }
    }
}
</script>

<style scoped></style>

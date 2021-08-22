<template>
    <div class="mt-2 md:mt-0 md:mb-0 p-2 pb-6 max-w-sm w-full mx-auto">
        <div class="flex gap-2">
            <StickyButton
                :selected="score_multiplier === 2"
                :class="{'pointer-events-none opacity-50': in_disabled(['double', 'multipliers', 'inputs'])}"
                @click="toggle_score_multiplier(2)"
                title="Double"></StickyButton>
            <StickyButton
                :selected="score_multiplier === 3"
                :class="{'pointer-events-none opacity-50': in_disabled(['triple', 'multipliers', 'inputs'])}"
                @click="toggle_score_multiplier(3)"
                title="Triple"></StickyButton>
            <button class="score-btn flex-1 red-btn"
                @click.stop.prevent="emit_miss()"
                :class="{'pointer-events-none opacity-50': in_disabled(['miss', 'inputs'])}"
                >Miss</button>
        </div>
        <div v-for="i in [0,1,2,3]" :key="i" class="flex justify-between mt-4">
            <button class="score-btn"
                v-for="j in [1,2,3,4,5]"
                :key="5*i+j"
                :class="{'pointer-events-none opacity-50': in_disabled([5*i+j, 'inputs'])}"
                @click.stop.prevent="emit_score(5*i+j)"
                >{{ 5*i + j }}</button>
        </div>
        <div class="flex gap-2 mt-4">
            <button class="score-btn flex-1 red-btn" :class="{'pointer-events-none opacity-50': in_disabled(['del', 'actions'])}" @click.stop.prevent="emit_del()">Del</button>
            <button class="score-btn flex-1" :class="{'pointer-events-none opacity-50': in_disabled(['ob', 'b', 'inputs'])}" @click.stop.prevent="emit_bull(1)">Outer</button>
            <button class="score-btn flex-1" :class="{'pointer-events-none opacity-50': in_disabled(['ib', 'b', 'inputs'])}" @click.stop.prevent="emit_bull(2)">Bull</button>
            <button class="score-btn flex-1 green-btn" :class="{'pointer-events-none opacity-50': in_disabled(['del', 'actions'])}" @click.stop.prevent="emit_next()">></button>
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
    props: ["disabled"],
    data() {
        return {
            score_multiplier: 1,
        }
    },
    emits: ["score", "bull", "next", "miss", "del"],
    methods: {
        in_disabled(value) {
            let items = Array.isArray(value) ? value : [value];

            return items.reduce((prev,curr) => prev || this.disabled.includes(curr.toString()), false);
        },
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
        emit_bull(multiplier) {
            this.$emit("bull", multiplier);
            this.reset_score_multiplier();
        },
        emit_next() {
            this.$emit("next");
            this.reset_score_multiplier();
        },
        emit_miss() {
            this.$emit("miss", this.score_multiplier);
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

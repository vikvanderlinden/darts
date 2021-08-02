<template>
    <div>
        <ScoreCounter></ScoreCounter>
        <ScoreInput></ScoreInput>
    </div>
</template>

<script>
    import ScoreCounter from "@/components/ScoreCounter.vue";
    import ScoreInput from "@/components/ScoreInput.vue";

    export default {
        name: 'calculator-screen',
        components: {
            ScoreCounter,
            ScoreInput
        },
    };
</script>

<style scoped></style>

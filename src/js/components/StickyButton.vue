<template>
    <button class="score-btn flex-1 border-4 border-transparent"
        :class="{'border-green-500': selected}"
        @click.stop.prevent="$emit('click')"
        >{{title}}</button>
</template>

<script>
export default {
    name: "sticky-button-component",
    props: {
        title: String,
        selected: Boolean
    },
    emits: ["click"],
}
</script>

<style scoped></style>

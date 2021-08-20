<template>
    <div class="bg-black fixed h-full px-8 py-4 w-full z-10 block max-h-full overflow-auto">
        <div class="max-w-xl m-auto">
            <TopLabels class="mb-4"></TopLabels>
            <div class="flex items-stretch justify-between">
                <div class="text-3xl">About</div>
                <router-link to="/" class="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded">Close</router-link>
            </div>

            <h1 class="mt-4 text-2xl">What is this and how does it work?</h1>
            <p class="mt-4">Content to be filled in.</p>
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

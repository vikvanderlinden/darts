<template>
    <div class="max-w-sm w-full mx-auto">
        <div class="flex">
            <div class="text-8xl flex items-center">
                132
            </div>
            <div class="w-full ml-4 my-auto text-xl">
                <div class="flex justify-between items-baseline">
                    <div class="flex justify-start items-baseline">
                        <div class="bg-blue-500 w-4 h-4"></div>
                        <div class="rounded-full w-4 h-4 ml-1"></div>
                        <div class="ml-2">Player 1</div>
                    </div>
                    <div>132</div>
                </div>
                <div class="flex justify-between">
                    <div class="flex justify-start items-baseline">
                        <div class="w-4 h-4"></div>
                        <div class="bg-green-500 rounded-full w-4 h-4 ml-1"></div>
                        <div class="ml-2">Player 2</div>
                    </div>
                    <div>98</div>
                </div>
                <div class="flex justify-between">
                    <div class="flex justify-start items-baseline">
                        <div class="w-4 h-4"></div>
                        <div class="rounded-full w-4 h-4 ml-1"></div>
                        <div class="ml-2">Player 3</div>
                    </div>
                    <div>124</div>
                </div>
            </div>
        </div>
        <div class="mt-4 text-3xl text-center">3x12 + 3x20 + 3x14 = 138</div>
    </div>
</template>

<script>
export default {
    name: "score-counter-component",
    props: [""],
}
</script>

<style scoped></style>

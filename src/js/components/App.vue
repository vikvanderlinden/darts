<template>
    <div>
        <div class="max-w-sm w-full mx-auto">
            <div class="flex">
                <div class="text-8xl flex items-center">
                    132
                </div>
                <div class="w-full ml-4 my-auto">
                    <div class="flex justify-between">
                        <div>Vik</div>
                        <div>132</div>
                    </div>
                    <div class="flex justify-between">
                        <div>Frederic</div>
                        <div>98</div>
                    </div>
                    <div class="flex justify-between">
                        <div>Olivier</div>
                        <div>124</div>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-3xl text-center">3x12 + 3x20 + 3x14 = 138</div>
        </div>
        <div class="mt-4 max-w-sm w-full mx-auto">
            <div class="flex gap-2">
                <a class="score-btn flex-1" href="#">Double</a>
                <a class="score-btn flex-1" href="#">Triple</a>
                <a class="score-btn flex-1 bg-red-300 hover:bg-red-400" href="#">Miss</a>
            </div>
            <div class="flex justify-between mt-4">
                <a class="score-btn" href="#">1</a>
                <a class="score-btn" href="#">2</a>
                <a class="score-btn" href="#">3</a>
                <a class="score-btn" href="#">4</a>
                <a class="score-btn" href="#">5</a>
            </div>
            <div class="flex justify-between mt-4">
                <a class="score-btn" href="#">6</a>
                <a class="score-btn" href="#">7</a>
                <a class="score-btn" href="#">8</a>
                <a class="score-btn" href="#">9</a>
                <a class="score-btn" href="#">10</a>
            </div>
            <div class="flex justify-between mt-4">
                <a class="score-btn" href="#">11</a>
                <a class="score-btn" href="#">12</a>
                <a class="score-btn" href="#">13</a>
                <a class="score-btn" href="#">14</a>
                <a class="score-btn" href="#">15</a>
            </div>
            <div class="flex justify-between mt-4">
                <a class="score-btn" href="#">16</a>
                <a class="score-btn" href="#">17</a>
                <a class="score-btn" href="#">18</a>
                <a class="score-btn" href="#">19</a>
                <a class="score-btn" href="#">20</a>
            </div>
            <div class="flex gap-2 mt-4">
                <a class="score-btn flex-1" href="#">Center</a>
                <a class="score-btn flex-1" href="#">Bull</a>
                <a class="score-btn flex-1 bg-green-300 hover:bg-green-400" href="#">></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app-component',
    };
</script>

<style scoped></style>

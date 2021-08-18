<template>
    <div>
        <div class="text-lg">Game variant settings</div>
        <div v-if="settings['boolean'].length + settings['selection'].length === 0">No settings available for this variant</div>
        <div v-for="boolsetting in settings['boolean']" :key="boolsetting.id">
            <label class="block mt-2" :for="boolsetting.id">
                <input
                    type="checkbox"
                    :id="boolsetting.id"
                    v-model="boolsetting.selected_value"> {{ boolsetting.title }}
            </label>
        </div>
        <div v-for="selectionsetting in settings['selection']" :key="selectionsetting.id" class="mt-4">
            <label :for="selectionsetting.id">{{ selectionsetting.title }}</label>
            <select
                class="cursor-pointer px-4 py-3 bg-gray-700 rounded block mt-2 w-full"
                :name="selectionsetting.id"
                :id="selectionsetting.id"
                v-model="selectionsetting.selected_value">
                <option
                    v-for="option in selectionsetting.options"
                    :key="option"
                    :value="option"
                    >{{option}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "variant-settings-component",
        props: ["settings"],
    }
</script>

<style scoped>
</style>

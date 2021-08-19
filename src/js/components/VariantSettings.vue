<template>
    <div>
        <div class="text-lg">Game variant settings</div>
        <div v-if="settings['boolean'].length + settings['selection'].length === 0">No settings available for this variant</div>
        <div v-for="boolsetting in settings['boolean']" :key="boolsetting.id">
            <label class="block mt-2 cursor-pointer" :for="boolsetting.id">
                <input
                    type="checkbox"
                    :id="boolsetting.id"
                    :disabled="!can_update"
                    v-model="boolsetting.selected_value"> {{ boolsetting.title }}
            </label>
        </div>
        <div v-for="selectionsetting in settings['selection']" :key="selectionsetting.id" class="mt-2">
            <label :for="selectionsetting.id">{{ selectionsetting.title }}</label>
            <select
                class="cursor-default px-4 py-3 bg-gray-700 rounded block mt-2 w-full"
                :name="selectionsetting.id"
                :id="selectionsetting.id"
                :disabled="!can_update"
                :class="{'cursor-pointer': can_update}"
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
        props: ["settings", "can_update"],
    }
</script>

<style scoped>
</style>

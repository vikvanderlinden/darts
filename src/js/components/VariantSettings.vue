<template>
    <div>
        <div class="text-lg">Game variant settings</div>
        <div v-if="Object.keys(settings['boolean']).length + Object.keys(settings['selection']).length === 0">No settings available for this variant</div>
        <div v-for="(boolsetting,id) in settings['boolean']" :key="id">
            <label class="block mt-2 cursor-pointer" :for="id"
                :class="{'cursor-default pointer-events-none': !can_update}">
                <input
                    type="checkbox"
                    :id="id"
                    :disabled="!can_update"
                    :checked="boolsetting.selected_value"
                    @input="$emit('toggle_bool',id)"> {{ boolsetting.title }}
            </label>
        </div>
        <div v-for="(selectionsetting,id) in settings['selection']" :key="id" class="mt-2">
            <label :for="id">{{ selectionsetting.title }}</label>
            <select
                class="cursor-default px-4 py-3 bg-gray-700 rounded block mt-2 w-full"
                :name="id"
                :id="id"
                :disabled="!can_update"
                :class="{'cursor-pointer': can_update}"
                :value="selectionsetting.selected_value"
                @input="$emit('set_selection',id,$event.target.value)">
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
        emits: ["toggle_bool", "set_selection"],
    }
</script>

<style scoped>
</style>

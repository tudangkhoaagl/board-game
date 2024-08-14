<script setup>
defineProps({
    name: String,
    id: String,
    type: String,
    class: String,
    place_holder: String,
    label: String
})

const loginName = defineModel()
</script>

<template>
    <div class="form-group mb-3">
        <label :for="id">{{ label }}</label>
        <input :type="type" :name="name" :class="class" v-model="loginName" :placeholder="place_holder">
    </div>
</template>

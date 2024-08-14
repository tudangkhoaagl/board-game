<script setup>
defineProps({
    name: String,
    id: String,
    type: String,
    class: String,
    place_holder: String,
    label: String,
})
</script>

<template>
    <div class="form-check">
        <input :type="type" :class="class" :placeholder="place_holder">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
</template>
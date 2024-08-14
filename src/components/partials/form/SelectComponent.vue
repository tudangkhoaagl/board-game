<script setup>
import { defineProps } from 'vue'
let props = defineProps({
    name: String,
    id: String,
    type: String,
    class: String,
    place_holder: String,
    label: String,
    dataList: {
        type: Array,
        required: true
    }
})

const choseData = defineModel()
</script>

<template>
    <div class="form-group mb-3">
        <label :for="id">{{ label }}</label>
        <select :class="class" :id="id" :name="name" v-model="choseData">
          <option v-for="(item, key) in dataList" :value="item.name" :key="key">{{ item.name }}</option>
        </select>
      </div>
</template>

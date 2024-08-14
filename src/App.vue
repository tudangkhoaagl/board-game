<script setup>
import { RouterView } from 'vue-router'
import HeaderView from './components/partials/HeaderView.vue'
</script>

<template>
  <HeaderView />

  <div class="container">
    <RouterView />
  </div>
</template>

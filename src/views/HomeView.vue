<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { db, ref as fireBaseRef, get } from '@/firebase/firebase-config';
import { ref, onMounted } from 'vue'

let players = ref('')

onMounted(async () => {
  const dbRef = fireBaseRef(db, 'players');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      players.value = snapshot.val();
      console.log(players.value)
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Error reading data:', error);
  }
})

console.log(players.value)

</script>

<template>
  <main>
    <TheWelcome />
    <p v-for="(player, key) in players" :key="key"> {{ player }}</p>
  </main>
</template>

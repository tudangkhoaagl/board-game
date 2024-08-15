<script setup>
import { db, ref as fireBaseRef, update, push, orderByChild, equalTo, query, onValue } from '@/firebase/firebase-config';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie';

const dbRef = fireBaseRef(db, 'rooms');

const data = ref([])
const key = ref('')

onMounted(async() => {
  const queryRoom = await query(dbRef, orderByChild('name'), equalTo(useRoute().params.name));
  onValue(queryRoom, (snapshot) => {
    if (snapshot.exists()) {
      data.value = Object.values(snapshot.val())[0];
      key.value = Object.keys(snapshot.val())[0];
      data.value.players = data.value.players 
      ? Object.values(data.value.players) 
      : [];
      const foundItem = data.value.players?.find(element => element.name === Cookies.get('user_name'));
      if (! foundItem) {
        const newPlayerRef = push(fireBaseRef(db, `rooms/${key.value}/players`));
        // Update the players array in Firebase
        update(newPlayerRef, {
          name: Cookies.get('user_name')
        });
      }
    } else {
      data.value = [];
    }
  })

})
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
    <div class="col" v-for="(item, key) in data.players" :key="key">
      <div class="card">
        <div class="card-body text-center">
          <h5 class="card-title">{{ item.name }} {{ item.name === data.owner ? '(Owner)' : '' }}</h5>
        </div>
      </div>
    </div>
  </div>
  <div v-if="data.owner === Cookies.get('user_name')" class="mt-3 text-center">
    <button class="btn btn-primary">Start game</button>
  </div>
</template>

<script setup>
import { db, ref as fireBaseRef, push, onValue, orderByChild, equalTo, query, get } from '@/firebase/firebase-config';
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie';

const dbRef = fireBaseRef(db, 'rooms');

const data = ref([])

onMounted(async () => {
  const q = query(dbRef, orderByChild('name'), equalTo(useRoute().params.name));
  const snapshot = await get(q);
  if (snapshot.exists()) {
    data.value = Object.values(snapshot.val())[0];
  } else {
    data.value = [];
  }
})
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
    <div class="col" v-for="(item, key) in data.players" :key="key">
      <div class="card">
        <div class="card-body text-center">
          <h5 class="card-title">{{ item.name }} {{ Cookies.get('user_name') === item.name ? '(Owner)' : '' }}</h5>
        </div>
      </div>
    </div>
  </div>
  <div v-if="data.owner === Cookies.get('user_name')" class="mt-3 text-center">
    <button class="btn btn-primary">Start game</button>
  </div>
</template>

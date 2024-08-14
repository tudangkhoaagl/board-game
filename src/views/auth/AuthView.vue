<script setup>
import { db, ref as fireBaseRef, push, onValue, orderByChild, equalTo, query, get } from '@/firebase/firebase-config';
import { ref, onMounted } from 'vue'
import InputComponent from '@/components/partials/form/InputComponent.vue'
import SelectComponent from '@/components/partials/form/SelectComponent.vue'
import Cookies from 'js-cookie';
import router from '@/router';

let games = ref([])
const loginName = ref('')
const roomName = ref('')
const key = ref('')
const password = ref('')
const dbRef = fireBaseRef(db, 'players');
const dbGamesRef = fireBaseRef(db, 'games');
const dbRoomRef = fireBaseRef(db, 'rooms');
const showModal = ref(false);

onMounted(async () => {
  await onValue(dbGamesRef, (snapshot) => {
    try {
      if (snapshot.exists()) {
        const gamesList = snapshot.val();

        games.value = gamesList ? Object.values(gamesList) : [];
        console.log(games.value)
      } else {
        const gameData = [
          {
            name: 'Uno'
          },
          {
            name: 'Were Wolf'
          },
          {
            name: 'Cat Explode'
          }
        ]
        gameData.forEach(element => {
          push(dbGamesRef, element)
        });
      }
    } catch (error) {
      console.error('Error reading data:', error);
    }
  })

})

function login() {
  push(dbRef, {
    name: loginName.value,
  })

  Cookies.set('user_name', loginName.value, { expires: 1 })

  router.push({ name: 'rooms.home' })
}

function createRoom() {
  push(dbRef, {
    name: loginName.value,
  })

  Cookies.set('user_name', loginName.value, { expires: 1 })

  if (Cookies.get('user_name')) {
    push(dbRoomRef, {
      name: roomName.value,
      game_name: key.value,
      password: password.value,
      owner: Cookies.get('user_name'),
      players: [
        {
          name: Cookies.get('user_name')
        }
      ]
    })
    router.push({
      name: 'rooms.detail',
      params: {
        name: roomName.value
      }
    })
  } else {
    showModal.value = true;
  }
}

</script>

<template>
  <div class="create-room">
    <div class="text-center pt-5 pb-5 border-bottom">
      TẠO PHÒNG
    </div>

    <div class="form-create-rom pt-3">
      <form @submit.prevent="createRoom">
        <InputComponent :class="'form-control'" v-model="roomName" :name="'room_name'" :label="'Tên Phong'"
          :id="'roomId'" :type="'text'" :place_holder="'Nhap ten phong'" />
        <InputComponent :class="'form-control'" :name="'password'" v-model="password" :label="'Mat Khau'"
          :id="'password'" :type="'password'" :place_holder="'Nhap Mat khau'" />
        <SelectComponent :name="'game'" :label="'Choose your game'" v-model="key" :place_holder="'Choose your game'"
          :id="'game'" :v-model="'choseData'" :dataList="games" class="form-control" />

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>

    <div class="text-center pt-5 pb-5 border-bottom">
      TẠO PHÒNG
    </div>

    <div class="form-create-rom pt-3">
      <form @submit.prevent="login">
        <InputComponent :class="'form-control'" v-model="loginName" :name="'name'" :label="'Tên dang nhap (Tuy chon)'"
          :id="'name'" :type="'text'" :place_holder="'Nhap ten dang nhap'" />

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>

  <div v-if="showModal" class="modal fade show d-block" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
          <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          You need to login to create room
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

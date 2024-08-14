<script setup>
import { onMounted, ref, computed } from 'vue'
import { db, ref as fireBaseRef, onValue, push } from '@/firebase/firebase-config';
import Cookies from 'js-cookie';
import router from '@/router';

const dbRoomRef = fireBaseRef(db, 'rooms');
let roomList = ref([]);
const userName = computed(() => {
    return Cookies.get('user_name')
})
onMounted(async () => {
    await onValue(dbRoomRef, (snapshot) => {
        try {
            if (snapshot.exists()) {
                const list = snapshot.val();
                console.log(list)

                roomList.value = list ? Object.values(list) : [];
                console.log(roomList)
            } else {
                console.log('Not have data room')
            }
        } catch (error) {
            console.error('Error reading data:', error);
        }
    })

})

function redirectToDetail(roomName, username, isNotOwner) {
    router.push({
        name: 'rooms.detail',
        params: {
            name: roomName
        }
    })
}
</script>

<template>
    <div>
        <div class="row">
            <div class="col-md-2">Player name</div>
            <div class="col-md-2">{{ userName }}</div>
        </div>
    </div>
    <p>Room list:</p>
    <div class="card mb-3" v-for="(room, key) in roomList" :key="key">
        <div class="card-body" role="button"
            @click="redirectToDetail(room.name, Cookies.get('user_name'), room.owner !== Cookies.get('user_name'))">
            <blockquote class="blockquote mb-0 row">
                <div class="col-xl-6">{{ room.name }}</div>
                <div class="col-xl-6 text-end">{{ typeof (room.players) == 'undefined' ? 0 : room.players.length }}/10
                </div>
            </blockquote>
        </div>
    </div>
</template>
<template>
    <div>
    <div class="grid grid-cols-1 min-w-full border rounded">
                <ul class="overflow-auto hideScrollBar" style="height: 90vh;">
                    <li>
                        <div class="px-6"
                            v-for="room in rooms" :key="room.room_id"
                        >
                        <div class="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
                            <div class="flex items-center">
                            <div class="ml-2" v-if="roomNameIsVisible(room)">
                                <div class="text-sm font-light" style="color: #2d00ff;">  {{ room.room_name }} </div>
                            </div>
                            <div class="ml-4" v-else>
                                <form @submit.prevent="joinPrivate(room)">
                                    <div id="roompass_id">
                                        <div class="relative text-gray-600">
                                            <input
                                            v-focus
                                            @blur="ignorePassword"
                                            @keyup="userIsTyping"
                                            @keypress="userIsTyping"
                                            autoComplete="true" type="password" name="serch" placeholder="Password" class="bg-white h-10 px-5 pr-20 rounded-full text-sm focus:outline-none"
                                            v-model="user_room_pass"
                                            :class="{'bg-pink-500' : invalid_pass}"
                                            >
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                            <div>
                                <div 
                                class="rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out  mr-6 cursor-pointer"
                                :class="room.is_locked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'"
                                @click="joinToRoom(room.room_id, room.is_locked)"
                                >
                                <svg v-if="!room.is_locked"  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>

                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                </div>
                            </div>
                        </div>

                        </div>

                    </li>
                </ul>
            </div>
        </div>
</template>


<script lang="ts">
interface Room{
    room_id : number; // i use this variable as index be carful
    room_name: string;
    is_locked: boolean;
}

import { defineComponent } from 'vue'
import axios from 'axios';
import store from '@/store';
import router from '@/router';
export default defineComponent({
    name: 'PublicChatBlock',
    components:{
    },
    data()
    {
        return {
            invalid_pass: false as boolean,
            user_room_pass: '' as string,
            typing_room_id: -1 as number,
            
        }
    },
    created()
    {
        this.getRooms();
    },
    methods: {
        async getRooms()
        {
            if (store.getters.getRooms.length !== 0) // this important do not remove it
                return ;
            try {
                const resp = await axios.get(`http://localhost:8001/rooms`);
                const data = resp.data;
                store.commit('updateRooms', data);
            }catch(e)
            {
                console.log(`while trying to get data for rooms ${e}`);
            }
        },
        joinToRoom(room_id:number, is_locked:boolean)
        {
            // probably this function shoould by async
            if (is_locked)
                this.joinToPrivateRoom(room_id);
            else
                this.joinToPublicRoom(room_id);
        },
        joinToPrivateRoom(room_id:number)
        {
            this.typing_room_id = room_id; // responsible for input visibilty
        },
        async joinToPublicRoom(room_id:number)
        {
            console.log(`public room ${room_id}`);
            // http://localhost:port/rooms/room_id
            this.getRoomData(room_id);

        },
        async joinPrivate(room:Room)
        {
            const tmp_pass = this.user_room_pass.trim();
            if (tmp_pass.length !== 0)
            {
                // i will send password to backend to chek if password is correct
                // just for testing i'm assuming that password is correct so i will fill the store
                // and redirect him to chat messages block
                this.getRoomData(room.room_id);
            }else{
                this.invalid_pass = true;
            }
        },
        async getRoomData(room_id:number)
        {       
            const resp = await axios.get(`http://localhost:8002/${room_id + ''}/messages`);
            const data = resp.data;
            store.commit('updatePublicRoomMsgs', data);
            // now i will redirect him to chat block messages
            router.push({name: 'chatpublicmsg'});
        },
        userIsTyping(e:any)
        {
            if (e.keyCode !== 13)
                this.invalid_pass = false;
        },
        roomNameIsVisible(room:Room)
        {
            if (room.is_locked)
            {
                return (this.typing_room_id !== room.room_id);
            }
            return true;
        },
        ignorePassword()
        {
            this.typing_room_id = -1;
            this.user_room_pass = '';
        }
    },
    directives:
    {
        focus : {
            mounted(el) {
                el.focus();
            },
        }
    },
    computed: {
        rooms() : Array<Room>
        {
            return store.getters.getRooms;
        }
    },
    watch: {
        rooms()
        {
            console.log('rooms has been changed');
        }
    }

})
</script>


<style scoped>
.hideScrollBar::-webkit-scrollbar {
    display: none;
}

.hideScrollBar
{
    -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
<template>

<div class="flex-1 p:2 sm:p-6 justify-between flex flex-col" style="height:90vh;">
   <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
   </div>
   <div id="messages" v-godown  class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      
      <div class="chat-message" v-for="msg in currentMsgs" :key="msg.msg_id">
         <div class="flex items-end"
         :class="{'justify-end' : msg.user_msg}"
         >
            <div class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative" style="max-width: 300px;">
               <span class="block"> {{ msg.msg_data }} </span>
               <span class="block text-xs text-right"> {{ msg.msg_time }} </span>
            </div>

            <div v-if="!msg.user_msg" class="ml-5 px-5 py-2 my-2 text-gray-700 relative text-orange-500" style="max-width: 300px;">
               <span class="block"> {{ msg.msg_user_name }} </span>
            </div>
 
         </div>
      </div>
   </div>


   <div class="px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
         <input type="text" v-model="curMsgData" @keypress.enter="addMessage" placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-white-200 rounded-md py-3">
         <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button @click="addMessage"  type="button" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <span class="font-bold">Send</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
         </div>
      </div>
   </div>
</div>

</template>

<script lang="ts">

import store from '@/store'
import { defineComponent } from 'vue'
interface message{
   msg_id: number;
   msg_data: string;
   msg_time: string;
   user_msg: boolean; // i'm assuming default is false so be carefull
   msg_user_name: string;
}


export default defineComponent({
   name: 'ChatPublicRoomMsg',
   data()
   {
      return {
         curMsgData: '' as string
      }
   },
   methods: {
      addMessage()
      {
         const tmp = this.curMsgData.trim();
         if (tmp.length !== 0)
         {
            const msgObj = {
                  msg_id: 0, // i will change data inside
                  msg_data: tmp,
                  msg_time: "45:47", // this now it just test
                  user_msg: true,
                  msg_user_name: store.state.userData.user_name,
            };
            this.curMsgData = '';
            store.commit('addMessageToRoomMsgs', msgObj);
         }
      }
   },
   directives: {
      godown(box:any)
      {
         box.scrollTop = box.scrollHeight; // probably i will make call to async function to scroll down since until this line height is still old
      }
   },
   computed: {
      currentMsgs() : Array<message>
      {
         return store.getters.getMsgs;
      }
   }

})
</script>


<style scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>
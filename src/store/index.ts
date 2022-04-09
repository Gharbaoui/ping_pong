import { createStore } from 'vuex'

interface message{
  msg_id: number;
  msg_data: string;
  msg_time: string;
  user_msg: boolean;
  msg_user_name: string;
}

interface PlayerHistory
{
  history_id: number; // this one it's just for view
  player_avatar_1: string;
  player_id_1: number;
  player_avatar_2: string;
  player_id_2: number;
  player_score_1: number;
  player_score_2: number;
}

interface Player{
  player_id: number; // this should be unique
  player_avatar: string; // maybe url maybe just name of file that is inside assets i'm testing with images that are inside assets
  player_score: number; 
}

interface Room{
    room_id : number; // i use this variable as index be carful
    room_name: string;
    is_locked: boolean;
}


export default createStore({
  strict: true,
  state: {
    chatState: {
      index: 0 as number,
    },
    userData : {
      user_name: '' as string,
      user_id: 0 as number
    },
    chatPublicMsgs: [
      // since only public one can be open i do not need for every room arry of messages
    ] as Array<message>,
    rooms: [] as Array<Room>,
    players: [] as Array<Player>,
    PlayerHistory: [] as Array<PlayerHistory>,
  },
  getters: {
    getRooms(state:any)
    {
      return state.rooms;
    },
    getMsgs(state:any)
    {
      return state.chatPublicMsgs;
    },
    getPlayers(state:any)
    {
      return state.players;
    },
    getPlayerHistory(state:any)
    {
      return state.playerHistory;
    }
  },
  mutations: {
    updateRooms(state:any, rooms:Array<Room>)
    {
      state.rooms = [];
      state.rooms = rooms;
    },
    addRoom(state:any, room:Room)
    {
      room.room_id = state.rooms[state.rooms.length - 1].room_id + 1;
      state.rooms.push(room);
    },
    updateChatState(state:any, index:number)
    {
      state.chatState.index = index;
    },
    updateUserData(state:any, user_data: any)
    {
      state.userData = user_data;
    },
    updatePublicRoomMsgs(state:any, msgs:Array<any>)
    {
      state.chatPublicMsgs = [];
      state.chatPublicMsgs = msgs;
    },
    addMessageToRoomMsgs(state: any, msg:message)
    {
      msg.msg_id = state.chatPublicMsgs[state.chatPublicMsgs.length - 1].msg_id;
      state.chatPublicMsgs.push(msg);
    },
    updatePlayers(state:any, players:Array<Player>)
    {
      state.players = [];
      state.players = players;
    },
    updatePlayerHistory(state:any, playerHistory:Array<PlayerHistory>)
    {
      state.playerHistory = [];
      state.playerHistory = playerHistory;
    }
  },
  actions: {
  },
  modules: {
  }
})

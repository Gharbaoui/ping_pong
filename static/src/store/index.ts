import { createStore } from 'vuex'

interface message{
	id: number;
	room_id: number;
	from_id: number;
	username: string;
	avatar: string;
	msg: string;
	created: string;
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
    id : number; // i use this variable as index be carful
    name: string;
    locked: boolean;
    owner_id: number;
    admins: number[];
}


export default createStore({
  strict: true,
  state: {
    chatState: {
      index: 0 as number,
    },
    userData : {
		user_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImpvaW5lZFJvb21zIjpbXSwiaWF0IjoxNjQ5NDU0ODY3LCJleHAiOjE2NTIwNDY4Njd9.XuwCa2OLPmGTbQAiDwhGB1fKu7T4jjT5dzqw1zDUBA0' as string,
		username: '' as string,
		user_id: 0 as number,
		avatar: '' as string,
		joinedRooms: [] as number[],
    },
    chatPublicMsgs: [
      // since only public one can be open i do not need for every room arry of messages
    ] as Array<message>,
    rooms: [] as Array<Room>,
    players: [] as Array<Player>,
    PlayerHistory: [] as Array<PlayerHistory>,
	currentRoomId: 0 as number,
  },
  getters: {
	getCurrentRoomId(state:any) {
		return state.currentRoomId;
	},
    getUserToken(state:any) {
		return state.userData.user_token;
	},
	getUsername(state:any) {
		return state.userData.username;
	},
	getAvatar(state:any) {
		return state.userData.avatar;
	},
	getJoinedRooms(state:any) {
		return state.userData.joinedRooms;
	},
	getUserId(state:any) {
		return state.userData.user_id;
	},
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
	  setRoomId(state:any, id:number) {
		  state.currentRoomId = id;
	  },
	  setUserData(state: any, token: string)
	  {
		state.userData.user_token = token;
		const user: any = JSON.parse(atob(token.split('.')[1]));
		state.userData.joinedRooms = user.joinedRooms;
		state.userData.user_id = user.sub;
		state.userData.username = user.username;
		state.userData.avatar = user.avatar;
	},
    updateRooms(state:any, rooms:Array<Room>)
    {
      state.rooms = [];
      state.rooms = rooms;
    },
    addRoom(state:any, room:Room)
    {
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
      // msg.id = state.chatPublicMsgs[state.chatPublicMsgs.length - 1].id;
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

import Vue from 'vue';
import io from 'socket.io-client';
import router from './router';
const socket = io('https://bddi-2019-chat.herokuapp.com/');

const store = new Vue({
  data: {
    isRegistered:false,
    error:{},
    user: {},
    users: [],
    messages: [],
    iconColor: '#FF5E00',
    areTyping:[]
  },
  methods: {
    registerListeners() {
      socket.on('connect', () => {
        console.log('connected');
        const sessionUser = sessionStorage.getItem('user');
            if(sessionUser) {
                store.userRegister(JSON.parse(sessionUser));
            }
      })
      socket.on('disconnect', () => {
        this.isRegistered = false;
      })
      socket.on('users update', ({users}) => {
        this.users = users;
      })
      socket.on('user registered', (user) => {
        this.isRegistered=true;
        this.user =  user;
        sessionStorage.setItem('user', JSON.stringify(user));
      })

      socket.on('message new', ({ message }) => {
        this.messages.push(message);
      })
      socket.on('messages update', ({ messages }) => {
          console.log('ok')
          this.messages = messages;
      })
      socket.on('chat error', (error) => {
        this.error = error;
      })
      socket.on('command new', (data) => {
        switch(data.command) {
          case 'logout': 
            this.logout();
          break;
          
        }
      })
      socket.on('user typing', (data) => {
        if(data.typing == true) {
          this.areTyping.push(data.user.username)
        }
        else {
          this.areTyping = this.areTyping.filter(username => username !== data.user.username);
        }
      })
    },
    logout() {
        sessionStorage.clear()
        socket.disconnect();
        this.isRegistered=false;
    },  
    userRegister({username, avatar}) {
      this.error={}
      socket.emit('user register', {
        username: username, 
        avatar:avatar
      })
    },
    userTyping(data) {
      socket.emit('user typing', data)
    },
    messageNew(message) {
      socket.emit('message new', message)
    },
  },
  created() {
    this.registerListeners();
  },
  watch:{
      isRegistered(registered) {
        if(registered) {
            setTimeout(() =>{
              router.push('/patience')
            },1000)
        }
        else {
            router.push('/login')
        }
      }
  }
})
export default store;

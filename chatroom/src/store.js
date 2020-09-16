import Vue from 'vue';
import io from 'socket.io-client';
import router from './router';
const socket = io('http://bddi-2019-chat.herokuapp.com/');

const store = new Vue({
  data: {
    isRegistered:false,
    error:{},
    user: {},
    users: [],
    messages: [],
    iconColor: '#fff'
  },
  methods: {
    registerListeners() {
      socket.on('connect', () => {
        console.log('connected');
        const sessionUser = sessionStorage.getItem('user');
            if(sessionUser) {
                store.userRegister(JSON.parse(sessionUser).username);
                
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
        console.log(error)
      })
      socket.on('command new', (data) => {
        switch(data.command) {
          case 'logout': 
            this.logout();
          break;
          
        }
        
      })
    },
    logout() {
        sessionStorage.clear()
        socket.disconnect();
        this.isRegistered=false;
        router.push('/login')
    },  
    userRegister(username) {
      socket.emit('user register', {
        username: username
      })
    },
    userTyping() {

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
            router.push('/')
        }
        else {
            router.push('/login')
        }
      }
  }
})
export default store;

<template>
 <div>
   <div class="titles">
      <h1>Chatroom</h1>
      <h1>Team</h1>
    </div>
  <div class="chatroom">
    <div class="left">
        <MessagesList :messages="store.messages" />
        <MessageBox @sendMessage="onSendMessage" @typing='onTyping' />
    <p class="isTyping" v-if='store.areTyping.length !=0'> {{store.areTyping[0]}} is typing</p>

    </div>
    <div class="right">
    <UsersList :users="store.users" />
    </div>
  </div>
 </div>
</template>
<script>
import MessagesList from '../components/MessagesList'
import UsersList from '../components/UsersList'
import MessageBox from '../components/MessageBox'
import store from '../store'
export default {
  components: {
    MessageBox,
    MessagesList,
    UsersList,
  },
  data() {
    return {
      store,
    }
  },
  mounted() {
      console.log(store);
  },
  methods: {
    onSendMessage(text) {
      store.messageNew(text)
    },
    onTyping(data) {
      store.userTyping(data)
    }
  },
}
</script>
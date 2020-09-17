<template>
 <div class="wrapper">
   <div class="titles">
     <div class="titles-content">
        <h1>Chatroom</h1>
      <h1>Team</h1>
     </div>
      <hr>
    </div>
        <MessagesList :messages="store.messages" />
    <UsersList :users="store.users" />

        <MessageBox @sendMessage="onSendMessage" @typing='onTyping' />
    <div class="isTyping"><span v-if='store.areTyping.length!=0'>{{store.areTyping[0]}} is typing</span></div>
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
        document.querySelectorAll('h1').forEach(item => item.classList.add('animated'))
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
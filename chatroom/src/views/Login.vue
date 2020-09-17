<template>
  <div class="login">
    <div class="titles">
      <h1>Login</h1>
    </div>
    <div class="loginForm">
      <form @submit.prevent="onSubmit">
        <p v-if="store.error != {}">{{store.error.message}}</p>
        <input type="text" v-model="username" placeholder="Username" />
        <button type="submit">
          <svg
            width="100"
            height="68"
            viewBox="0 0 100 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="65.9502" width="48" height="7" transform="rotate(45 65.9502 0)" fill="black" />
            <rect
              x="61"
              y="62.9411"
              width="48"
              height="7"
              transform="rotate(-45 61 62.9411)"
              fill="black"
            />
            <rect y="30.5" width="96" height="7" fill="black" />
          </svg>Enter
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import store from '../store'
export default {
  data() {
    return {
      username: '',
      avatar: '',
      store,
    }
  },
  methods: {
    onSubmit() {
      store.userRegister({username:this.username, 
      avatar: ''})
    },
  },
  mounted() {
    console.log(store)
    document.title = 'Chatroom - Login'
  },
}
</script>
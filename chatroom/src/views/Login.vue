<template>
  <div class="login">
    <div class="titles">
     <div class="titles-content">
        <h1>Login</h1>
     </div>
      <hr>
    </div>
    <div class="loginForm">
      <form @submit.prevent="onSubmit">
        <p v-if="store.error != {}">{{store.error.message}}</p>
        <input type="text" v-model="username" placeholder="Username" />
        <div class='button' @click='onSubmit'>
          <div class="arrow">
            <div class="arrow-stroke"></div>
            <svg width="100"  height="68" viewBox="0 0 100 68" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g class='arrow-right'>
        <g transform="matrix(0.707107,0.707107,-0.707107,0.707107,19.3164,-46.6338)">
            <rect x="65.95" y="0" width="48" height="7" style="fill:rgb(255,94,0);"/>
        </g>
        <g transform="matrix(0.707107,-0.707107,0.707107,0.707107,-26.6396,61.5685)">
            <rect x="61" y="62.941" width="48" height="7" style="fill:rgb(255,94,0);"/>
        </g>
    </g>
</svg>
          </div>
<p>Enter</p>
        </div>
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
      avatar: ''});
        if(this.store.error.message === undefined) {
        document.querySelector('.arrow-stroke').style.width='100vh';
      setTimeout(()=> {
        document.querySelector('.button').classList.add('disapear');
      },1000)
      }
    },
  },
  watch: {
    store(store){
      console.log('erreuur watched')
      if(store.error.message) {
        document.querySelector('.button').classList.remove('disapear');
        document.querySelector('.arrow-stroke').style.width='100px';

      }
    }
  },
  mounted() {
    console.log(store)
    document.title = 'Chatroom - Login';
      document.querySelector('hr').addEventListener('animationend', () => {
        document.querySelectorAll('h1').forEach(item => {
          item.classList.add('animated')
          item.addEventListener('animationend', () => {
            document.querySelector('input').classList.add('animated');
            document.querySelector('input').addEventListener('animationend', () => {
              document.querySelector('.arrow').classList.add('animated');
              document.querySelector('.arrow').addEventListener('animationend', () => {
                document.querySelector('.button p').classList.add('animated')
              })
            });
          })
          });
        
      })
      console.log(store);
  },
}
</script>
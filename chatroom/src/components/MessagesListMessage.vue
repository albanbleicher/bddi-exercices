<template>
   <div  :class="message.user.username==store.user.username ? 'message fromMe': 'message' ">
       <div class="userInfos">
           <img v-if="message.user.avatar" :src="message.user.avatar" class="avatar" :alt="'Avatar de' + message.user.username ">
           <div v-else class="noAvatar"></div>
           <strong>{{message.user.username}}</strong>
       </div>
        <p>{{message.text}}</p>
   </div>
</template>
<script>
import store from '../store';
export default {
    data(){
        return {
            store
        }
    },
    computed: {
        isCurrentUser() {
            return this.message.user.username  === store.$data.user.username;
        }
    },
    props:{
        message: {
            type:Object,
            required:true
        }
    }
}
</script>
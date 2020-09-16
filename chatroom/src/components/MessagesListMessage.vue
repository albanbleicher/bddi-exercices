<template>
   <div  :class="message.user.username==store.user.username ? 'message fromMe': 'message' ">
       <div class="userInfos">
           <img v-if="message.user.avatar" :src="message.user.avatar" class="avatar" :alt="'Avatar de' + message.user.username ">
           <div v-else class="noAvatar"></div>
           <strong>{{message.user.username}}</strong>
       </div>
       <img v-if="isGif" class='gif' :src="message.text" alt="Ceci est un GIF">
        <p v-else>{{message.text}}</p>
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
    mounted() {
        var content = this.$el.parentNode;
        console.log('set')
            content.scrollTop = content.scrollHeight;
    },
    computed: {
        isCurrentUser() {
            return this.message.user.username  === store.$data.user.username;
        },
        isGif(){
            return this.message.text.includes('.gif');

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
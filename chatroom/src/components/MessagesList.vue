<template>
    <div class="messageList">
       <MessagesListMessage v-for="(message, key) in messages" :key="key" :message="message" />
    </div>
</template>
<script>
import MessagesListMessage from './MessagesListMessage';
export default {
    components:{
        MessagesListMessage
    },
    mounted() {
        document.title ="Chatroom";
        this.scrollToEnd();
    },
     updated() {
        this.$nextTick(() => {
             if(document.hidden) {
                 document.title='New message - Chatroom';
            setTimeout(function() {
              document.title='Chatroom'
            },2000);
             }
            this.scrollToEnd()
        });
    },
     props:{
        messages:{
            type:Array,
            required:true
            }
    },
    methods: {
        scrollToEnd () {
            var content = this.$el;
            content.scrollTop = content.scrollHeight
        }
    }
}
</script>
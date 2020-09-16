<template>
    <div :class='isMounted ?"messageList" : "messageList loading"'>
       <MessagesListMessage v-for="(message, key) in messages" :key="key" :message="message" />
    </div>
</template>
<script>
import MessagesListMessage from './MessagesListMessage';
export default {
    components:{
        MessagesListMessage
    },
    data() {
        return {
            isMounted:false
        }
    },
    mounted() {
        var self=this;
        document.title ="Chatroom";
        setTimeout(function() {
            self.scrollToEnd();
            self.isMounted=true;
        },500)
    },
     updated() {
        this.$nextTick(() => {
             if(document.hidden) {
                 document.title='New message - Chatroom';
            this.scrollToEnd();

            setTimeout(function() {
              document.title='Chatroom'
            },2000);
             }
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
            content.scrollTop = content.scrollHeight;
            
        }
    }
}
</script>
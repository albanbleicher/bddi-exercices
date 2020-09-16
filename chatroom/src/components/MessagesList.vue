<template>
    <div class="messageList">
        <transition-group name="list" tag="div.message">
       <MessagesListMessage v-for="(message, key) in messages" :key="key" :message="message" />
       </transition-group>
    </div>
</template>
<script>
import MessagesListMessage from './MessagesListMessage';
export default {
    components:{
        MessagesListMessage
    },
     updated() {
        this.$nextTick(() => this.scrollToEnd());
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
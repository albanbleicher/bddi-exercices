<template>
    <ul>
       <MessagesListMessage v-for="(message, key) in messages" :key="key" :message="message" />
    </ul>
</template>
<script>
import MessagesListMessage from './MessagesListMessage';
export default {
    components:{
        MessagesListMessage
    },
     props:{
        messages:{
            type:Array,
            required:true
            }
    }
}
</script>
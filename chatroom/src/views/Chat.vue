<template>
    <div>
        <UsersList :users="users"/>
        <MessagesList :messages="messages"/>
        <MessageBox @sendMessage="onSendMessage"/>
    </div>
</template>
<script>
import MessagesList from '../components/MessagesList'
import UsersList from '../components/UsersList'
import MessageBox from '../components/MessageBox'
export default {
    components:{
        MessageBox,
        MessagesList,
        UsersList
    },
    data() {
        return {
        users: [
                {name:'Pierre'},
                {name:'Paul'},
                {name:'Jacques'},
                {name:'Henry'}
            ],
         messages:[
                {
                    user: {name: 'Pierre'},
                     text: 'Hey'
                },
                {
                    user: {name: 'Paul'},
                    text:"prout"
                },
                {
                    user: {name: 'Jacques'},
                    text:"dfgfdg"
                },
                {
                    user: {name: 'Henru'},
                    text:"dfgdfg"
                }
            ]
        }
    },
    methods:{
        onSendMessage(text){
            this.messages.push({
                user:{name:'Alban'},
                text
            })
        }  
    }
}


</script>
<template>
    <ul class="userList">
        <UsersListUser v-for="(user, key) in users" :key="key" :user="user"/>

    </ul>
</template>
<script>
import UsersListUser from './UsersListUser';
export default {
    components:{
        UsersListUser
    },
     props:{
        users:{
            type:Array,
            required:true
            }
    }
}
</script>
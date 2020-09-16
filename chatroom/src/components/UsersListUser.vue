<template>
    <div class="user">
        <div class="userInfos">
           <img v-if="user.avatar" :src="user.avatar" class="avatar" :alt="'Avatar de' + user.username ">
           <div v-else class="noAvatar"></div>
           <span>{{user.username}}</span>
       </div>
    </div>
</template>
<script>
export default {

    props:{
        user:{
            type:Object,
            required:true
            }
    }
}
</script>
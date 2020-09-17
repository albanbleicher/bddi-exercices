<template>
    <div class="user">
        <div class="userInfos">
           <span>{{user.username}}</span>
       </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:{
        user:{
            type:Object,
            required:true
            }
    }
}
</script>
<template>
    <form @submit.prevent='onSubmit'>
        <p v-if='store.error != {}'>{{store.error.message}}</p>
        <input type="text" v-model='username'>
        <button type="submit">Se connecter</button>
    </form>
</template>
<script>
import store from '../store'
export default {
    data () {
        return {
            username:'',
            store
        }
    },
    methods: {
        onSubmit() {
            store.userRegister(this.username);
            this.username =''
                
        }
    },
    mounted(){
        console.log(store)
    } 
}

</script>
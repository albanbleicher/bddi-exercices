<template>
    <div class="loading wrapper">
        <div class="titles">
            <div class="titles-content">
                <h1>patience</h1>
            </div>
        <hr>
            </div>
    <div class="animated-titles">
        <div class=title-element><span class="title-value first">Wait,</span></div>
        <div class="title-element"><span class="title-value second">It's <span class="underlined">loooooaaading</span>! </span></div>
    </div>
    </div>
    </div>

</template>
<script>
import router from '../router'
export default {
    mounted() {
            document.querySelector('span.first').classList.add('animated');
            document.querySelector('span.first').addEventListener('animationend', () =>{
                document.querySelector('span.second').classList.add('animated');
                document.querySelector('span.second').addEventListener('animationend', () => {
                    document.querySelector('span.underlined').classList.add('animated');
                    document.querySelector('span.underlined').addEventListener('animationend', ()=>{
                        document.querySelectorAll('.title-element').forEach((item, i ) => {
                                item.classList.add('disapear');
                                item.addEventListener('animationend', ()=> {
                                    setTimeout(() => {
                                        router.push('/')
                                    },800)
                                })
                        })
                    })
                })
            } )
    }
}
</script>
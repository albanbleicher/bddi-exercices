<template>
    <div>
             <a class="gifFinder" @click='showGifFinder ? showGifFinder=false : showGifFinder=true '>
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" y="0.5" width="22" height="22" :stroke="store.iconColor" />
            <path
              d="M7.12623 11.9546H8.98623C8.92623 13.0246 8.01623 13.6846 6.99623 13.6846C5.64623 13.6846 4.82623 12.7146 4.82623 11.1446C4.82623 9.57459 5.63623 8.60459 6.94623 8.60459C7.91623 8.60459 8.63623 9.11459 8.83623 9.95459H10.2262C9.95623 8.25459 8.57623 7.42459 6.93623 7.42459C4.68623 7.42459 3.41623 8.96459 3.41623 11.1446C3.41623 13.2346 4.61623 14.8646 6.81623 14.8646C7.84623 14.8646 8.62623 14.4946 9.13623 13.7646L9.32623 14.7046H10.3062V10.8646H7.12623V11.9546ZM12.7127 14.7046V7.58459H11.3627V14.7046H12.7127ZM18.9122 7.58459H13.8822V14.7046H15.2322V11.6346H18.5822V10.4746H15.2322V8.79459H18.9122V7.58459Z"
              :fill="store.iconColor"
            />
          </svg>
        </a>
        <div class="gifModal" v-if='showGifFinder'>
            <input @keyup='findGifs' type="text" v-model='gifQuery' placeholder="search a gif">
            <div class="gifList" v-if='gifArray.length != 0'>
            <img@click='getGifURL' v-for='(gif, key) in gifArray' :src="gif" alt="Random GIF from Giphy API" :key='key'>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../store'
import axios from 'axios';
export default {
    data() {
        return {
            store,
            gifArray:[],
            showGifFinder:false,
            gifQuery:''
        }
    },
    methods:{
        findGifs(){
        this.gifArray = [];
        axios.get('https://api.giphy.com/v1/gifs/search?api_key=k9FDwhZ3TzpSYxgsNQgQyAjBMEPyzmcG&q='+this.gifQuery+'&limit=25&offset=0&rating=g&lang=en').then((response) => {
            response.data.data.forEach((gif,i) =>{
                this.gifArray.push(gif.images.fixed_height.url)
            })
        })
    },
    getGifURL(e) {
        var gif=e.target.getAttribute('src');
        this.$emit('gifSelected', gif);
        this.showGifFinder = false;
        this.gifQuery='';
        this.gifArray=[];
    }
    }
}
</script>
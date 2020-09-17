<template>
  <div class="messageBox">

    <div class="messageInput">
      <input v-model="message" @keypress='typing' @keyup="onSubmit" placeholder="Write a message here" />
      <div class="formActions">
          <FoodNearby v-if='showFoodNearby'/>
        <a class="gifFinder" @click='showGifModal ? showGifModal=false : showGifModal=true '>
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
        <div class="gifModal" v-if='showGifModal'>
            <input type="text" v-model='gifQuery' placeholder="search a gif">
            <button @click='findGif'>{{isGifFound ? 'search again': 'find'}}</button>
            <img v-if='isGifFound' :src="urlGif" alt="Random GIF from Giphy API">
            <button v-if='isGifFound' class="send" @click='sendGif'>Send</button>
        </div>
        <emoji-picker @emoji="insert" :search="search">
          <div
            class="emoji-handle"
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
          >
            <button type="button">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11.5" cy="11.5" r="11" :stroke="store.iconColor" />
                <path
                  d="M5.22705 14.1136C7.84069 19.8636 15.1589 19.8636 17.7725 14.1136"
                  :stroke="store.iconColor"
                />
                <circle cx="8.36381" cy="9.4091" r="1.04545" :fill="store.iconColor" />
                <circle cx="14.6363" cy="9.4091" r="1.04545" :fill="store.iconColor" />
              </svg>
            </button>
          </div>
          <div class="emoji-picker" slot="emoji-picker" slot-scope="{ emojis, insert }">
            <div>
              <div>
                <input type="text" v-model="search" placeholder="search for an emoji" />
              </div>
              <div v-for="(emojiGroup, category) in emojis" :key="category" class="emoji-groups">
                <h5>{{ category }}</h5>
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </emoji-picker>
        <a @click="onSubmit">
          <svg
            width="25"
            height="16"
            viewBox="0 0 25 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 5.99994L10.203 15.045L24.0452 1.20276" :stroke="store.iconColor" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../store'
import EmojiPicker from 'vue-emoji-picker'
import axios from 'axios'
import FoodNearby from './FoodNearby';
export default {
  components: {
    EmojiPicker,
    FoodNearby
  },
  data() {
    return {
      message: '',
      store,
      search: '',
      showGifModal: false,
      showFoodNearby:false,
      gifQuery:'',
      isGifFound:false,
      urlGif:''
    }
  },
  methods: {
    insert(emoji) {
      this.message += emoji
    },
    typing() {
        this.$emit('typing', {user: store.user, typing:true});
    },
    onSubmit(e) {
        this.$emit('typing', {user: store.user, typing:false});
      if ((e.code == 'Enter' && e.shiftKey == false) || e.type === 'click') {
        this.$emit('sendMessage', this.message)
        this.message = ''
      }
    },
    findGif() {
         axios
      .get(
        'https://api.giphy.com/v1/gifs/random?api_key=k9FDwhZ3TzpSYxgsNQgQyAjBMEPyzmcG&tag='+this.gifQuery+'&rating=g'
      )
      .then((response) => {
        this.isGifFound=true;
        this.urlGif=response.data.data.fixed_height_downsampled_url;
      })
    },
    sendGif() {
        this.$emit('sendMessage', this.urlGif);
        this.showGifModal=false;
        this.isGifFound=false;
        this.urlGif = '';
    }
  },
}
</script>
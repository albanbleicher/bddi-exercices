<template>
  <div class="messageBox">

    <div class="messageInput">
      <input v-model="message" @keypress='typing' @keyup="onSubmit" placeholder="Write a message here" />
      <div class="formActions">
          <GifFinder @gifSelected='sendGif'/>
          <FoodNearby v-if='showFoodNearby'/>

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
import GifFinder from './GifFinder';
export default {
  components: {
    EmojiPicker,
    FoodNearby,
    GifFinder
  },
  data() {
    return {
      message: '',
      store,
      search: '',
      showFoodNearby:false,
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
    sendGif(gif) {
        this.$emit('sendMessage', gif);
    }
  },
}
</script>
<template>
  <div class='foodWrapper'>
    <a class="foodNearbyToggle" @click="toggleModal">
      <svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5272 9.38776C13.8317 8.66622 14.0001 7.87318 14.0001 7.04082C14.0001 3.70457 11.2955 1 7.95927 1C4.62302 1 1.91846 3.70457 1.91846 7.04082C1.91846 7.87318 2.0868 8.66622 2.39131 9.38776H1.31909C1.05964 8.65368 0.918457 7.86374 0.918457 7.04082C0.918457 3.15228 4.07074 0 7.95927 0C11.8478 0 15.0001 3.15228 15.0001 7.04082C15.0001 7.86374 14.8589 8.65368 14.5995 9.38776H13.5272Z" fill="#FF5E00"/>
<path d="M7.95892 21.1224L13.5916 9.3877H14.5964L7.95892 22.9999L1.32178 9.3877H2.32627L7.95892 21.1224Z" fill="#FF5E00"/>
<circle cx="7.95924" cy="7.04079" r="1.84694" stroke="#FF5E00"/>
</svg>

    </a>
    <div v-if='showFoodModal' class="foodNearbyModal">
    <h2>Food near Gobelins</h2>
    <small>click to suggest in the chat :)</small>
    <ul>
      <li class="foodItem" v-for="(place, key) in places" :key="key" :id='key'>
        <h3 @click='preMessage'>{{place.name}}</h3>
        <p>
          <span v-if="place.opening_hours">
            <span v-if="place.opening_hours.open_now">Ouvert</span>
            <span class="closed" v-else>Fermé</span>
          </span>
          <span v-if="place.opening_hours && place.price_level"> —  </span>
          <span v-if="place.price_level">
            <span v-for="price in place.price_level" :key="price">€</span>
          </span>
        </p>

        <p class="rate">
          <span v-for=" rate in Math.floor( place.rating)" :key="rate">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="white" />
            </svg>
          </span>
          <span v-if="Math.floor(place.rating)<5">
            <span v-for="(noStar, key) in (5 - Math.floor(place.rating))" :key="key">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="3.5" stroke="white" />
              </svg>
            </span>
          </span>
        </p>
        <p class="address">{{place.vicinity}}</p>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      isError: false,
      places: [],
      showFoodModal:false
    }
  },
  mounted() {
    const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.87502670288086,2.4056856632232666&type=meal_takeaway&radius=1600&key=AIzaSyDMYeJcaNJEl8aXWMV4-BM-tM2Oy9zEl94`
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data.results)
        this.places = response.data.results
      })
      .catch((error) => {
        console.log(error.message)
      })
  },
  methods:{
    toggleModal(){
      this.showFoodModal ? this.showFoodModal=false: this.showFoodModal=true;
    }, 
    preMessage(e) {
      let place = this.places[e.target.parentNode.getAttribute('id')];
      let message = "Qui veut prendre à manger chez "+place.name+" ? C'est noté "+place.rating+" étoiles sur Google!";
      this.$emit('suggest',message)
      console.log(message)
    }
  }
}
</script>
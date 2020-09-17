<template>
  <div class="foodNearbyModal">
    <h2>Food near Gobelins</h2>
    <ul>
      <li class="foodItem" v-for="(place, key) in places" :key="key">
        <h3>{{place.name}}</h3>
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
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      isError: false,
      places: [],
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
}
</script>
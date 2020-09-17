<template>
    <div class='foodNearby'>
        <h2>Food near Gobelins</h2>
        <ul>
        <li class='foodItem' v-for='(place, key) in places' :key='key'>
            <h3>{{place.name}}</h3>
        <p><span v-for=' price in Math.floor( place.rating)' :key='price'>🌟</span></p>
        <p>{{place.vicinity}}</p>
        </li>
    </ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            isError:false,
            places:[]
        }
    },
    mounted() {
        const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.87502670288086,2.4056856632232666&type=meal_takeaway&radius=1600&key=AIzaSyDMYeJcaNJEl8aXWMV4-BM-tM2Oy9zEl94`;
	axios.get(URL).then(response => {
        console.log(response.data.results)
       this.places= response.data.results;
        
	}).catch(error => {
		console.log(error.message);
	});
        }
    }
</script>
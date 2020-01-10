<template>
  <q-page padding class="flex">
    <q-card style="flex:1">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" >
        </l-marker>
      </l-map>
    </q-card>
  </q-page>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'
import { latLng } from 'leaflet'
import 'leaflet/dist/leaflet.css'


function rand(n) {
  let max = n + 0.1
  let min = n - 0.1
  return Math.random() * (max - min) + min;
}

export default {
  name: 'Map',
  components: {
    LMap,
    LMarker,
    LTileLayer
  },
  data () {
    let locations = []
    for (let i = 0; i < 100; i++) {
      locations.push({
        id: i,
        latlng: latLng(rand(47.413220), rand(-1.219482)),
        text: 'Hola ' + i
      })
    }
    return {
      zoom: 13,
      locations,
      center: L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  }
}
</script>
<style>
</style>

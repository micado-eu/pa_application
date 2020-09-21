<template>
  <div>
    <div id="map" ref="map"></div>
    <div id="layer-switcher">
      <strong>layers:</strong>
      <div v-for="layer in layers" :key="layer.id">
        <input type="checkbox"  :value="layer.id" :id="layer.id" @change="onCheck">
        <label :for="layer.id" >&nbsp;{{layer.name}}</label>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { Style, Stroke, Fill } from 'ol/style'
import * as mpapi from 'masterportalAPI'
import services from '../../../api/map/config/services.json'
import portalConfig from '../../../api/map/config/portal.json'
import localGeoJSON from '../../../api/map/config/localGeoJSON'

export default {
  name: 'Maptest',
  data() {
    return {
      layers: []
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)

    const hamburgServicesUrl = 'http://geoportal-hamburg.de/lgv-config/services-internet.json'

    //* Add elements to window to play with API in console
    this.mpapi = {
      ...mpapi,
      map: null
    }
    // */

    //* Cleans up map before it is re-rendered (happens on every save during dev mode)
    // document.getElementById(portalConfig.target).innerHTML = "";
    // */

    //* Fake service that holds client-side prepared geojson
    const localService = {
      id: '2002',
      typ: 'GeoJSON',
      features: localGeoJSON
    }
    services.push(localService)
    // */

    //* geojson styling function call to override default styling
    mpapi.geojson.setCustomStyles({
      MultiPolygon: new Style({
        stroke: new Stroke({
          width: 2,
          color: '#000000'
        }),
        fill: new Fill({
          color: '#FFFFFF55'
        })
      })
    })
    // */
    console.log('layerConf: ', services)
    //* SYNCHRONOUS EXAMPLE: layerConf is known
    this.mpapi.map = mpapi.createMap({
      ...portalConfig,
      layerConf: services
    });
    ['2001', '2757', '4553', '4554', '8712', '1733', '1732', '4461', '4460', '10965', '10964', '4556', '4555', '9095', '4458', '4557', '9097', '4459', '4463', '4462'].forEach((id) => {
      const newLayer = this.mpapi.map.addLayer(id)
      console.log(newLayer.get('id'))
      console.log(newLayer)
      console.log(newLayer.get('name'))
      newLayer.set('visible', false)
      this.layers.push({
        name: newLayer.get('name'),
        id: newLayer.get('id')
      })
    })
  },
  methods: {
    onCheck(event) {
      console.log(event.target)
      this.mpapi.map.getLayers().forEach((l) => {
        console.log(l.get('visible'))
        if (l.get('id') === event.target.value) {
          l.set('visible', !l.get('visible'))
        }
      })
    },
    updateMap() {
      // this.mpapi.map.updateSize()
      // const client = this.$el.getBoundingClientRect()
      // console.log(client.width)
      // console.log(client.height)

      // this.$refs.map.style.width = client.width
      // this.$refs.map.style.height = client.height
    },
    onResize() {
      // clear the timeout
      clearTimeout(this.timeout)
      // start timing for event "completion"
      this.timeout = setTimeout(this.updateMap, 250)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped>
#map {
  /* a very dirty hack... */
  height: 100%;
  position: absolute;
  width: 100%;
}
#layer-switcher{
  position: absolute;
  bottom: 5rem;
  left: 3rem;
  background-color: white;
  border-radius: .5rem;
  padding: .5rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  overflow-y: auto;
}
</style>

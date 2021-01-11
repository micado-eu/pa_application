<template>
  <div>
  </div>
</template>

<script>

import { Style, Stroke, Fill } from "ol/style.js"
import * as mpapi from "masterportalAPI"
import services from "../../api/map/config/services.json"
import portalConfig from "../../api/map/config/portal.json"
import localGeoJSON from "../../api/map/config/localGeoJSON.js"


export default {
  name: "MigrationSituation",
  components: {

  },
  computed: {
    timeseries: function() {
      return this.$store.state.statistics.timeseries.data.timeseries
    },
    origins: function() {
      return this.$store.state.statistics.origin.data
    },
    migrants: function() {
      return this.$store.state.statistics.migrants.data.migrants
    }
  },
  mounted: function() {
  }
}
</script>

<style scoped>
.mock-body {
  flex: 1;
}
.mock-content {
  padding: 1em;
  color: black;
  background: white;
  /* display: flex; */
  /* flex-direction: column; */
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.56);
  border-radius: 5px;
}

/* Not part of MPAPI, but really nice if no background image is configured. */
.map-background {
  background: #22222222;
}
#row {
  height: 400px;
  display: flex;
  margin: auto;
  width: 90%;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.56);
}
#map-row {
  display: flex;
  margin: auto;
  width: 90%;
  margin-top: 20px;
}
.chart {
  flex: 9;
}
.info {
  flex: 3;
}
.info-content {
  margin: 50px;
}
</style>

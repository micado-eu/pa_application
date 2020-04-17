<template>
  <div class="row">
    <div class="col-12">
      <lineChart :lineData="timeseries" :timeColumn="'unix_timestamp'" :valueColumn="'individuals'" />
    </div>
    <div class="col-2">one sixth</div>
    <div class="col-auto">auto size based on content and available space</div>
    <div class="col">fills remaining available space</div>
    <div class="mock-body col">
      <div class="mock-content">
        <div class="map-background">
          <div id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * this is a map view rendered using Masterportal API (https://bitbucket.org/geowerkstatt-hamburg/masterportalapi/src/master/)
 * documentation and examples are available in the corresponding node_module folder
 */
import { Style, Stroke, Fill } from "ol/style.js";
import * as mpapi from "masterportalAPI";
import services from "../api/map/config/services.json";
import portalConfig from "../api/map/config/portal.json";
import localGeoJSON from "../api/map/config/localGeoJSON.js";
import lineChart from "./migration_monitor/lineChart";

export default {
  name: "MpMap",
  components: {
    lineChart
  },
  computed: {
    timeseries: function() {
      return this.$store.state.statistics.timeseries.data.timeseries;
    }
  },
  mounted: function() {
    const hamburgServicesUrl =
      "http://geoportal-hamburg.de/lgv-config/services-internet.json";

    //* Cleans up map before it is re-rendered (happens on every save during dev mode)
    document.getElementById(portalConfig.target).innerHTML = "";

    //* Fake service that holds client-side prepared geojson; also nice to test automatic transformation since data is in WGS 84
    const localService = {
      id: "2002",
      typ: "GeoJSON",
      features: localGeoJSON
    };
    services.push(localService);

    //* geojson styling function call to override default styling
    mpapi.geojson.setCustomStyles({
      MultiPolygon: new Style({
        stroke: new Stroke({
          width: 2,
          color: "#000000"
        }),
        fill: new Fill({
          color: "#FFFFFF55"
        })
      })
    });

    //* SYNCHRONOUS EXAMPLE: layerConf is known
    window.mpapi.map = mpapi.createMap({
      ...portalConfig,
      layerConf: services
    });
    ["2001", "2002"].forEach(id => window.mpapi.map.addLayer(id));
  }
};
</script>

<style>
.mock-body {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.mock-content {
  padding: 1em;
  color: black;
  background: #e0e0e0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.content-mock {
  padding: 0.2em;
}
/* Not part of MPAPI, but really nice if no background image is configured. */
.map-background {
  background: #22222222;
}
</style>

<template>
  <div id="map"></div>
</template>

<script>
import { Style, Stroke, Fill } from "ol/style.js";
import * as mpapi from "masterportalAPI";
import services from "../../../api/map/config/services.json";
import portalConfig from "../../../api/map/config/portal.json";
import localGeoJSON from "../../../api/map/config/localGeoJSON.js";

export default {
  name: "Maptest",
  mounted: function () {
    window.addEventListener("resize", this.onResize);

    const hamburgServicesUrl =
      "http://geoportal-hamburg.de/lgv-config/services-internet.json";

    //* Add elements to window to play with API in console
    this.mpapi = {
      ...mpapi,
      map: null,
    };
    // */

    //* Cleans up map before it is re-rendered (happens on every save during dev mode)
    // document.getElementById(portalConfig.target).innerHTML = "";
    // */

    //* Fake service that holds client-side prepared geojson; also nice to test automatic transformation since data is in WGS 84
    const localService = {
      id: "2002",
      typ: "GeoJSON",
      features: localGeoJSON,
    };
    services.push(localService);
    // */

    //* geojson styling function call to override default styling
    mpapi.geojson.setCustomStyles({
      MultiPolygon: new Style({
        stroke: new Stroke({
          width: 2,
          color: "#000000",
        }),
        fill: new Fill({
          color: "#FFFFFF55",
        }),
      }),
    });
    // */
    console.log("layerConf: ", services);
    //* SYNCHRONOUS EXAMPLE: layerConf is known
    this.mpapi.map = mpapi.createMap({
      ...portalConfig,
      layerConf: services,
    });
    ["2001", "2002"].forEach((id) => this.mpapi.map.addLayer(id));
  },
  methods: {
    onResize: function () {
      this.mpapi.map.updateSize();
      this.mpapi.map.calculateBounds();
    },
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
#map {
  /* a very dirty hack... */
  height: calc(100vh - 98px);
}
</style>

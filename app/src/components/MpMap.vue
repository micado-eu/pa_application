<template>
  <div>
    <div class="row justify-center" id="row">
      <lineChart
        id="chart1"
        :lineData="timeseries"
        :timeColumn="'unix_timestamp'"
        :valueColumn="'individuals'"
      />
    </div>
    <div id="row">
      <pieChart
        id="chart2"
        :pieData="origins"
        :labelColumn="'pop_origin_name'"
        :valueColumn="'individuals'"
      />
      <lineChart
        id="chart3"
        :lineData="timeseries"
        :timeColumn="'unix_timestamp'"
        :valueColumn="'individuals'"
      />
    </div>
    <div id="map-row">
      <div class="mock-body">
        <div class="mock-content">
          <div class="map-background">
            <div id="map"></div>
          </div>
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
import pieChart from "./migration_monitor/pieChart";

export default {
  name: "MpMap",
  components: {
    lineChart,
    pieChart
  },
  computed: {
    timeseries: function() {
      return this.$store.state.statistics.timeseries.data.timeseries;
    },
    origins:function(){
      return this.$store.state.statistics.origin.data;
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
  flex: 1;
}
.mock-content {
  padding: 1em;
  color: black;
  background: white;
  /* display: flex; */
  /* flex-direction: column; */
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
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
}
#map-row {
  display: flex;
  margin: auto;
  width: 90%;
  margin-top: 20px;
}
#chart1 {
  flex: 1;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(29, 21, 21, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}
#chart2 {
  flex: 1;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(29, 21, 21, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  /* margin-top: 5%;
  margin-left: 5%; */
  margin-right: 10px;

  background: white;
  border-radius: 5px;
}
#chart3 {
  flex: 1;
  margin-left: 10px;

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  /* margin-top: 5%;
  margin-left: 5%; */
  background: white;
  border-radius: 5px;
}
</style>

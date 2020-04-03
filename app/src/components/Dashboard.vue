<template>
  <vue-friendly-iframe :src="iframeUrl" @load="onLoad" @document-load="onDocumentLoad"></vue-friendly-iframe>
</template>

<script>

import jwt from "jsonwebtoken"

var METABASE_SITE_URL = "https://dashboard.micadoproject.eu";
var METABASE_SECRET_KEY = "c7e367daa5adb50b8d6a522e4eb5f79572331fc74840fcfd2ca04ebe2e6879c8";

var payload = {
  resource: { dashboard: 1 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

console.log(token)

export default {
  // name: 'ComponentName',
  data () {
    return {
      iframeUrl: METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=false"
    }
  }
}
</script>

<template>
  <vue-friendly-iframe :src="iframeUrl" @load="onLoad" @document-load="onDocumentLoad"></vue-friendly-iframe>
</template>

<script>
import jwt from "jsonwebtoken";

var METABASE_SITE_URL = "http://dashboard.micado.csi.it";
var METABASE_SECRET_KEY =
  "648bd0c2bbb4084e20e3c4eab03f548f9c3d73f7620a4f2b914790b3fdc70619";

var payload = {
  resource: { dashboard: 1 },
  params: {},
  exp: Math.round(Date.now() / 1000) + 10 * 60 // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

export default {
  name: 'Metabase',
  data() {
    return {
      iframeUrl:
        METABASE_SITE_URL +
        "/embed/dashboard/" +
        token +
        "#bordered=true&titled=false"
    };
  }
};
</script>

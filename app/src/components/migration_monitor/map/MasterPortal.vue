<template>
    <iframe frameborder='0' hight='100%' width='100%' src="https://www.geoportal-hamburg.de/micado/" id='map'></iframe>
</template>
<script>
export default {
  name: 'MasterPortal'
}
</script>
<style scoped>
#map {
  /* a very dirty hack... */
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>

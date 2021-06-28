<template>
<q-field label-color="black" class="header" color="purple-12" :label="$t('desc_labels.location')"  clickable stack-label >
  <template v-slot:prepend>
    <q-icon class="icon" name="img:statics/icons/location.svg" />
  </template>
  <template v-slot:control>
    <div class="self-center full-width no-outline" tabindex="0"><a :href="gmap_location"> {{label}} </a></div>
  </template>
</q-field>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['label'],
  data () {
    return {}
  },
  computed: {
    gmap_location() {
      return "https://www.google.com/maps/search/?api=1&query=" + this.label
    }
  }
}
</script>
<style scoped>
.header{
  font-weight: 400;
  font-size: 12px; 
  padding-left:30px; 
  padding-right:30px
}
.icon{
  width:15px;
  height: 15px;
  margin-top: -22px;
}
</style>

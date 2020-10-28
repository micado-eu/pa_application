<template>
  <q-card class="stat-element">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div class="text-h4">{{ data.total }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'StatElement',
  props: ["data", "title"],

  data () {
    return {}
  }
}
</script>
<style lang="sass" scoped>
.stat-element
  width: 100%
  max-width: 200px
</style>
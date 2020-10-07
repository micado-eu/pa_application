<template>
  <div>
    <ActiveLanguageSelector />
    <FunctionConfiguration />
  </div>
</template>

<script>
import ActiveLanguageSelector from './settings/ActiveLanguageSelector.vue'
import FunctionConfiguration from '../pages/settings/FunctionConfiguration.vue'

export default {
  name: 'Settings',
  components: {
    ActiveLanguageSelector,
    FunctionConfiguration
  },
  computed: {},
  mounted () { }
}
</script>

<style>
</style>

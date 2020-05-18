<template>
  <edit-glossary
    v-on:save="saveNewGlossaryItem($event)"
  />
</template>

<script>
import { mapActions } from "vuex"
export default {
  components: {
    "edit-glossary": require('components/EditGlossaryElement.vue').default,
  },
  methods: {
    ...mapActions("glossary", ["saveNewGlossaryItem"]),
  }
}
</script>

<style>
</style>
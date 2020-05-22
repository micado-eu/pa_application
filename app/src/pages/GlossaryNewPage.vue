<template>
  <edit-glossary
    v-on:save="saveNewGlossaryItemAndReturn($event)"
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
    saveNewGlossaryItemAndReturn(data) {
      let router = this.$router
      this.saveNewGlossaryItem(data).then(() => {
        router.push({ path: "/glossary" })
      })
    }
  }
}
</script>

<style>
</style>
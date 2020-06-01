<template>
  <edit-glossary
    class="q-ma-md"
    pagetitle="Add New Glossary Term"
    v-on:save="saveNewGlossaryItemAndReturn($event)"
  />
</template>

<script>
import { mapActions } from "vuex"
export default {
  data() {
    return {
      pagetitle: "Add New Glossary Term"
    }
  },
  components: {
    "edit-glossary": require('components/glossary/EditGlossaryElement.vue').default,
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
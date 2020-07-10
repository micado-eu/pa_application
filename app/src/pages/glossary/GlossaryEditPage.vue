<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-glossary
      v-if="!loading"
      class="q-ma-md"
      pagetitle="Edit Glossary Term"
      v-on:save="editGlossaryItemAndReturn($event)"
      :elem="elem"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      loading: false,
      elem: {}
    }
  },
  components: {
    "edit-glossary": require('components/glossary/EditGlossaryElement.vue').default,
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary", "editGlossaryItem", "addNewGlossaryItemTranslation"]),
    editGlossaryItemAndReturn(data) {
      let router = this.$router
      let dataWithId = Object.assign(data, { id: parseInt(this.$route.params.id) })
      let idx = this.elem.translations.findIndex(t => t.lang === data.lang)
      if (idx !== -1) {
        this.editGlossaryItem(dataWithId).then(() => {
          router.push({ path: "/glossary" })
        })
      } else {
        this.addNewGlossaryItemTranslation(dataWithId).then(() => {
          router.push({ path: "/glossary" })
        })
      }
    }
  },
  computed: {
    ...mapGetters("glossary", ["glossaryElemById"]),
  },
  created() {
    this.loading = true
    this.fetchGlossary().then(() => {
      this.elem = this.glossaryElemById(this.$route.params.id)
      this.loading = false
    })
  }
}
</script>

<style>
</style>
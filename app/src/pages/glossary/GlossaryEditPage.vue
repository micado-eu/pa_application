<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-glossary
      v-if="!loading"
      v-on:save="editGlossaryItemAndReturn($event)"
      :title="title"
      :description="description"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  data () {
    return {
      loading: false,
      glossaryElem: undefined
    }
  },
  components: {
    "edit-glossary": require('components/glossary/EditGlossaryElement.vue').default,
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary", "editGlossaryItem"]),
    editGlossaryItemAndReturn (data) {
      let router = this.$router
      this.editGlossaryItem(Object.assign(data, { id: this.$route.params.id })).then(() => {
        router.push({ path: "/glossary" })
      })
    }
  },
  computed: {
    ...mapGetters("glossary", ["glossaryElemById"]),
    title: function () {
      let elem = this.glossaryElemById(this.$route.params.id)
      if (elem) {
        return elem.title
      } else {
        return ""
      }
    },
    description: function () {
      let elem = this.glossaryElemById(this.$route.params.id)
      if (elem) {
        return elem.description
      } else {
        return ""
      }
    }
  },
  created () {
    this.loading = true
    this.fetchGlossary().then(() => {
      this.loading = false
    })
  }
}
</script>

<style>
</style>
<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-search-tags
      v-if="!loading"
      :elements="glossary"
      new_url="glossary/new"
      :edit_url_fn="getEditRoute"
      title="Glossary"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import ListSearchTags from '../components/ListSearchTags'
export default {
  data() {
    return {
      loading: true,
    }
  },
  components: {
    "list-search-tags": ListSearchTags
  },
  computed: {
    ...mapGetters("glossary", ["glossary"]),
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary"]),
    getEditRoute (id) {
      return "glossary/" + id + "/edit"
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
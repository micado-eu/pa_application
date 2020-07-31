<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-search-tags
      v-if="!loading"
      :elements="glossary"
      new_url="glossary/new"
      :edit_url_fn="getEditRoute"
      :delete_fn="deleteItem"
      icon_name="img:statics/icons/MICADO PA APP Icon - Glossary Page (white).png"
      add_label="Add Term"
      title="Glossary"
      publish_mode
      :update_publish_fn="updatePublishGlossaryItem"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import ListSearchTags from 'components/ListSearchTags'
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
    ...mapActions("glossary", [
      "fetchGlossary",
      "deleteGlossaryItem",
      "updatePublishGlossaryItem"
    ]),
    getEditRoute(id) {
      return "glossary/" + id + "/edit"
    },
    deleteItem(item) {
      this.loading = true
      this.deleteGlossaryItem(item)
        .then(this.fetchGlossary)
        .then(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.loading = true
    this.fetchGlossary().then(() => {
      this.loading = false
    })
  }
}
</script>

<style>
</style>
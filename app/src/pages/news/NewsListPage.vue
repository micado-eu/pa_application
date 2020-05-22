<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-search-tags
      v-if="!loading"
      :elements="news"
      new_url="news/new"
      :edit_url_fn="getEditRoute"
      title="News"
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
    ...mapGetters("news", ["news"]),
  },
  methods: {
    ...mapActions("news", ["fetchNews"]),
    getEditRoute (id) {
      return "news/" + id + "/edit"
    }
  },
  created () {
    this.loading = true
    this.fetchNews().then(() => {
      this.loading = false
    })
  }
}
</script>

<style>
</style>
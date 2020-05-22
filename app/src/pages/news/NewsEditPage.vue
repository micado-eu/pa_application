<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-news
      v-if="!loading"
      v-on:save="editNewsItemAndReturn($event)"
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
      newsElem: undefined
    }
  },
  components: {
    "edit-news": require('components/news/EditNewsElement.vue').default,
  },
  methods: {
    ...mapActions("news", ["fetchNews", "editNewsItem"]),
    editNewsItemAndReturn (data) {
      let router = this.$router
      this.editNewsItem(Object.assign(data, { id: this.$route.params.id })).then(() => {
        router.push({ path: "/news" })
      })
    }
  },
  computed: {
    ...mapGetters("news", ["newsElemById"]),
    title: function () {
      let elem = this.newsElemById(this.$route.params.id)
      if (elem) {
        return elem.title
      } else {
        return ""
      }
    },
    description: function () {
      let elem = this.newsElemById(this.$route.params.id)
      if (elem) {
        return elem.description
      } else {
        return ""
      }
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
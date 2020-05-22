<template>
  <edit-news
    v-on:save="saveNewNewsItemAndReturn($event)"
  />
</template>

<script>
import { mapActions } from "vuex"
export default {
  components: {
    "edit-news": require('components/news/EditNewsElement.vue').default,
  },
  methods: {
    ...mapActions("news", ["saveNewNewsItem"]),
    saveNewNewsItemAndReturn(data) {
      let router = this.$router
      this.saveNewNewsItem(data).then(() => {
        router.push({ path: "/news" })
      })
    }
  }
}
</script>

<style>
</style>
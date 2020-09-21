<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-search-tags
      v-if="!loading"
      :elements="informationElems"
      new_url="information/new"
      :edit_url_fn="getEditRoute"
      :delete_fn="deleteItem"
      icon_name="document"
      add_label="button.add_event"
      title="information_centre.list_title"
      categories_enabled
      categories_url="/information/categories"
      tags_enabled
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListSearchTags from 'components/ListSearchTags'

export default {
  data() {
    return {
      loading: true,
      informationElems: []
    }
  },
  components: {
    'list-search-tags': ListSearchTags
  },
  computed: {
    ...mapGetters('information', ['information']),
    ...mapGetters('information_category', ['informationCategories']),
    ...mapGetters('information_tags', ['informationTagsByInformation'])
  },
  methods: {
    ...mapActions('information', [
      'fetchInformation',
      'deleteInformationItem'
    ]),
    ...mapActions('information_category', ['fetchInformationCategory']),
    ...mapActions('information_tags', ['fetchInformationTags', 'deleteInformationTagsFromInformation']),
    getEditRoute(id) {
      return `information/${id}/edit`
    },
    deleteItem(item) {
      this.deleteInformationTagsFromInformation(item.id)
        .then(this.deleteInformationItem(item))
        .then(this.fetchInformation())
        .then(() => {
          this.$router.go()
        })
    }
  },
  created() {
    this.loading = true
    this.fetchInformation().then(() => {
      this.fetchInformationCategory().then(() => {
        this.fetchInformationTags().then(() => {
          this.informationElems = JSON.parse(JSON.stringify(this.information))
          const informationCategoryElems = [...this.informationCategories]
          for (let i = 0; i < this.informationElems.length; i += 1) {
            const elem = this.informationElems[i]
            // Set categories-elements relations
            const idxCat = elem.category
            const idxCategoryObject = informationCategoryElems.findIndex(
              (ic) => ic.id === idxCat
            )
            elem.category = informationCategoryElems[idxCategoryObject]
            // Set tag-elements relations
            elem.tags = this.informationTagsByInformation(elem.id)
          }
          this.loading = false
        })
      })
    })
  }
}
</script>

<style></style>

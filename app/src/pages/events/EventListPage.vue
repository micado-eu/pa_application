<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-search-tags
      v-if="!loading"
      :elements="eventElems"
      new_url="events/new"
      :edit_url_fn="getEditRoute"
      :delete_fn="deleteItem"
      icon_name="document"
      add_label="button.add_event"
      title="events.list_title"
      categories_enabled
      categories_url="/events/categories"
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
      eventElems: []
    }
  },
  components: {
    'list-search-tags': ListSearchTags
  },
  computed: {
    ...mapGetters('event', ['event']),
    ...mapGetters('event_category', ['eventCategories']),
    ...mapGetters('event_tags', ['eventTagsByEvent'])
  },
  methods: {
    ...mapActions('event', [
      'fetchEvent',
      'deleteEventItem'
    ]),
    ...mapActions('event_category', ['fetchEventCategory']),
    ...mapActions('event_tags', ['fetchEventTags', 'deleteEventTagsFromEvent']),
    getEditRoute(id) {
      return `event/${id}/edit`
    },
    deleteItem(item) {
      this.loading = true
      this.deleteEventTagsFromEvent(item.id)
        .then(this.deleteEventItem(item))
        .then(this.fetchEvent())
        .then(() => {
          this.$router.go()
        })
    }
  },
  created() {
    this.loading = true
    this.fetchEvent().then(() => {
      this.fetchEventCategory().then(() => {
        this.fetchEventTags().then(() => {
          this.eventElems = JSON.parse(JSON.stringify(this.event))
          const eventCategoryElems = [...this.eventCategories]
          for (const elem of this.eventElems) {
            // Set categories-elements relations
            const idxCat = elem.category
            const idxCategoryObject = eventCategoryElems.findIndex(
              (ic) => ic.id === idxCat
            )
            elem.category = eventCategoryElems[idxCategoryObject]
            // Set tag-elements relations
            elem.tags = this.eventTagsByEvent(elem.id)
          }
          this.loading = false
        })
      })
    })
  }
}
</script>

<style></style>
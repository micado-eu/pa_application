<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-event
      v-if="!loading"
      v-on:save="editEventItemAndReturn($event)"
      :tags="tags"
      :elem="elem"
      class="q-ma-md"
      pagetitle="events.edit"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      elem: undefined,
      tags: undefined
    }
  },
  components: {
    'edit-event': require('components/events/EditEventElement.vue')
      .default
  },
  methods: {
    ...mapActions('event', [
      'fetchEvent',
      'editEventItem',
      'editEventItemTranslation',
      'addNewEventItemTranslation'
    ]),
    ...mapActions('event_tags', [
      'fetchEventTags',
      'deleteEventTagsFromEvent',
      'saveEventTags'
    ]),
    editEventItemAndReturn(data) {
      const router = this.$router
      const categoryId = data.category.id
      const id = parseInt(this.$route.params.id)
      const eventData = {
        id,
        category: categoryId
      }
      delete data.category
      const tags = data.tags.map((tag_lbl) => ({
        lang: data.lang,
        tag: tag_lbl
      }))
      delete data.tags
      const dataWithId = Object.assign(data, {
        id
      })
      this.editEventItem(eventData).then(() => {
        const idx = this.elem.translations.findIndex((t) => t.lang === data.lang)
        if (idx !== -1) {
          this.editEventItemTranslation(dataWithId).then(() => {
            this.deleteEventTagsFromEvent(id).then(() => {
              if (tags.length > 0) {
                this.saveEventTags({
                  eventId: id,
                  tags
                }).then(() => {
                  router.push({ path: '/events' })
                })
              } else {
                router.push({ path: '/events' })
              }
            })
          })
        } else {
          this.addNewEventItemTranslation(dataWithId).then(() => {
            if (tags.length > 0) {
              this.saveEventTags({
                eventId: id,
                tags
              }).then(() => {
                router.push({ path: '/events' })
              })
            } else {
              router.push({ path: '/events' })
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters('event', ['eventElemById']),
    ...mapGetters('event_tags', ['eventTagsByEvent'])
  },
  created() {
    this.loading = true
    this.fetchEvent().then(() => {
      this.elem = this.eventElemById(this.$route.params.id)
      this.fetchEventTags().then(() => {
        this.tags = this.eventTagsByEvent(this.elem.id)
        this.loading = false
      })
    })
  }
}
</script>

<style></style>

<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-search-tags
      v-if="!loading"
      :elements="glossary"
      new_url="glossary/new"
      :edit_url_fn="getEditRoute"
      :delete_fn="deleteItem"
      :publish_fn="updatePublishedEvents"
      icon_name="img:statics/icons/MICADO PA APP Icon - Glossary Page (white).png"
      add_label="button.add_glossary"
      title="glossary.list_title"
      alphabetical_sorting
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListSearchTags from 'components/ListSearchTags'

export default {
  data() {
    return {
      loading: true
    }
  },
  components: {
    'list-search-tags': ListSearchTags
  },
  computed: {
    ...mapGetters('glossary', ['glossary', 'glossaryElemById'])
  },
  methods: {
    ...mapActions('glossary', [
      'fetchGlossary',
      'deleteGlossaryItem',
      'updatePublished',
      'deleteProdTranslations',
      'addNewGlossaryItemTranslationProd'
    ]),
    getEditRoute(id) {
      return `glossary/${id}/edit`
    },
    deleteItem(item) {
      this.loading = true
      this.deleteGlossaryItem(item)
        .then(this.fetchGlossary)
        .then(() => {
          this.loading = false
        }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while deleting glossary term: ${err}`
          })
        })
    },
    updatePublishedEvents(published, id) {
      let glossaryElem = this.glossaryElemById(id)
      if (glossaryElem.translations[0].translationState === 4 && glossaryElem.published && !published) {
        // If published goes from true to false, all the content gets deleted from the translation prod table
        this.deleteProdTranslations(id).then(() => {
          console.log("Deleted prod translations")
        }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while deleting glossary production translations: ${err}`
          })
        })
      } else if (glossaryElem.translations[0].translationState === 4 && !glossaryElem.published && published) {
        // If published goes from false to true, all the content with the state "translated" must be copied into the prod table
        for (let i = 0; i < glossaryElem.translations.length; i += 1) {
          const translation = Object.assign({}, glossaryElem.translations[i])
          delete translation.translationState
          delete translation.published
          this.addNewGlossaryItemTranslationProd(translation).catch((err) => {
            this.$q.notify({
              type: 'negative',
              message: `Error while saving glossary production translation ${translation.lang}: ${err}`
            })
          })
        }
      }
      this.updatePublished({ id, published }).catch((err) => {
        this.$q.notify({
          type: 'negative',
          message: `Error while updating published state: ${err}`
        })
      })
    }
  },
  created() {
    this.loading = true
    this.fetchGlossary().then(() => {
      this.loading = false
    }).catch((err) => {
      this.$q.notify({
        type: 'negative',
        message: `Error while fetching glossary: ${err}`
      })
    })
  }
}
</script>

<style>
</style>

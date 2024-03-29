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
      add_label="button.add_glossary"
      import_label="button.import_glossary"
      :import_fn="importTerm"
      :export_fn="exportData"
      header_img="img:statics/glossary_header.svg"
      title="glossary.list_title"
      alphabetical_sorting
      entity="glossary"
      @batchUpload="updateContent()"
      :on_publish="onPublish"
      :on_unpublish="onUnpublish"
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
      'editGlossaryItemTranslation',
      'deleteProdTranslations',
      'saveGlossaryTranslationProd',
      'updatePublished',
      'importData',
      'exportData'
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
    importTerm(file) {
      console.log(file)
      this.importData(file).then(() => 
          this.updateContent()
      ).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while importing term: ${err}`
          })
        })
    },
    updateContent() {
      this.loading = true
      this.fetchGlossary().then(() => {
        this.loading = false
      }).catch((err) => {
        this.$q.notify({
          type: 'negative',
          message: `Error while fetching glossary: ${err}`
        })
      })
    },
    onPublish(id) {
      return Promise.all([
        this.saveGlossaryTranslationProd(id).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while saving glossary production translation: ${err}`
          })
        }),
        this.updatePublished({ id, published: true }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while updating published state: ${err}`
          })
        })
      ])
    },
    onUnpublish(id) {
      let glossaryElem = this.glossaryElemById(id)
      let promises = []
      const translation = Object.assign({}, glossaryElem.translations.filter(t => !t.translated)[0])
      promises.push(
        this.editGlossaryItemTranslation(translation).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while saving glossary translation: ${err}`
          })
        })
      )
      promises.push(
        this.deleteProdTranslations(id).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while deleting glossary production translations: ${err}`
          })
        }),
        this.updatePublished({ id, published: false }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while updating published state: ${err}`
          })
        })
      )
      return Promise.all(promises)
    }
  },
  created() {
    this.updateContent()
  }
}
</script>

<style>
</style>

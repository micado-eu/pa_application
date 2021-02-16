<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-glossary
      v-if="!loading"
      class="q-ma-md"
      pagetitle="glossary.edit"
      v-on:save="editGlossaryItemAndReturn($event)"
      :elem="elem"
      :on_publish="onPublish"
      :on_unpublish="onUnpublish"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      elem: {}
    }
  },
  components: {
    'edit-glossary': require('components/glossary/EditGlossaryElement.vue').default
  },
  methods: {
    ...mapActions('glossary', [
      'fetchGlossary',
      'editGlossaryItem',
      'editGlossaryItemTranslation',
      'deleteProdTranslations',
      'addNewGlossaryItemTranslationProd',
      'updatePublished'
    ]),
    onPublish(id) {
      let glossaryElem = this.glossaryElemById(id)
      let promises = []
      for (let i = 0; i < glossaryElem.translations.length; i += 1) {
        const translation = Object.assign({}, glossaryElem.translations[i])
        delete translation.translationState
        delete translation.published
        promises.push(
          this.addNewGlossaryItemTranslationProd(translation).catch((err) => {
            this.$q.notify({
              type: 'negative',
              message: `Error while saving glossary production translation ${translation.lang}: ${err}`
            })
          })
        )
      }
      promises.push(
        this.updatePublished({ id, published: true }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while updating published state: ${err}`
          })
        })
      )
      return Promise.all(promises)
    },
    onUnpublish(id) {
      let glossaryElem = this.glossaryElemById(id)
      let promises = []
      for (let i = 0; i < glossaryElem.translations.length; i += 1) {
        const translation = Object.assign({}, glossaryElem.translations[i])
        translation.translationState = 0
        promises.push(
          this.editGlossaryItemTranslation(translation).catch((err) => {
            this.$q.notify({
              type: 'negative',
              message: `Error while saving event translation ${dataWithId.lang}: ${err}`
            })
          })
        )
      }
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
    },
    editGlossaryItemAndReturn(data) {
      const router = this.$router
      const id = parseInt(this.$route.params.id, 10)
      const glossaryData = {
        id,
        published: data[0].published
      }
      this.editGlossaryItem(glossaryData).then(() => {
        for (let i = 0; i < data.length; i += 1) {
          const translation = data[i]
          delete translation.published
          delete translation.creator
          const dataWithId = Object.assign(translation, { id: parseInt(this.$route.params.id) })
          this.editGlossaryItemTranslation(dataWithId).then(() => {
            if (i === data.length - 1) {
              router.push({ path: '/glossary' })
            }
          }).catch((err) => {
            this.$q.notify({
              type: 'negative',
              message: `Error while saving glossary term translation ${dataWithId.lang}: ${err}`
            })
          })
        }
      }).catch((err) => {
        this.$q.notify({
          type: 'negative',
          message: `Error while saving glossary element: ${err}`
        })
      })
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossaryElemById'])
  },
  created() {
    this.loading = true
    this.fetchGlossary().then(() => {
      this.elem = this.glossaryElemById(this.$route.params.id)
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

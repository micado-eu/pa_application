<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-glossary
      v-if="!loading"
      class="q-ma-md"
      pagetitle="glossary.edit"
      v-on:save="editGlossaryItemAndReturn($event)"
      :elem="elem"
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
      'addNewGlossaryItemTranslationProd'
    ]),
    editGlossaryItemAndReturn(data) {
      const router = this.$router
      const id = parseInt(this.$route.params.id, 10)
      const glossaryData = {
        id,
        published: data[0].published
      }
      if (this.elem.published && data[0].translationState === 0) {
        this.deleteProdTranslations(id).then(() => {
          console.log("Deleted prod translations")
        }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while deleting glossary production translations: ${err}`
          })
        })
      }
      if (this.elem.published && !glossaryData.published) {
        // If published goes from true to false, all the content gets deleted from the translation prod table
        this.deleteProdTranslations(id).then(() => {
          console.log("Deleted prod translations")
        }).catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Error while deleting glossary production translations: ${err}`
          })
        })
      }
      this.editGlossaryItem(glossaryData).then(() => {
        for (let i = 0; i < data.length; i += 1) {
          const translation = data[i]
          delete translation.published
          const dataWithId = Object.assign(translation, { id: parseInt(this.$route.params.id) })
          this.editGlossaryItemTranslation(dataWithId).then(() => {
            if (!this.elem.published && glossaryData.published && dataWithId.translationState === 4) {
              // If published goes from false to true, all the content with the state "translated" must be copied into the prod table
              delete dataWithId.translationState
              delete dataWithId.published
              this.addNewGlossaryItemTranslationProd(dataWithId).catch((err) => {
                this.$q.notify({
                  type: 'negative',
                  message: `Error while saving glossary term production translation ${dataWithId.lang}: ${err}`
                })
              })
            }
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

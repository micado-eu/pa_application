<template>
  <edit-glossary
    pagetitle="glossary.add_new"
    v-on:save="saveNewGlossaryItemAndReturn($event)"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    'edit-glossary': require('components/glossary/EditGlossaryElement.vue')
      .default
  },
  methods: {
    ...mapActions('glossary', [
      'saveNewGlossaryItem',
      'addNewGlossaryItemTranslation'
    ]),
    saveNewGlossaryItemAndReturn(translationData) {
      const router = this.$router
      let id = -1
      const glossaryData = {
        published: translationData[0].published
      }
      this.saveNewGlossaryItem(glossaryData)
        .then((newData) => {
          id = newData.id
          for (let i = 0; i < translationData.length; i += 1) {
            const translation = translationData[i]
            delete translation.published
            const dataWithId = Object.assign(translation, { id })
            this.addNewGlossaryItemTranslation(dataWithId).then(() => {
              if (i === translationData.length - 1) {
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
            message: `Error while saving glossary term: ${err}`
          })
        })
    }
  }
}
</script>

<style></style>

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
      'editGlossaryItemTranslation'
    ]),
    editGlossaryItemAndReturn(data) {
      const router = this.$router
      for (let i = 0; i < data.length; i += 1) {
        const translation = data[i]
        delete translation.published
        delete translation.username
        delete translation.realm
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

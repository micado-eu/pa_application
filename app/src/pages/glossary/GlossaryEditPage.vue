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
    ...mapActions('glossary', ['fetchGlossary', 'editGlossaryItemTranslation']),
    editGlossaryItemAndReturn(data) {
      const router = this.$router
      const idx = this.elem.translations.findIndex((t) => t.lang === data.lang)
      for (let i = 0; i < data.length; i += 1) {
        const translation = data[i]
        const dataWithId = Object.assign(translation, { id: parseInt(this.$route.params.id) })
        this.editGlossaryItemTranslation(dataWithId).then(() => {
          if (i === data.length - 1) {
            router.push({ path: '/glossary' })
          }
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
    })
  }
}
</script>

<style>
</style>

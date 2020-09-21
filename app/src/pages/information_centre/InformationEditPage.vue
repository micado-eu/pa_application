<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-information
      v-if="!loading"
      v-on:save="editInformationItemAndReturn($event)"
      :tags="tags"
      :elem="elem"
      class="q-ma-md"
      pagetitle="information_centre.edit"
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
    'edit-information': require('components/information_centre/EditInformationElement.vue')
      .default
  },
  methods: {
    ...mapActions('information', [
      'fetchInformation',
      'editInformationItem',
      'editInformationItemTranslation',
      'addNewInformationItemTranslation'
    ]),
    ...mapActions('information_tags', [
      'fetchInformationTags',
      'deleteInformationTagsFromInformation',
      'saveInformationTags'
    ]),
    editInformationItemAndReturn(data) {
      const router = this.$router
      const categoryId = data[0].category.id
      const id = parseInt(this.$route.params.id, 10)
      const eventData = {
        id,
        category: categoryId
      }
      this.editInformationItem(eventData).then(() => {
        for (let i = 0; i < data.length; i += 1) {
          const translation = data[i]
          delete translation.category
          const tags = translation.tags.map((tagLbl) => ({
            lang: translation.lang,
            tag: tagLbl
          }))
          delete translation.tags
          const dataWithId = Object.assign(translation, {
            id
          })

          this.editInformationItemTranslation(dataWithId).then(() => {
            this.deleteInformationTagsFromInformation(id).then(() => {
              if (tags.length > 0) {
                this.saveInformationTags({
                  informationId: id,
                  tags
                }).then(() => {
                  router.push({ path: '/information' })
                })
              } else {
                router.push({ path: '/information' })
              }
            })
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters('information', ['informationElemById']),
    ...mapGetters('information_tags', ['informationTagsByInformation'])
  },
  created() {
    this.loading = true
    this.fetchInformation().then(() => {
      this.elem = this.informationElemById(this.$route.params.id)
      this.fetchInformationTags().then(() => {
        this.tags = this.informationTagsByInformation(this.elem.id)
        this.loading = false
      })
    })
  }
}
</script>

<style></style>

<template>
  <div>
    <edit-element
      :title="title"
      :description="description"
      :save_item_fn="saveInformationItem"
      :tags="tags"
      :pagetitle="pagetitle"
      tags_enabled
    />
  </div>
</template>

<script>
import EditElement from 'components/EditElement'
export default {
  name: "EditInformationElement",
  components: {
    "edit-element": EditElement
  },
  props: {
    "title": {
      type: String,
    },
    "description": {
      type: String | Object,
    },
    "tags": {
      type: Array
    },
    "pagetitle": {
      type: String
    },
    "lang": {
      type: String
    }
  },
  methods: {
    saveInformationItem(title, desc, lang, tags) {
      this.$emit('save', { title: title, description: desc, tags: tags, lang })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
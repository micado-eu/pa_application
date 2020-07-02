<template>
  <div>
    <edit-element
      :title="title"
      :description="description"
      :save_item_fn="saveGlossaryItem"
      :pagetitle="pagetitle"
      :activeLanguage="lang"
    />
  </div>
</template>

<script>
import EditElement from 'components/EditElement'
export default {
  name: "EditGlossaryElement",
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
    "pagetitle": {
      type: String
    },
    "lang": {
      type: String
    }
  },
  methods: {
    saveGlossaryItem(title, desc, lang, tags) {
      this.$emit('save', { title: title, description: desc, lang })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
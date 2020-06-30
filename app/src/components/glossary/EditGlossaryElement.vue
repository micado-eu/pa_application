<template>
  <div>
    <edit-element
      :title="title"
      :description="description"
      :save_item_fn="saveGlossaryItem"
      :pagetitle="pagetitle"
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
    }
  },
  methods: {
    saveGlossaryItem(title, desc, tags) {
      this.$emit('save', { title: title, description: desc })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
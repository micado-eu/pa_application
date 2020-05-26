<template>
  <div>
    <edit-element
      :title="title"
      :description="description"
      :save_item_fn="saveGlossaryItem"
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
    "tags": {
      type: Array
    }
  },
  methods: {
    saveGlossaryItem(title, desc, tags) {
      this.$emit('save', { title: title, description: desc, tags: tags })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <div>
    <edit-element
      :title="title"
      :description="description"
      :save_item_fn="saveNewsItem"
    />
  </div>
</template>

<script>
import EditElement from 'components/EditElement'
export default {
  name: "EditNewsElement",
  components: {
    "edit-element": EditElement
  },
  props: {
    "title": {
      type: String,
    },
    "description": {
      type: String | Object,
    }
  },
  methods: {
    saveNewsItem(title, desc) {
      this.$emit('save', {title: title, description: desc})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
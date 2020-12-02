<template>
  <div>
    <edit-element
      :elem="elem"
      :save_item_fn="saveGlossaryItem"
      :pagetitle="pagetitle"
      :description_max_length="800"
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
    "elem": {
      type: Object
    },
    "pagetitle": {
      type: String
    }
  },
  methods: {
    saveGlossaryItem(translations) {
      this.$emit('save', translations)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
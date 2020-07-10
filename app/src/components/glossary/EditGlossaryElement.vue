<template>
  <div>
    <edit-element
      :elem="elem"
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
    "elem": {
      type: Object,
    },
    "pagetitle": {
      type: String
    },
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
<template>
  <div padding>
    <span>Title:</span>
    <q-input
      color="accent"
      outlined
      label="Title"
      label-color="accent"
      v-model="internalTitle"
    />
    <span>Description:</span>
    <glossary-editor
      class="desc-editor"
      :content="description"
      v-on:editorSave="save_item_fn(internalTitle, $event)"
    />
  </div>
</template>

<script>
export default {
  name: "EditElement",
  data () {
    return {
      internalTitle: this.title
    }
  },
  props: {
    "title": {
      type: String,
      default: ""
    },
    "description": {
      type: String | Object,
      default: ""
    },
    "save_item_fn": {
      type: Function,
    }
  },
  components: {
    "glossary-editor": require('components/GlossaryEditor.vue').default,
  },
}
</script>

<style lang="scss" scoped>
.desc-editor {
  border: 1px solid $primary;
  border-radius: 10px;
}
</style>
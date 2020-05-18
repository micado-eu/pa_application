<template>
  <div padding>
    <span>Title: </span>
    <q-input
      color="primary"
      outlined
      label="Title"
      v-model="internalTitle"
    />
    <span>Description: </span>
    <glossary-editor
      :content="description"
      v-on:editorSave="saveGlossaryItem($event)"
    />
  </div>
</template>

<script>
export default {
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
    }
  },
  components: {
    "glossary-editor": require('components/GlossaryEditor.vue').default,
  },
  methods: {
    saveGlossaryItem(data) {
      this.$emit('save', {title: this.internalTitle, description: data})
    }
  }
}
</script>

<style>
</style>
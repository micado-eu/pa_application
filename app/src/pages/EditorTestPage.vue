<template>
  <q-page padding>
    <glossary-editor
      class="glossaryeditor"
      v-on:editorSave="doSomething($event)"
    />
  </q-page>
</template>
<script>
export default {
  components: {
    "glossary-editor": require('components/GlossaryEditor.vue').default,
  },
  methods: {
    doSomething (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss">
  .glossaryeditor {
    border: 1px solid $primary
  }
</style>
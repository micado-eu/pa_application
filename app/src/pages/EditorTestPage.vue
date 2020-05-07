<template>
  <glossary-editor v-on:editorSave="doSomething($event)"></glossary-editor>
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
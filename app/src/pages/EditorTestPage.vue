<template>
  <q-page padding>
    <span>Editor: </span>
    <glossary-editor
      class="glossaryeditor"
      v-on:editorSave="doSomething($event)"
    />
    <hr/>
    <span>Viewer:</span>
    <glossary-editor-viewer
      class="glossaryeditor"
      ref="viewer"
      :content="demo"
    />
  </q-page>
</template>
<script>
export default {
  components: {
    "glossary-editor": require('components/GlossaryEditor.vue').default,
    "glossary-editor-viewer": require('components/GlossaryEditorViewer.vue').default
  },
  data() {
    return {
      demo: {
        "content": [
          {
            "content": [
              {
                "type": "text",
                "text": "This is a demo with a glossary mention "
              },
              {
                "type": "mention",
                "attrs": {
                  "id": 2,
                  "label": "Rental agreement"
                }
              },
              {
                "type": "text",
                "text": " "
              }
            ],
            "type": "paragraph"
          },
          {
            "type": "horizontal_rule"
          },
          {
            "type": "paragraph",
            "content": [
              {
                "marks": [
                  {
                    "type": "strike"
                  }
                ],
                "type": "text",
                "text": "This is another demo with a glossary term"
              }
            ]
          }
        ],
        "type": "doc"
      }
    }
  },
  methods: {
    doSomething (e) {
      console.log(e)
      this.$refs.viewer.setContent(e)
    }
  }
}
</script>
<style lang="scss">
  .glossaryeditor {
    border: 1px solid $primary;
  }
</style>
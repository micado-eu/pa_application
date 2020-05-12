<template>
  <editor-content
    class="editor__content"
    :editor="editor"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { Editor, EditorContent } from "tiptap"
import {
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Link,
  Strike,
  Underline,
  HardBreak,
  Heading,
  Bold,
  Italic,
  Mention
} from "tiptap-extensions"
export default {
  name: "GlossaryEditorViewer",
  components: {
    EditorContent
  },
  props: {
    content:{
      type: String | Object,
      default: ""
    }
  },
  data () {
    return {
      editor: null
    }
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary"]),
    setContent(content) {
      this.editor.setContent(content)
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossary']),
  },
  created () {
    this.fetchGlossary().then(() => {
      this.editor = new Editor({
        editable: false,
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Mention({
            items: () => this.glossary,
          }),
          new Bold(),
          new Italic(),
          new Blockquote(),
          new BulletList(),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Strike(),
          new Underline(),
        ],
        content: this.content
      })
    })
  }
}
</script>

<style>
</style>
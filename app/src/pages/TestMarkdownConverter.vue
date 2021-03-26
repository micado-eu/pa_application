<template>
  <div>
    <div>Write here:</div>
    <div>
      <div>
        <glossary-editor
          v-model="htmlToConvert"
          ref="editor"
        ></glossary-editor>
      </div>
      <q-btn @click="applyConversions()">Convert</q-btn>
    </div>
    <q-separator></q-separator>
    <div>Pure Editor HTML obtained calling editor.getHTML():</div>
    <div><code>{{editorHTML}}</code></div>
    <q-separator></q-separator>
    <div>Markdown obtained calling editor.getContent() (references marked):</div>
    <div><code>{{convertedMarkdown}}</code></div>
    <q-separator></q-separator>
    <div>Markdown -> HTML:</div>
    <div><code>{{reconvertedHTML}}</code></div>
    <q-separator></q-separator>
    <div>HTML -> Markdown:</div>
    <div><code>{{reconvertedMd}}</code></div>
    <q-separator></q-separator>
    <div>Viewer:</div>
    <div>
      <glossary-editor-viewer
        :content="reconvertedMd"
        v-if="reconvertedMd"
        all_fetched
        ref="viewer"
      ></glossary-editor-viewer>
    </div>
  </div>
</template>

<script>
import markdownConverterMixin from '../mixin/markdownConverterMixin'
import GlossaryEditorViewer from '../components/GlossaryEditorViewer'
import GlossaryEditor from '../components/GlossaryEditor'

export default {
  name: "TestMarkdownConverter",
  mixins: [markdownConverterMixin],
  components: {
    GlossaryEditorViewer,
    GlossaryEditor
  },
  data() {
    return {
      htmlToConvert: `<p>Glossary: identity card</p>
<p>Information centre: Curso de castellano</p>
<p>Events: english Course</p>
<p>Guided processes: enroll children to school</p>`,
      editorHTML: "",
      convertedMarkdown: "",
      reconvertedHTML: "",
      reconvertedMd: "",
      allFetched: false
    }
  },
  methods: {
    async applyConversions() {
      this.editorHTML = this.$refs.editor.getHTML()
      this.convertedMarkdown = await this.$refs.editor.getContent()
      this.allFetched = true
      this.reconvertedHTML = this.markdownToHTML(this.convertedMarkdown)
      this.reconvertedMd = await this.HTMLToMarkdown(this.reconvertedHTML, 'en', 'en', true)
      if (this.$refs.viewer) {
        this.$refs.viewer.setContent(this.reconvertedMd)
      }
    }
  }

}
</script>

<style>
</style>
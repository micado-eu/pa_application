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
    <div>Markdown to Convert:</div>
    <div><code>{{htmlToConvert}}</code></div>
    <q-separator></q-separator>
    <div>Pure Editor HTML obtained calling editor.getHTML():</div>
    <div><code>{{editorHTML}}</code></div>
    <q-separator></q-separator>
    <div>Markdown obtained calling editor.getContent() (references marked if entities not faked):</div>
    <div><code>{{convertedMarkdown}}</code></div>
    <q-separator></q-separator>
    <div>Markdown -> HTML:</div>
    <div><code>{{reconvertedHTML}}</code></div>
    <q-separator></q-separator>
    <div>HTML -> Markdown:</div>
    <div><code>{{reconvertedMd}}</code></div>
    <q-separator></q-separator>
    <div>Markdown -> HTML again:</div>
    <div><code>{{rereconvertedHTML}}</code></div>
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
    <div>Second editor:</div>
    <div>
      <glossary-editor
        v-model="reconvertedMd"
        v-if="reconvertedMd"
        readonly
        all_fetched
      ></glossary-editor>
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
      htmlToConvert: `anderes Wort für >**Bundesagentur für Arbeit**  
      Die Arbeitsagentur (früher: Arbeitsamt) ist Ansprechpartnerin für Bürgerinnen und Bürger und Unternehmen für Themen des **Arbeits- und Ausbildung smarktes**.  
      Wichtigeste **Aufgaben** der Agentur für Arbeit sind:  
      \- Vermittlung von Lehrstellen und Jobs  
      \- Berufsberatung  
      \- Förderung der Berufsausbildung  
      Menschen ohne Arbeit beantragen zusätzlich bei der Arbeitsagentur ihr Arbeitslosengeld. Auch >**Aktivierungsgutscheine** vergibt die Arbeitsgentur.  
      Dies ist die [Homepage](<arbeitsagentur.de/en/welcome>) der Agentur für Arbeit in Hamburg.`,
      editorHTML: "",
      convertedMarkdown: "",
      reconvertedHTML: "",
      reconvertedMd: "",
      rereconvertedHTML: "",
      allFetched: false,
      fakeEntities: {
        "g": [{id: 1, title: "Bundesagentur für Arbeit"}, {id:2, title: "Aktivierungsgutschein"}],
        "p": [],
        "i": [{id: 3, title: "Arbeitsagentur"}],
        "e": [{id: 4, title: "beratung"}, {id:5, title: "ausbildung"}]
      }
    }
  },
  methods: {
    async applyConversions() {
      this.editorHTML = this.$refs.editor.getHTML()
      console.log("editorHTML:")
      console.log(this.editorHTML)
      this.convertedMarkdown = await this.$refs.editor.getContent()
      console.log("convertedMarkdown")
      console.log(this.convertedMarkdown)
      this.allFetched = true
      this.reconvertedHTML = this.markdownToHTML(this.convertedMarkdown)
      console.log("reconvertedHTML")
      console.log(this.reconvertedHTML)
      this.reconvertedMd = await this.HTMLToMarkdown(this.reconvertedHTML, 'en', 'en', true, true, this.fakeEntities)
      console.log("reconvertedMd")
      console.log(this.reconvertedMd)
      this.rereconvertedHTML = this.markdownToHTML(this.reconvertedMd)
      console.log("rereconvertedHTML")
      console.log(this.rereconvertedHTML)
      if (this.$refs.viewer) {
        this.$refs.viewer.setContent(this.reconvertedMd)
      }
    }
  }

}
</script>

<style>
</style>
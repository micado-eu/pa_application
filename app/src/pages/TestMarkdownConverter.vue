<template>
  <div>
    <div>Write HTML here:</div>
    <div>
      <div><textarea v-model="htmlToConvert" style="width: 100%"></textarea></div>
      <q-btn @click="applyConversions(htmlToConvert)">Convert</q-btn>
    </div>
    <q-separator></q-separator>
    <div>Markdown:</div>
    <div><code>{{convertedMarkdown}}</code></div>
    <q-separator></q-separator>
    <div>HTML again:</div>
    <div><code>{{reconvertedHTML}}</code></div>
    <q-separator></q-separator>
    <div>Markdown again:</div>
    <div><code>{{reconvertedMd}}</code></div>
  </div>
</template>

<script>
import markdownConverterMixin from '../mixin/markdownConverterMixin'

export default {
  name: "TestMarkdownConverter",
  mixins: [markdownConverterMixin],
  data() {
    return {
      htmlToConvert: `<p>Glossary: identity card</p>
<p>Information centre: Curso de castellano</p>
<p>Events: english Course</p>
<p>Guided processes: enroll children to school</p>`,
      convertedMarkdown: "",
      reconvertedHTML: "",
      reconvertedMd: ""
    }
  },
  methods: {
    async applyConversions(html) {
      this.convertedMarkdown = await this.HTMLToMarkdown(html)
      this.reconvertedHTML = this.markdownToHTML(this.convertedMarkdown)
      this.reconvertedMd = await this.HTMLToMarkdown(this.reconvertedHTML, 'en', 'en', true)
    }
  }

}
</script>

<style>
</style>
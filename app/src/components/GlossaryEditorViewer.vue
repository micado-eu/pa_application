<template>
  <div padding>
    <div>
      <editor-content
        class='editor_content'
        :editor="editor"
        ref="editor"
      />
    </div>
    <div>
      <slot name="append"></slot>
    </div>
    <div>
      <q-btn
        unelevated
        @click="showAllContent"
        v-if="readMore && !showingFullContent"
        rounded
        color="grey-5"
        size="sm"
        no-caps
        padding="1px 15px"
        class="q-mb-md"
      >
        {{ $t("button.read_more") }}
      </q-btn>
      <q-btn
        unelevated
        @click="showLessContent"
        v-if="readMore && showingFullContent"
        rounded
        size="sm"
        outline
        color="grey-8"
        no-caps
        padding="1px 15px"
        class="q-my-md"
      >
        {{ $t("button.read_less") }}
      </q-btn>
    </div>
    <q-tooltip
      class="desc_tooltip"
      v-model="showTooltip"
      :target="targetElement"
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
      v-if="currentDescription"
    >
      {{currentDescription}}
    </q-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Editor, EditorContent } from 'tiptap'
import {
  Link,
  Bold,
  Italic
} from 'tiptap-extensions'
import Image from 'components/editor_plugins/Image'
import InternalMention from 'components/editor_plugins/InternalMention'
import markdownConverterMixin from '../mixin/markdownConverterMixin'

export default {
  name: 'GlossaryEditorViewer',
  components: {
    EditorContent
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    all_fetched: {
      type: Boolean,
      default: false
    },
    isContentHTML: {
      type: Boolean,
      default: false
    },
    readMore: {
      type: Boolean,
      default: false
    }
  },
  mixins: [markdownConverterMixin],
  data() {
    return {
      editor: null,
      currentDescriptionContent: '',
      targetElement: false,
      showTooltip: false, // Don't show by default
      fullHTMLContent: '',
      showingFullContent: true
    }
  },
  computed: {
    ...mapGetters('glossary', ['glossaryProdElemById']),
    ...mapGetters('information', ['informationProdElemById']),
    ...mapGetters('flows', ['processProdById']),
    ...mapGetters('event', ['eventProdElemById']),
    currentDescription() {
      return this.currentDescriptionContent
    }
  },
  methods: {
    ...mapActions('glossary', ['fetchGlossaryProd']),
    ...mapActions('information', ['fetchInformationProd']),
    ...mapActions('flows', ['fetchFlowsProd']),
    ...mapActions('event', ['fetchEventProd']),
    initialize() {
      this.editor = new Editor({
        editable: false,
        extensions: [
          new Bold(),
          new Italic(),
          new Link(),
          new Image(),
          new InternalMention({
            showTooltip: true,
            elemByIdFunctions: {
              "glossary": this.glossaryProdElemById,
              "information": this.informationProdElemById,
              "event": this.eventProdElemById,
              "process": this.processProdById
            },
            setTooltipDescription: this.setCurrentDescription
          })
        ],
        content: ''
      })
      this.setContent(this.content)
    },
    setContent(content, isHTML = false) {
      let currentContent = content
      if (!isHTML) {
        currentContent = this.markdownToHTML(content)
      }
      this.markReferences(currentContent, this.$defaultLang, this.$userLang, true).then((markedContent) => {
        let newContent = markedContent
        this.allHTMLContent = markedContent
        if (this.readMore) {
          let el = this.$refs.editor.$el
          let height = parseFloat(getComputedStyle(el, null).height.replace("px", ""))
          if (height >= 41) {
            el.classList.add('max-lines')
            this.showingFullContent = false
          }
        }
        this.editor.setContent(newContent)
      }).catch((err) => {
        console.error(err)
        this.$q.notify({
          type: 'negative',
          message: `Error while fetching glossary description: ${err}`
        })
      })
    },
    showAllContent() {
      this.$refs.editor.$el.classList.remove('max-lines')
      this.showingFullContent = true
      this.$emit("readMorePressed")
    },
    showLessContent() {
      this.$refs.editor.$el.classList.add('max-lines')
      this.showingFullContent = false
      this.$emit("readLessPressed")
    },
    setCurrentDescription(elem, element) {
      let currentContent = elem.description
      if (!this.isContentHTML) {
        currentContent = this.markdownToHTML(currentContent)
      }
      // Gets description and transforms it to plain text
      // Create an invisible editor to transform the JSON into HTML for parsing
      const editorInterpreter = new Editor({
        editable: false,
        extensions: [
          new Bold(),
          new Italic(),
          new Link(),
          new Image(),
          new InternalMention({
            showTooltip: true,
            elemByIdFunctions: {
              "glossary": this.glossaryProdElemById,
              "information": this.informationProdElemById,
              "event": this.eventProdElemById,
              "process": this.processProdById
            },
            setTooltipDescription: this.setCurrentDescription
          })
        ],
        content: currentContent
      })
      const doc = new DOMParser().parseFromString(editorInterpreter.getHTML(), 'text/html')
      const plainDescription = doc.body.textContent || ''
      this.targetElement = element
      this.currentDescriptionContent = plainDescription
      editorInterpreter.destroy()
    }
  },
  created() {
    if (!this.all_fetched) {
      const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
      Promise.all([
        this.fetchGlossaryProd(langs),
        this.fetchInformationProd(langs),
        this.fetchFlowsProd(langs),
        this.fetchEventProd(langs)
      ]).then(() => {
        this.initialize()
      })
    } else {
      this.initialize()
    }
  }
}
</script>

<style lang="scss">
.mention {
  text-decoration: underline;
}

img {
  width: 100%;
  max-width: 300px;
}

.editor_content {
  font-family: "Nunito Sans";
}

.max-lines {
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  max-height: 41px;
  line-height: 21px;
}

.ProseMirror:focus {
  outline: none;
}
</style>
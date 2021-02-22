<template>
  <div padding>
    <q-spinner v-if="loading" />
    <div v-else>
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
    </div>
    <q-tooltip
      v-for="(mention, index) in mentions"
      :key="index"
      :target="mention"
      :hide-delay="650"
    >
      {{
        getTooltip(mention)
      }}
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
import Vue from 'vue'

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
      loading: false,
      editor: null,
      showingFullContent: true,
      tooltipDescriptions: undefined,
      mentions: []
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
    async initialize() {
      this.editor = new Editor({
        editable: false,
        extensions: [
          new Bold(),
          new Italic(),
          new Link(),
          new Image(),
          new InternalMention()
        ],
        content: ''
      })
      await this.setContent(this.content)
      await Vue.nextTick()
      this.generateTooltips()
      if (this.readMore) {
        let el = this.$refs.editor.$el
        let height = parseFloat(getComputedStyle(el, null).height.replace("px", ""))
        if (height >= 41) {
          el.classList.add('max-lines')
          this.showingFullContent = false
        }
      }
    },
    async setContent(content, isHTML = false) {
      let currentContent = content
      if (!isHTML) {
        currentContent = this.markdownToHTML(content)
      }
      try {
        let markedContent = await this.markReferences(currentContent, this.$defaultLang, this.$userLang, true)
        let newContent = markedContent
        this.allHTMLContent = markedContent
        this.editor.setContent(newContent)
        this.loading = false
        return newContent
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `Error while fetching glossary description: ${err}`
        })
        this.loading = false
        return ''
      }
    },
    generateTooltips() {
      const elemByIdFunctions = {
        "glossary": this.glossaryProdElemById,
        "information": this.informationProdElemById,
        "event": this.eventProdElemById,
        "process": this.processProdById
      }
      this.mentions = this.$refs.editor.$el.querySelectorAll("[data-mention-id]")
      this.tooltipDescriptions = {}
      for (let mention of this.mentions) {
        const idString = mention.getAttribute("data-mention-id")
        const id = parseInt(idString)
        const mentionType = mention.getAttribute("mention-type")
        const text = this.getTooltipText(id, mentionType, elemByIdFunctions)
        if (!(mentionType in this.tooltipDescriptions)) {
          this.tooltipDescriptions[mentionType] = {}
        }
        this.tooltipDescriptions[mentionType][id] = text
      }
    },
    getTooltip(mention) {
      const idString = mention.getAttribute("data-mention-id")
      const id = parseInt(idString)
      const mentionType = mention.getAttribute("mention-type")
      return this.tooltipDescriptions[mentionType][id]
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
    getTooltipText(id, mentionType, elemByIdFunctions) {
      if (id > -1 && mentionType in elemByIdFunctions) {
        const elem = elemByIdFunctions[mentionType](id)
        if (elem !== undefined) {
          let currentContent = this.markdownToHTML(elem.description)
          // Gets description and transforms it to plain text
          const doc = new DOMParser().parseFromString(currentContent, 'text/html')
          const plainDescription = doc.body.textContent || ''
          return plainDescription
        }
      }
    }
  },
  created() {
    this.loading = true
    if (!this.all_fetched) {
      const langs = { defaultLang: this.$defaultLang, userLang: this.$userLang }
      Promise.all([
        this.fetchGlossaryProd(langs),
        this.fetchInformationProd(langs),
        this.fetchFlowsProd(langs),
        this.fetchEventsProd(langs)
      ])
        .then(() => this.initialize())
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

.desc_tooltip {
  max-width: 300px;
}
</style>
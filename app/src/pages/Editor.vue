<template>
  <div>
    <span v-if="loading">Loading glossary...</span>
    <div
      class="editor"
      v-if="!loading"
    >
      <editor-content
        class="editor__content"
        :editor="editor"
      />
    </div>
    <div
      class="suggestion-list"
      v-show="showSuggestions"
      ref="suggestions"
      v-if="!loading"
    >
      <template v-if="hasResults">
        <q-btn
          v-for="(glossaryItem, index) in filteredGlossaryItems"
          :key="glossaryItem.id"
          class="suggestion-list__item"
          :class="{ 'is-selected': navigatedGlossaryItemIndex === index }"
          @click="selectGlossaryItem(glossaryItem)"
        >
          {{ glossaryItem.title }}
        </q-btn>
      </template>
      <div
        v-else
        class="suggestion-list__item is-empty"
      >
        No glossary items found
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { Editor, EditorContent } from "tiptap"
import {
  Mention
} from "tiptap-extensions"


export default {
  components: {
    EditorContent
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary"]),
    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectGlossaryItem(glossaryItem) {
      this.insertMention({
        range: this.suggestionRange,
        attrs: {
          id: glossaryItem.id,
          label: glossaryItem.title,
        },
      })
      this.editor.focus()
    }
  },
  data () {
    return {
      editor: null,
      query: null,
      suggestionRange: null,
      filteredGlossaryItems: [],
      navigatedGlossaryItemIndex: 0,
      insertMention: () => {},
      loading: true,
    };
  },
  computed: {
    ...mapGetters('glossary', ['glossary']),
    hasResults() {
      return this.filteredGlossaryItems.length
    },
    showSuggestions() {
      return this.query || this.hasResults
    },
  },
  created () {
    this.loading = true
    this.fetchGlossary()
      .then(() => {
        this.editor = new Editor({
          extensions: [
            new Mention({
              items: () => this.glossary,
              // is called when a suggestion starts
              onEnter: ({
                items, query, range, command, virtualNode,
              }) => {
                this.query = query
                this.filteredGlossaryItems = items
                this.suggestionRange = range
                this.insertMention = command
              },
              // is called when a suggestion has changed
              onChange: ({
                items, query, range, virtualNode,
              }) => {
                this.query = query
                this.filteredGlossaryItems = items
                this.suggestionRange = range
                this.navigatedGlossaryItemIndex = 0
              },
            }),
          ],
          content: `
            This is a demo
          `
        }),
        this.loading = false
      })
  }
}
</script>
<style lang="scss">
</style>
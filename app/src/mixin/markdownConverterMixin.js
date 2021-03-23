import { Converter } from 'showdown'
import { mapGetters, mapActions } from "vuex"
import referenceExtension from "./markdownExtensions/referenceExtension.js"

export default {
  data() {
    return {
      converter: new Converter({extensions: [referenceExtension]})
    }
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossaryProd"]),
    ...mapActions('information', ['fetchInformationProd']),
    ...mapActions('flows', ['fetchFlowsProd']),
    ...mapActions('event', ['fetchEventProd']),
    cleanSpaces(text) {
      // At the moment of writing there is this issue with the Showdown converter: https://github.com/showdownjs/showdown/issues/669
      // Having &nbsp; instead of spaces breaks tooltips overflow wrap, so we substitute them here
      return text.replace(/&nbsp;/g, " ")
    },
    removeMentionTags(md) {
      return md.replace(/<span data-mention-id="\d+" mention-type="\w+" class="mention">/g, "").replace(/<\/span>/g, "")
    },
    async HTMLToMarkdown(html, defaultLang = 'en', userLang = 'en', isAllFetched = false) {
      let md = this.converter.makeMarkdown(html)
      md = this.cleanSpaces(md)
      md = this.removeMentionTags(md)
      md = await this.markReferences(md, defaultLang, userLang, isAllFetched)
      return md
    },
    markdownToHTML(markdown) {
      let html = this.converter.makeHtml(markdown)
      html = this.cleanSpaces(html)
      return html
    },
    async markReferencesAux(md) {
      let result = md
      let entities = { // Key is mention-type, value is getter
        "glossary": this.glossaryProd,
        "process": this.processesProd,
        "information": this.informationProd,
        "event": this.eventProd
      }
      for (const [key, value] of Object.entries(entities)) {
        // Iterate through all the values given by getter for all entities
        for (const term of value) {
          let title
          if (term.process) {
            title = term.process
          }
          else {
            title = term.title
          }
          if (title.length > 0) {
            // Look for the term's titles that are not already marked
            let regexp = new RegExp(`(${title})`, "gi")
            let splitted = result.split(regexp)
            // Add the tag to the text
            const prefixTag = `@[${key},${term.id}]`
            for (let i = 0; i < splitted.length; i = i + 1) {
              if (!splitted[i].localeCompare(title, undefined, { sensitivity: 'accent' })) {
                splitted[i] = prefixTag + "(" + splitted[i] + ")"
              }
            } 
            result = splitted.join("")
          }
        }
      }
      return result
    },
    async markReferences(md, defaultLang = 'en', userLang = 'en', isAllFetched = false) {
      if (isAllFetched) {
        return this.markReferencesAux(md)
      }
      await Promise.all([
        this.fetchGlossaryProd({ defaultLang, userLang }),
        this.fetchInformationProd({ defaultLang, userLang }),
        this.fetchFlowsProd({ defaultLang, userLang }),
        this.fetchEventProd({ defaultLang, userLang })
      ])
      return this.markReferencesAux(md)
    }
  },
  computed: {
    ...mapGetters("glossary", ["glossaryProd"]),
    ...mapGetters('information', ['informationProd']),
    ...mapGetters('flows', ['processesProd']),
    ...mapGetters('event', ['eventProd'])
  }
}
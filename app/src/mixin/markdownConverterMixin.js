import { Converter } from 'showdown'
import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      converter: new Converter()
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
    HTMLToMarkdown(html) {
      let md = this.converter.makeMarkdown(html)
      md = this.cleanSpaces(md)
      return md
    },
    markdownToHTML(markdown) {
      let html = this.converter.makeHtml(markdown)
      html = this.cleanSpaces(html)
      return html
    },
    async markReferencesAux(html) {
      let result = html
      let entities = { // Key is mention-type, value is getter
        "glossary": this.glossaryProd,
        "process": this.processesProd,
        "information": this.informationProd,
        "event": this.eventProd
      }
      const suffixTag = "</span>"
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
            const prefixTag = `<span data-mention-id="${term.id}" mention-type="${key}" class="mention">`
            for (let i = 0; i < splitted.length; i = i + 1) {
              if (!splitted[i].localeCompare(title, undefined, { sensitivity: 'accent' })) {
                splitted[i] = prefixTag + splitted[i] + suffixTag
              }
            }
            result = splitted.join("")
          }
        }
      }
      return result
    },
    async markReferences(html, defaultLang = 'en', userLang = 'en', isAllFetched = false) {
      if (isAllFetched) {
        return this.markReferencesAux(html)
      }
      await Promise.all([
        this.fetchGlossary({ defaultLang, userLang }),
        this.fetchInformation({ defaultLang, userLang }),
        this.fetchFlows({ defaultLang, userLang }),
        this.fetchEvents({ defaultLang, userLang })
      ])
      return this.markReferencesAux(html)
    }
  },
  computed: {
    ...mapGetters("glossary", ["glossaryProd"]),
    ...mapGetters('information', ['informationProd']),
    ...mapGetters('flows', ['processesProd']),
    ...mapGetters('event', ['eventProd'])
  }
}
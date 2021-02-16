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
    HTMLToMarkdown(html) {
      return this.converter.makeMarkdown(html)
    },
    markdownToHTML(markdown) {
      return this.converter.makeHtml(markdown)
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
          if (term.title) {
            // Look for the term's titles that are not already marked
            let regexp = new RegExp(`(${term.title})`, "gi")
            let splitted = result.split(regexp)
            // Add the tag to the text
            const prefixTag = `<span data-mention-id="${term.id}" mention-type="${key}" class="mention">`
            for (let i = 0; i < splitted.length; i = i + 1) {
              if (!splitted[i].localeCompare(term.title, undefined, { sensitivity: 'accent' })) {
                splitted[i] = prefixTag + splitted[i] + suffixTag
              }
            }
            result = splitted.join("")
          }
        }
      }
      console.log(result)
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
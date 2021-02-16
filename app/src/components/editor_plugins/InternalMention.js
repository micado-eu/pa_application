import { Mark, Plugin } from 'tiptap'

export default class InternalMention extends Mark {

  get name() {
    return 'internalmention'
  }

  get defaultOptions() {
    return {
      showTooltip: false,
      elemByIdFunctions: {},  
      // elemByIdFunctions expects an object where each key is the mention-type 
      // and the value is a function which 
      // will be passed an 'id' argument (numeric) and be expected to return a single element or undefined
      setTooltipDescription: (elem, eventTarget) => null
    }
  }

  get schema() {
    return {
      attrs: {
        'data-mention-id': {
          default: null
        },
        'mention-type': {
          default: null
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'span[class=mention]',
          getAttrs: dom => ({
            'data-mention-id': dom.getAttribute('data-mention-id'),
            'mention-type': dom.getAttribute('mention-type')
          })
        }
      ],
      toDOM: node => ['span', {
        ...node.attrs,
        class: "mention"
      }, 0]
    }
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            mouseover: (view, event) => {
              if (this.options.showTooltip) {
                if (event.target instanceof HTMLSpanElement) {
                  const idString = event.target.getAttribute("data-mention-id")
                  const mentionType = event.target.getAttribute("mention-type")
                  if (idString && mentionType in this.options.elemByIdFunctions) {
                    const id = parseInt(idString)
                    event.stopPropagation()
                    const elem = this.options.elemByIdFunctions[mentionType](id)
                    if (elem !== undefined) {
                      this.options.setTooltipDescription(elem, event.target)
                    }
                  }
                }
              }
            }
          }
        }
      })
    ]
  }

}
import { Mark, Plugin } from 'tiptap'

export default class InternalMention extends Mark {

  // Marks mentions (underlined references that on mouse over or touch display a tooltip)

  get name() {
    return 'internalmention'
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

}
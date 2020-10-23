import TranslateStateButton from '@bit/micado.shared.translatestatebutton'

export default {
    components: {
        TranslateStateButton
    },
    methods: {
        changeTranslationState (element, state) {
            console.log(element)
            element.translations.forEach(el => {
                el.translationState = state
            })
            console.log(element)
        }
    }
}

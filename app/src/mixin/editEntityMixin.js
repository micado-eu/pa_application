export default {
    data () {
        return {
            activeLanguage: this.$i18n.locale,
            langTab: this.$defaultLangString

        }
    },
    computed: {
        languages () {
            return this.$store.state.language.languages
        }
    },
    methods: {
        filterTranslationModel (currentLang) {
            return function (element) {
                return element.lang == currentLang
            }
        }, 
        translationAvailable(items){
            //console.log(this.$defaultLang)
            //var idx = items.translations.findIndex(item => item.lang == this.$defaultLang && item.translated == true)
            //items.translations.splice(idx, 1)
            var available_transl= []
            var reference = items.translations.filter((it)=>{
                return it.translated == false
            })[0].translationDate
            var reference_date = new Date(reference)
            var other_transl =  items.translations.filter((it)=>{
                return it.translated == true
            })
            other_transl.forEach((transl)=>{
                var date = new Date (transl.translationDate)
                if(date >= reference_date){
                    available_transl.push(transl)
                }
                else{
                    console.log("old translation")
                }
            })
            return available_transl
        }
    }
}

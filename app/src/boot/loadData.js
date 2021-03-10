import { setLocale } from './i18n'

export default async ({ store, Vue }) => {
    try {
        var curlang = ''
        var defaultLangString = ''
        var defaultLang = {}
        var userLang = {}

        await store.dispatch('features/fetchFeatures')
        await store.dispatch('language/fetchLanguages')
        await store.dispatch('settings/fetchSettings')
            .then((settings) => {
                console.log('#####################################')
                console.log(settings)
                const curlang = settings.filter((setting) => setting.key == 'default_language')[0]
                const migrant_tenant_domain = settings.filter((setting) => setting.key == 'migrant_domain_name')[0]
                defaultLang = store.state.language.languages.filter(function (l) { return l.lang == curlang.value })[0]

                const pa_tenant = settings.filter((setting) => setting.key == 'pa_tenant')[0]
                const migrant_tenant = settings.filter((setting) => setting.key == 'migrant_tenant')[0]
                console.log(settings.filter((setting) => { return setting.key == 'translationState' })[0].value)
                var translationState = JSON.parse(settings.filter((setting) => { return setting.key == 'translationState' })[0].value)
                console.log(translationState)
                let translationStateOptions = []
                translationState.forEach(state => {
                    console.log(state)
                    console.log(defaultLang)
                    let label = state.translation.filter((s) => { return s.lang == defaultLang.lang })[0]
                    translationStateOptions.push({ "value": state.value, "label": label.state })
                })
                console.log(translationStateOptions)
                Vue.prototype.$translationState = translationState
                Vue.prototype.$translationStateOptions = translationStateOptions
                setLocale(curlang.value)

                //setLocale(defaultLang)

                const defaultLangString = store.state.language.languages.filter((l) => l.lang == curlang.value)[0].name
                Vue.prototype.$defaultLangString = defaultLangString
                Vue.prototype.$defaultLang = curlang.value
                Vue.prototype.$userLang = curlang.value
                Vue.prototype.$pa_tenant = pa_tenant.value
                Vue.prototype.$migrant_tenant = migrant_tenant.value
                Vue.prototype.$migrant_tenant_domain = migrant_tenant_domain.value
                console.log(Vue.prototype.$migrant_tenant)
                console.log("default lang: " + defaultLang)
                console.log(defaultLang)
                console.log("curlang lang: " + curlang)
                console.log(curlang)
                console.log("defaultLangString: " + defaultLangString)

            })
    } catch (err) {
        console.error('Quasar failed to load data with the error message: ', err)
    }
}





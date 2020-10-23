// import something here
import Countly from 'countly-sdk-web'
import VueCountly from 'vue-countly'



// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue }) => {
  // something to do
  Vue.use(VueCountly, Countly, {
    app_key: 'eb86692cec343df4efb89ca7aaf4a0352621f45d',
    url: 'https://monitoring.micadoproject.eu'
  })

  console.log("Countly init")
  console.log(Vue.Countly === Countly)
  console.log(Vue.Countly)

  Vue.Countly.q.push(['track_sessions'])

  // Track web page views automatically (recommended)
  Vue.Countly.q.push(['track_pageview'])

}

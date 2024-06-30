import VueKeyCloak from '@dsb-norge/vue-keycloak-js'

export default async ({ Vue, router, store, app }) => {
  async function tokenInterceptor() {
    Vue.prototype.$axios.interceptors.request.use(config => {
      console.log("interceptor")
      console.log(config)
      console.log(Vue.prototype.$keycloak.token)
      config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
      return config
    }, error => {
      return Promise.reject(error)
    })
  }

  let keyPromise = null
  //const realm = store.getters['example/getRealm']
  //const the_store = store
  //if (realm !== null) {
  console.log('Esiste il realm')
  // console.log(realm)
  keyPromise = new Promise(resolve => {
    Vue.use(VueKeyCloak, {
      init: {
        onLoad: 'check-sso', // or 'check-sso'
        //flow: 'standard',
        //pkceMethod: 'S256',
        //silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        checkLoginIframe: false // otherwise it would reload the window every so seconds
      },
      config: {
        url: 'https://' + Vue.prototype.$envconfig.identityUrl,
        realm: 'pa',
        clientId: 'pa_app'
      },
      onReady: (keycloak) => {
        console.log(Vue.prototype.$envconfig.identityUrl)
        console.log('onReady passed')
        console.log(keycloak)
        console.log(store)
        if (keycloak.authenticated) {
          window.accessToken = keycloak.token
          console.log("I'm authenticated")
          var base64Url = keycloak.token.split('.')[1]
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join(''))
          console.log(JSON.parse(jsonPayload))
          //store.commit('auth/setUserKeycloak', JSON.parse(jsonPayload))
          store.commit('auth/setUserKeycloak', JSON.parse(jsonPayload))
          //console.log(store.auth.user)
        }
        else {
          store.commit('auth/setUserKeycloak', null)
        }
        console.log("before token interceptor")
        tokenInterceptor()
        console.log(Vue)

        resolve()
      },
      onAuthRefreshError: (keycloak) => {
        console.log("refresh token expired")
        store.commit('auth/setUserKeycloak', null)
        keycloak.logout()
      },
      onInitError: (error) => {
        console.log('we have an error')
        console.log(error)
      }
    })
  })
  //}

  return keyPromise
}


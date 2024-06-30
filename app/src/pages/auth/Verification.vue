<template>
  <q-page
    v-cloak
    padding
  >
    <p>
      {{ message }}
    </p>
  </q-page>
</template>

<script>
import client from 'api-user-client'
import storeMappingMixin from '../../mixin/storeMappingMixin'


export default {
  name: 'Verification',
   mixins: [
    storeMappingMixin({
      getters: {
       
      }, actions: {
        getUserPic: 'user/getUserPic'
      }
    })

  ],
  data () {
    return {
      token: '',
      message: ''
    }
  },
  mounted () {
    //this.verifyUser()
    //this.getPic()
    this.$router.push({name: 'home'})
  },
  methods: {
    getPic(){
      //if(this.$store.state.auth.user != null){
        console.log(this.$store.state.auth.user.umid)
          this.getUserPic( this.$store.state.auth.user.umid).then((user)=>{
            console.log("I AM USER IN VERIFICATION")
            console.log(user)
          })
      //}
    },
    verifyUser () {

      const hashes = this.$route.hash.slice(this.$route.hash.indexOf('#') + 1).split('&')

      let identity_response = hashes.reduce((acc, hash) => {
        // eslint-disable-next-line
        const [key, val] = hash.split('=');
        console.log(key)
        return {
          ...acc,
          [key]: val
        }
      }, {})

      console.log(hashes)
      console.log(identity_response)
      let id_token = JSON.parse(atob(identity_response.id_token.split('.')[1]))
      let access_token = identity_response.access_token

      console.log('pagina di validate')
      console.log(this.$route)
      console.log(id_token)
      console.log(access_token)
      let tenant = this.$pa_tenant
      console.log("before fetching the user")
      client.fetchUserLogin(id_token.sub, tenant)
        .then(response => {
          console.log("response from getting internal user id")
          console.log(response)
          id_token.umid = response[0].umId
          this.getUserPic(response[0].umId).then((user)=>{
            console.log("I AM USER IN VERIFICATION")
            console.log(user)
          })
          id_token.email = response[0].attributes.filter(att => { return att.umAttrName == "mail" })[0] != undefined ? response[0].attributes.filter(att => { return att.umAttrName == "mail" })[0].umAttrValue : ""
          id_token.given_name = response[0].attributes.filter(att => { return att.umAttrName == "givenName" })[0] != undefined ? response[0].attributes.filter(att => { return att.umAttrName == "givenName" })[0].umAttrValue : ""
          console.log(id_token)
          this.$store.commit('auth/setUser', id_token)
          this.$store.dispatch('auth/setToken', {
            token: identity_response,
            rememberMe: false
          })
          this.message = "Welcome " + id_token.given_name + " you have " + (this.$store.getters['auth/check']("Application/micado_superadmin") ? "superadmin" : (this.$store.getters['auth/check']("Application/micado_admin")?"admin":(this.$store.getters['auth/check']("Application/micado_migrant_manager")?"migrant manager":"no rights")))
          console.log(this.message)
        })
       this.$router.push({name: 'home'})

    }
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>

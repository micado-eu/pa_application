<template>
<div>
<span v-if="loading">Loading...</span>
  <div v-if="!loading" class="q-pa-md first-div">
    <div
      class="q-pa-md col"
      id="second-div"
    >
      <UserProfile 
      :umUserName="the_user.umUserName"
      :fullname="legalName"
      :dateOfBirth="dateOfBirth"
      :nationality="nationality"
      :gender="gender"
      :userPicture="picture">
      </UserProfile>
    </div>
    <hr>
    <div         v-for="consent in userConsents"
>
    <q-toggle
        v-model="consent.val"
        color="green"
        :label="consent.label"
        disable
      ></br></q-toggle>
      </div>
    <hr>
    <q-list style="width:100%; margin:0 auto">
      <Document
        v-for="document in documents"
        :Title="setTitle(document)"
        :Image="document.pictures[0].picture"
        :theDocument="document"
        :Link="document.id"
        :key="document.id"
      >
      </Document>
    </q-list>
  </div>
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile'
import Document from '../components/DocumentWalletItem'
import editEntityMixin from '../mixin/editEntityMixin'
import ConsentPanel from '../components/ConsentPanel'
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  name: 'MigrantData',
  props: ['theuserid'],
  mixins: [editEntityMixin,
    storeMappingMixin({
      getters: {
        documents: 'documents/my_documents',
        document_types: 'document_type/document_types',
        users: 'user/users'
      },
      actions: {
        fetchSpecificUser: 'user/fetchSpecificUser',
        fetchDocuments: 'documents/fetchDocuments',
        fetchDocumentType: 'document_type/fetchDocumentType',
        fetchReceipt: 'consent/fetchReceipt'
      }
    })
  ],
  components: {
    UserProfile, Document, ConsentPanel
  },
  data () {
    return {
      the_user: null,
      theReceipt: null,
      userConsents: null,
      loading:true
    }
  },
  computed :{
    username () {
      /*return this.the_user.attributes.filter((attr)=>{
        return attr.umAttrName == "uid"
      })[0].umAttrValue*/
    },
    picture () {
      if(this.the_user.userPicture){
        return this.the_user.userPicture.picture
      }
      else{
        return null
      }
    },
    legalName () {
      var name = ""
      var surname = ""
      var name_arr = this.the_user.attributes.filter((attr)=>{
        return attr.umAttrName == "givenName"
      })
      if(name_arr.length>0){
        name = name_arr[0].umAttrValue 
      }
      var surname_arr = this.the_user.attributes.filter((attr)=>{
        return attr.umAttrName == "sn"
      })
      if(name_arr.length>0){
        surname = surname_arr[0].umAttrValue 
      }
      var fullname = name + " " + surname
      return fullname
    },
    dateOfBirth () {
      var dob=""
      var dob_arr =  this.the_user.attributes.filter((attr)=>{
        return attr.umAttrName == "dateOfBirth"
      })
      if(dob_arr.length>0){
        dob = dob_arr[0].umAttrValue 
      }
      return dob
    },
    nationality () {
      var country = ""
      var country_arr = this.the_user.attributes.filter((attr)=>{
        return attr.umAttrName == "country"
      })
      if(country_arr.length>0){
        country = country_arr[0].umAttrValue 
      }
      return country
    },
    gender () {
      var gender =""
      var gender_arr =  this.the_user.attributes.filter((attr)=>{
        return attr.umAttrName == "gender"
      })
      if(gender_arr.length>0){
        gender = gender_arr[0].umAttrValue 
      }
      return gender
    }
  },
  methods: {
    setTitle (document) {
      const the_doc_type = this.document_types.filter((a_doc_type) => a_doc_type.id == document.documentTypeId)
      if (the_doc_type.length === 1) {
        const the_transl = the_doc_type[0].translations.filter((transl) => transl.lang === this.activeLanguage || transl.lang === 'en')
        if (the_transl.length > 0) {
          return the_transl[0].document
        }
        return ''
      }
    }
  },
  created () {
    const payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    var promises = []
    promises.push(this.fetchDocuments(this.theuserid))
    promises.push( this.fetchDocumentType())

    Promise.all(promises).then(()=>{
        this.fetchSpecificUser(payload)
          .then((users) => {
            console.log('fetchSpecificUser - page')
            console.log(users)
          this.the_user = users
            console.log("return from fetch specific user")
            console.log(users)
       this.userConsents = Object.entries(JSON.parse(this.the_user.userConsent.consent)).map(([key, value]) => ({"label": key, "val":value}))
       console.log("CONSENTS")
       console.log(this.userConsents)
            /*const temp = this.users.filter((filt) => filt.umId == this.theuserid)
            this.the_user = temp[0]*/
            this.fetchReceipt({ tenant: this.$migrant_tenant_domain, principal: users.umUserName })
              .then((receipt) => {
                console.log(receipt)
                this.theReceipt = receipt
              })
                          
    
          })
          this.loading=false
    })
   /* const payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    this.fetchSpecificUser(payload)
      .then((users) => {
        console.log('fetchSpecificUser - page')
        console.log(users)
       this.the_user = users
       this.userConsents = JSON.parse(this.the_user.userConsent).map(([key, value]) => ({[label]: key, [val]:value}))
       console.log(this.userConsents)
        console.log("return from fetch specific user")
        console.log(users)
        /*const temp = this.users.filter((filt) => filt.umId == this.theuserid)
        this.the_user = temp[0]
        this.fetchReceipt({ tenant: users.tenant.umDomainName, principal: users.umUserName })
          .then((receipt) => {
            console.log(receipt)
            this.theReceipt = receipt
          })
        this.loading=false
      })
    this.fetchDocuments(this.theuserid)
      // this.$store.dispatch("documents/fetchDocuments")
      .then((documents) => {
        this.loading = false
        console.log('documents in created')
        console.log(documents)
      })
    console.log('userid=principal??')
    console.log(this.theuserid)
    

    console.log(this.$store)

    this.fetchDocumentType()
      // this.$store.dispatch("document_type/fetchDocumentType")
      .then((document_types) => {
        console.log('we are the docs')
        console.log(document_types)
      })*/
  }
}
</script>
<style scoped>
.first-div {
  padding-left: 40px;
  padding-right: 40px;
}

#second-div {
  width: 100%;
  margin: 0 auto;
}
</style>

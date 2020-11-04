<template>
  <div class="q-pa-md first-div">
    <div
      class="q-pa-md col"
      id="second-div"
    >
      <UserProfile :user="the_user">
      </UserProfile>
    </div>
    <hr>
    <ConsentPanel :receipt="theReceipt" />
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
      theReceipt: null
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
    this.fetchDocuments(this.theuserid)
      // this.$store.dispatch("documents/fetchDocuments")
      .then((documents) => {
        this.loading = false
        console.log('documents in created')
        console.log(documents)
      })
    console.log('userid=principal??')
    console.log(this.theuserid)
    const payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    this.fetchSpecificUser(payload)
      .then((users) => {
        console.log('fetchSpecificUser - page')
        console.log(users)
       this.the_user = users
        console.log("return from fetch specific user")
        console.log(users)
        /*const temp = this.users.filter((filt) => filt.umId == this.theuserid)
        this.the_user = temp[0]*/
        this.fetchReceipt({ tenant: users.tenant.umDomainName, principal: users.umUserName })
          .then((receipt) => {
            console.log(receipt)
            this.theReceipt = receipt
          })
      })

    this.loading = true
    console.log(this.$store)

    this.fetchDocumentType()
      // this.$store.dispatch("document_type/fetchDocumentType")
      .then((document_types) => {
        console.log('we are the docs')
        console.log(document_types)
      })
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

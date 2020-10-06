<template>
  <div id="first-div">
     <div
      class="q-pa-md col"
      id="second-div"
    >
    <UserProfile :user="the_user">
      </UserProfile>
   </div>
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
import UserProfile from 'components/UserProfile'
import Document from 'components/DocumentWalletItem'
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'

export default {
  name: "MigrantData",
  props:['theuserid'],
    mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      documents: 'documents/my_documents',
      document_types: 'document_type/document_types',
      users: 'user/users'
    }, actions: {
      fetchSpecificUser: 'user/fetchSpecificUser',
      fetchDocuments: 'documents/fetchDocuments',
      fetchDocumentType: 'document_type/fetchDocumentType'
  }
  })
  ],
  components:{
    UserProfile, Document
  },
  data(){
    return{
      the_user:null
    }
  },
  methods: {
    setTitle(document) {
      var the_doc_type = this.document_types.filter(a_doc_type => {
        return a_doc_type.id == document.documentTypeId;
      });
      if (the_doc_type.length == 1) {
        var the_transl = the_doc_type[0].translations.filter(transl => {
          return transl.lang == this.activeLanguage || transl.lang === "en";
        });
        if (the_transl.length > 0) {
          return the_transl[0].document;
        }
        return "";
      }
    }
  },
  created() {
     this.fetchDocuments(this.theuserid)
    //this.$store.dispatch("documents/fetchDocuments")
    .then(documents => {
      this.loading = false;
      console.log("documents in created");
      console.log(documents);
    });
    console.log(this.theuserid)
    var payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    this.fetchSpecificUser(payload)
      .then(users => {
        this.loading = false
        var temp = this.users.filter((filt) => {
          return filt.umId == this.theuserid
        })
        this.the_user = temp[0]
      })

       this.loading = true;
    console.log(this.$store);
   
    this.fetchDocumentType()
    //this.$store.dispatch("document_type/fetchDocumentType")
      .then(document_types => {
        console.log("we are the docs");
        console.log(document_types);
      });
  }
};
</script>
<style scoped>
#first-div{
  padding-left:25px;
}

#second-div {
  width:800px;
  margin:0 auto;
}
</style>

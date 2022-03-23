<template>
  <div>
    <span v-if="loading">{{ $t('input_labels.loading') }}</span>
    <div
      v-if="!loading"
      class="q-pa-md first-div"
    >
      <div
        class="content image"
        style="padding-top:60px;text-align:center"
      >
        <q-btn
          v-if="features.includes('FEAT_DOCUMENTS')"
          size="15px"
          style="margin-right: 10px; width:200px;border-radius: 5px;"
          :label="$t('button.add_document')"
          no-caps
          dense
          unelevated
          @click="openValidateDialog"
          color="secondary"
        />
        <q-btn
          class="go_back"
          :label="$t('button.go_back')"
          no-caps
          dense
          style="border-radius: 5px;"
          unelevated
          to="/migrant"
        />
      </div>
    </div>
    <hr style="border: 1px solid #0F3A5D">

    <div
      class="q-pa-md col container-labels"
      id="second-div"
      style="padding-top:50px"
    >
      <UserProfile
        :um-user-name="the_user.umUserName"
        :fullname="legalName"
        :date-of-birth="dateOfBirth"
        :nationality="nationality"
        :gender="gender"
        :user-picture="picture"
      />
    </div>

    <q-dialog
      v-model="upload_doc"
      persistent
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{ $t("button.add_document") }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            filled
            dense
            clearable
            emit-value
            map-options
            v-model="validatingDocType"
            :options="t_docs"
            :label="$t('input_labels.doc_type')"
          />
          <q-file
            v-model="validationFile"
            accept=".jpg, .pdf, image/*"
            label="Choose an optional file for validate"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            :data-cy="'cancel'"
            label="Cancel"
            color="accent"
            v-close-popup
          />
          <q-btn
            label="Add document"
            color="accent"
            :data-cy="'validatetask'"
            @click="validateTask()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <hr class="hr">
    <div class="title container-labels">
      {{ $t("consent.title") }}
    </div>
    <div
      class="container-labels"
      v-if="userConsents == null"
    >
      {{ $t("input_labels.no_consent") }}
    </div>
    <div
      class="container-labels"
      v-else
      v-for="consent in userConsents"
      :key="consent.label"
    >
      <q-toggle
        v-model="consent.val"
        color="secondary"
        :label="consent.label"
        disable
      />
    </div>
    <hr class="hr">
    <q-list
      v-if="features.includes('FEAT_DOCUMENTS')"
      class="container-labels"
      style="width: 100%; margin: 0 auto"
    >
      <Document
        v-for="document in documents"
        :title="setTitle(document)"
        :image="document.pictures[0].picture"
        :the-document="document"
        :link="document.id"
        :key="document.id"
      />
    </q-list>
  </div>
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile"
import Document from "../components/DocumentWalletItem"
import editEntityMixin from "../mixin/editEntityMixin"
import ConsentPanel from "../components/ConsentPanel"
import storeMappingMixin from "../mixin/storeMappingMixin"

export default {
  name: "MigrantData",
  props: ["theuserid"],
  mixins: [
    editEntityMixin,
    storeMappingMixin({
      getters: {
        documents: "documents/my_documents",
        document_types: "document_type/document_types",
        users: "user/users",
        features: "features/featureFlags"
      },
      actions: {
        fetchSpecificUser: "user/fetchSpecificUser",
        fetchDocuments: "documents/fetchShareableDocuments",
        fetchDocumentType: "document_type/fetchDocumentType",
        fetchReceipt: "consent/fetchReceipt",
        fetchDocumentType: "document_type/fetchDocumentType",
        saveDoc: "documents/saveDocument"
      }
    })
  ],
  components: {
    UserProfile,
    Document,
    ConsentPanel
  },
  data() {
    return {
      the_user: null,
      theReceipt: null,
      userConsents: null,
      loading: true,
      upload_doc: false,
      forUser: null,
      t_docs: [],
      doc_shell: {
        id: -1,
        pictures: [],
        userId: null,
        userTenant: null,
        askValidateByTenant: null,
        validated: false,
        validationDate: null,
        validatedByTenant: null,
        validatedByUser: null,
        uploadedByMe: true,
        expirationDate: null,
        documentTypeId: "",
        shareable: true
      },
      validationFile: null,
      validatingDocType: null
    }
  },
  computed: {
    username() {
      /*return this.the_user.attributes.filter((attr)=>{
        return attr.umAttrName == "uid"
      })[0].umAttrValue*/
    },
    picture() {
      if (this.the_user.userPicture) {
        return this.the_user.userPicture.picture
      } else {
        return null
      }
    },
    legalName() {
      var name = ""
      var surname = ""
      var name_arr = this.the_user.attributes.filter((attr) => {
        return attr.umAttrName == "givenName"
      })
      if (name_arr.length > 0) {
        name = name_arr[0].umAttrValue
      }
      var surname_arr = this.the_user.attributes.filter((attr) => {
        return attr.umAttrName == "sn"
      })
      if (name_arr.length > 0) {
        surname = surname_arr[0].umAttrValue
      }
      var fullname = name + " " + surname
      return fullname
    },
    dateOfBirth() {
      var dob = ""
      var dob_arr = this.the_user.attributes.filter((attr) => {
        return attr.umAttrName == "dateOfBirth"
      })
      if (dob_arr.length > 0) {
        dob = dob_arr[0].umAttrValue
      }
      return dob
    },
    nationality() {
      var country = ""
      var country_arr = this.the_user.attributes.filter((attr) => {
        return attr.umAttrName == "country"
      })
      if (country_arr.length > 0) {
        country = country_arr[0].umAttrValue
      }
      return country
    },
    gender() {
      var gender = ""
      var gender_arr = this.the_user.attributes.filter((attr) => {
        return attr.umAttrName == "gender"
      })
      if (gender_arr.length > 0) {
        gender = gender_arr[0].umAttrValue
      }
      return gender
    }
  },
  methods: {
    createDocShell() {
      this.doc_shell = {
        id: -1,
        pictures: [],
        userId: null,
        userTenant: null,
        askValidateByTenant: null,
        validated: false,
        validationDate: null,
        validatedByTenant: null,
        validatedByUser: null,
        uploadedByMe: true,
        expirationDate: null,
        documentTypeId: "",
        shareable: true
      }
    },
    openValidateDialog(event) {
      console.log(event)
      console.log(this.$store.state.auth.user.umid)
      this.forUser = Number(this.theuserid)
      this.upload_doc = true
    },
    validateTask() {
      let current_data = new Date().toISOString()
      // before validate the intervention and in the then check the file
      if (this.validationFile) {
        console.log("we have to upload a file to the user")
        console.log(this.validationFile)
        let reader = new FileReader()
        // Convert the file to base64 text
        reader.readAsDataURL(this.validationFile)
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          let fileInfo = {
            name: this.validationFile.name,
            type: this.validationFile.type,
            size: Math.round(this.validationFile.size / 1000) + " kB",
            base64: reader.result,
            file: this.validationFile
          }
          this.doc_shell.userId = this.forUser
          this.doc_shell.userTenant = Number(this.$migrant_tenant)
          this.doc_shell.documentTypeId = this.validatingDocType
          this.doc_shell.validated = true
          this.doc_shell.validationDate = current_data
          this.doc_shell.uploadedByMe = false
          this.doc_shell.validatedByTenant = Number(this.$pa_tenant)
          // TODO substitute with proper value (now using the 17 as id of tenant 3)
          this.doc_shell.validatedByUser = this.$store.state.auth.user.umid
          this.doc_shell.pictures.push({
            id: -1,
            picture: fileInfo.base64,
            docId: -1,
            order: null
          })
          // now we can send
          console.log("I am validating intervention and its id")
          this.saveDoc({
            document: this.doc_shell
          }).then(() => {
            // still have to write the completed_intervention_document table to associate the new doc with the intervention

            this.createDocShell()
            this.validationFile = null
            this.forUser = null
            this.validatingDocType = null
          })
        }
      }
    },
    setTitle(document) {
      const the_doc_type = this.document_types.filter(
        (a_doc_type) => a_doc_type.id == document.documentTypeId
      )
      if (the_doc_type.length === 1) {
        const the_transl = the_doc_type[0].translations.filter(
          (transl) =>
            transl.lang === this.activeLanguage || transl.lang === "en"
        )
        if (the_transl.length > 0) {
          return the_transl[0].document
        }
        return ""
      }
    }
  },
  created() {
    const payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
    var promises = []
    promises.push(this.fetchDocuments(this.theuserid))
    promises.push(this.fetchDocumentType())

    Promise.all(promises).then((results) => {
      console.log("I am result of promise all")
      console.log(results)
      results[1].forEach((document_type) => {
        var the_doc = {
          label: document_type.translations.filter(
            this.filterTranslationModel(this.activeLanguage)
          )[0].document,
          value: document_type.id
        }
        this.t_docs.push(the_doc)
      })
      console.log(this.t_docs)

      this.fetchSpecificUser(payload).then((users) => {
        console.log("fetchSpecificUser - page")
        console.log(users)
        this.the_user = users
        console.log("return from fetch specific user")
        console.log(users)
        if (this.the_user.userConsent) {
          this.userConsents = Object.entries(
            JSON.parse(this.the_user.userConsent.consent)
          ).map(([key, value]) => ({ label: key, val: value }))
        }
        console.log("CONSENTS")
        console.log(this.userConsents)
        /*const temp = this.users.filter((filt) => filt.umId == this.theuserid)
            this.the_user = temp[0]*/
        /*this.fetchReceipt({
          tenant: this.$migrant_tenant_domain,
          principal: users.umUserName,
        }).then((receipt) => {
          console.log(receipt);
          this.theReceipt = receipt;
        });*/
      })
      console.log(this.features)
      console.log(this.features.includes('FEAT_DOCUMENTS'))
      this.loading = false
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
.title {
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 41px;
}
.container-labels {
  padding-top: 0px;
  padding-right: 96px;
  padding-bottom: 0px;
  padding-left: 96px;
}
.hr{
  margin-left:96px;
  margin-right:96px
}
.content {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;       
  }
.go_back{
  width:110px;
  border: 1px solid #0F3A5D;
box-sizing: border-box;
border-radius: 5px;
 background: #FFFFFF;
}
.image{
  background-image: url("../statics/BG Pattern.svg");
}
</style>

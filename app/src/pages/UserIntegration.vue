<template>
  <div>
    <div v-if="loading">
      {{ $t("input_labels.loading") }}
    </div>
    <div v-else>
      <div
        id="first-div"
      >
        <div
          id="content "
          class="q-pa-md image"
          style="padding-top:60px;text-align:center"
        >
          <q-btn
            size="15px"
            style="margin-right: 10px; width:200px;border-radius: 5px;"
            :label="$t('button.add_plan')"
            no-caps
            dense
            unelevated
            @click="addInterventionPlan"
            color="accent"
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
        class="q-pa-md col"
        id="second-div"
      >
        <div class="row container">
          <h3 class="col-6 header">
            {{ the_user.username }}
          </h3>

          
          <div class="row">
            <q-item>
              <q-item-section
                avatar
                style="padding-right: 0px; margin-right: -30px"
              >
                <q-icon
                  class="icon"
                  name="panorama_fish_eye"
                />
              </q-item-section>
              <q-item-section>{{ $t("input_labels.todo") }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section
                avatar
                style="padding-right: 0px; margin-right: -30px"
              >
                <q-icon
                  class="icon"
                  name="circle"
                />
              </q-item-section>
              <q-item-section>
                {{
                  $t("input_labels.validation_requested")
                }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section
                avatar
                style="padding-right: 0px; margin-right: -30px"
              >
                <q-icon
                  color="green"
                  name="circle"
                />
              </q-item-section>
              <q-item-section>
                {{
                  $t("input_labels.validated")
                }}
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>

      <div>
        <div
          class="q-pa-md"
          id="third-div"
          v-for="intervention_plan in intervention_plans"
          :key="intervention_plan.id"
        >
          <q-list
            bordered
            class="rounded-borders list"
          >
            <h4 id="header">
              <span id="first-span">
                {{ intervention_plan.title }}
              </span>
              <span id="second-span">
                <q-btn
                  id="button"
                  style="margin-right:10px;"
                  icon-right="add"
                  color="secondary"
                  no-caps
                  :data-cy="
                    'add_intervention_to_plan'.concat(intervention_plan.id)
                  "
                  :label="$t('button.add_intervention')"
                  :disable="hideAdd"
                  @click="
                    button_id = intervention_plan.id;
                    addIntervention();
                  "
                />
                <q-btn
                  size="15px"
                  padding="xs"
                  :icon="'img:statics/icons/Icon - Delete.svg'"
                  no-caps
                  style="border-radius: 5px;"
                  unelevated
                  @click="deletePlan(intervention_plan.id)"
                  color="white"
                />
              </span>
            </h4>
            <IntegrationPlan
              v-for="intervention in intervention_plan.interventions"
              :key="intervention.id"
              :title="intervention.title"
              :description="intervention.description"
              :the_intervention_plan="intervention_plan"
              :intervention="intervention"
              :the_processes_list="processes_list"
              :model="intervention_shell"
              :hide-form="hideForm"
              :tenants="tenants"
              :completion-doc="the_pic"
              :intervention_categories="types"
              @fetchPic="findDoc"
              @editIntervention="editIntervention"
              @cancelIntervention="cancelIntervention"
              @saveIntervention="savingIntervention"
              @validated="openValidateDialog"
              @deleteIntervention="deleteIntervention"
            />
          </q-list>
          <AddIntervention
            ref="add"
            :hide-add="hideAdd"
            :model="intervention_shell"
            :the_intervention_plan="intervention_plan"
            :the_processes_list="processes_list"
            @addIntervention="
              addIntervention();
              button_id = intervention_plan.id;
            "
            @saveIntervention="savingIntervention"
            @cancelIntervention="cancelIntervention"
            :intervention_categories="types"
            :show-add-form="button_id != intervention_plan.id"
          />
          <q-dialog
            v-model="ask_validation"
            persistent
          >
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">
                  {{ $t("input_labels.validate_intervention") }}
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
                  :label="$t('input_labels.optional_file_validation')"
                />
              </q-card-section>

              <q-card-actions
                align="right"
                class="text-primary"
              >
                <q-btn
                  :data-cy="'cancel'"
                  :label="$t('button.cancel')"
                  color="accent"
                  v-close-popup
                />
                <q-btn
                  :label="$t('button.validate')"
                  color="accent"
                  :data-cy="'validatetask'"
                  @click="validateTask()"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog
            v-model="ask_validation_no_doc"
            persistent
          >
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">
                  {{ $t("input_labels.validate_intervention") }}
                </div>
              </q-card-section>

              <q-card-actions
                align="right"
                class="text-primary"
              >
                <q-btn
                  :data-cy="'cancel'"
                  :label="$t('button.cancel')"
                  color="accent"
                  v-close-popup
                />
                <q-btn
                  :label="$t('button.validate')"
                  color="accent"
                  :data-cy="'validatetask'"
                  @click="validateTask()"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import IntegrationPlan from "components/IntegrationPlan"
import AddIntervention from "components/AddIntervention"
import editEntityMixin from "../mixin/editEntityMixin"
import storeMappingMixin from "../mixin/storeMappingMixin"

export default {
  name: "PageIndex",
  props: ["theuserid"],
  mixins: [
    editEntityMixin,
    storeMappingMixin({
      getters: {
        intervention_types: "integration_type/intervention_types",
        intervention_categories: "integration_category/intervention_categories",
        intervention_plans: "intervention_plan/intervention_plans",
        users: "user/users",
        validator: "user/pausers",
        documents: "documents/my_documents",
        completion_documents: "documents/completion_documents",
        tenants: "tenant/tenants",
        features: "features/featureFlags"
      },
      actions: {
        saveIntervention: "intervention_plan/saveIntervention",
        editIntervention: "intervention_plan/editIntervention",
        fetchInterventionPlan: "intervention_plan/fetchInterventionPlan",
        fetchSpecificUser: "user/fetchSpecificUserMigrant",
        fetchIntegrationType: "integration_type/fetchIntegrationType",
        fetchDocuments: "documents/fetchDocuments",
        fetchCompletionDocuments: "documents/fetchCompletionDocuments",
        fetchTenants: "tenant/fetchTenants",
        deletingIntervention: "intervention_plan/deleteIntervention",
        deleteInterventionPlan: "intervention_plan/deleteInterventionPlan",
        fetchDocumentType: "document_type/fetchDocumentType",
        editInterventionByValidation:"intervention/editInterventionByValidation",
        fetchValidator: "user/fetchPAUser",
        saveDoc: "documents/saveDocumentIntervention"
      }
    })
  ],
  data() {
    return {
      loading: true,
      hideForm: true,
      isNew: false,
      the_user: [],
      button_id: null,
      hideAdd: false,
      ask_validation: false,
      ask_validation_no_doc: false,
      processes_list: [
        "How to certify education degree",
        "Renewal of residence permit for working reasons",
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      validationFile: null,
      validatingIntervention: null,
      validatingUser: null,
      validatingDocType: null,
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
      id: this.$route.params.id,
      edit_action: {
        id: 999,
        intervention_title: "",
        description: "",
        linked_processes_id: [],
        validated: false,
        category: ""
      },
      intervention_shell: {
        id: -1,
        listId: -1,
        interventionType: [],
        validationDate: null,
        completed: false,
        title: "",
        description: "",
        validatingUserId: Number(this.theuserid),
        validatingUserTenant: Number(this.$migrant_tenant),
        assignmentDate: null,
        validationRequestDate: null
      },
      t_docs: [],

      selected_plan: null,
      validation: null,
      types: [],
      the_pic: null
    }
  },
  components: {
    IntegrationPlan,
    AddIntervention
  },
  computed: {
    filteredplans() {
      return this.intervention_plans.filter((filt) => {
        return filt.user_id.includes(this.id)
      })
    },

    filteredUsers() {
      return this.users.filter((filt) => {
        return filt.id == this.id
      })
    }
  },
  methods: {
    findDoc(intervention) {
      console.log("fetching doc")
      console.log(this.$store.state.documents.completion_documents)
      console.log(this.completion_documents)
      this.the_pic = null
      //console.log(id)
      var the_doc = null
      var intervention_doc = this.completion_documents.filter((doc) => {
        return doc.idIntervention == intervention.id
      })[0]
      if (intervention_doc != null) {
        console.log("inside intervention doc different from null")
        the_doc = this.documents.filter((document) => {
          console.log(document.id)
          console.log(intervention_doc.idDocument)
          return document.id == intervention_doc.idDocument
        })[0]
        console.log("i am the doc completed")
        console.log(the_doc)
        if (the_doc != null) {
          console.log("inside if")
          this.the_pic = the_doc.pictures[0].picture
        } else {
          console.log("inside if")

          this.the_pic = null
        }
      }
    },
    addInterventionPlan() {
      console.log(this.user)
      this.$router.push({
        name: "addinterventionplan",
        params: { theuser: this.the_user, theuserid: this.the_user.id }
      })
    },
    deletePlan(id) {
      this.$q.notify({
        type: "warning",
        message: this.$t("warning.delete_plan"),
        actions: [
          {
            label: this.$t("button.delete"),
            color: "red",
            handler: () => {
              console.log("inside deleting plan")
              console.log(id)
              this.deleteInterventionPlan(id)
            }
          },
          {
            label: this.$t("button.back"),
            color: "accent",
            handler: () => {
              console.log("not deleting")
            }
          }
        ]
      })
    },

    getTitle(id) {
      console.log(id)
      var temp_title = this.intervention_types.filter((int) => {
        return int.id == id
      })[0]
      console.log(temp_title)
      var lang = temp_title.translations.filter((transl) => {
        return transl.lang == this.activeLanguage
      })[0].interventionTitle
      return lang
    },
    getDescription(id) {
      console.log(id)
      var temp_title = this.intervention_types.filter((int) => {
        return int.id == id
      })[0]
      console.log(temp_title)
      var lang = temp_title.translations.filter((transl) => {
        return transl.lang == this.activeLanguage
      })[0].description
      console.log(lang)
      return lang
    },
    createShell(id_plan) {
      this.intervention_shell = {
        id: -1,
        listId: id_plan,
        interventionType: [],
        title: "",
        description: "",
        validationDate: null,
        completed: false,
        validatingUserId: null,
        validatingUserTenant: null,
        assignmentDate: null,
        validationRequestDate: null
      }
    },

    mergeIntervention(intervention) {
      console.log("I am intervention")
      console.log(intervention)
      this.intervention_shell.id = intervention.id
      this.intervention_shell.listId = intervention.listId
      this.intervention_shell.interventionType = JSON.parse(
        JSON.stringify(intervention.interventionType)
      )
      this.intervention_shell.validationDate = intervention.validationDate
      this.intervention_shell.completed = intervention.completed
      this.intervention_shell.validatingUserId = intervention.validatingUserId
      this.intervention_shell.validatingUserTenant =
        intervention.validatingUserTenant
      this.intervention_shell.assignmentDate = intervention.assignmentDate
      this.intervention_shell.validationRequestDate =
        intervention.validationRequestDate
      this.intervention_shell.title = intervention.title
      this.intervention_shell.description = intervention.description
      console.log("merged intervention")
      console.log(this.intervention_shell)
    },
    deleteIntervention(value) {
      console.log("in delete")
      console.log(value)
      var editing = this.intervention_plans.filter((filt) => {
        return filt.id == value.listId
      })
      this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
      this.deletingIntervention({
        intervention_id: value.id,
        plan_id: this.selected_plan.id
      })
    },
    savingIntervention(value) {
      console.log(this.isNew)
      var targetId = event.currentTarget.id
      var editing = this.intervention_plans.filter((filt) => {
        return filt.id == value.listId
      })
      if (this.isNew) {
        console.log("this is the new intervention")
        console.log(value)

        this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
        console.log(this.selected_plan)
        if (!this.selected_plan.interventions) {
          this.selected_plan.interventions = []
        }
        this.selected_plan.interventions.push(this.intervention_shell)
        var payload = {
          intervention: this.intervention_shell,
          plan: this.selected_plan
        }
        //this.saveIntervention(payload)
        this.$store.dispatch("intervention_plan/saveIntervention", {
          intervention: this.intervention_shell,
          plan: this.selected_plan
        })
        this.isNew = false
        this.hideAdd = false
        this.button_id = null
        console.log(this.isNew)
      } else {
        this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
        var index = this.selected_plan.interventions.findIndex(
          (item) => item.id == this.intervention_shell.id
        )
        this.selected_plan.interventions.splice(
          index,
          1,
          this.intervention_shell
        )
        var payload = {
          intervention: this.intervention_shell,
          plan: this.selected_plan
        }
        //this.editIntervention(payload)
        this.$store.dispatch("intervention_plan/editIntervention", {
          intervention: this.intervention_shell,
          plan: this.selected_plan
        })
        this.hideForm = true
        this.hideAdd = false
      }
    },

    addIntervention() {
      this.createShell(this.button_id)
      console.log("adding interventions")
      console.log(this.isNew)
      this.isNew = true
      this.hideAdd = true
    },

    openValidateDialog(event) {
      console.log(event)
      this.validatingIntervention = event
      console.log(this.validatingIntervention)

      console.log(this.$store.state.auth.user.umid)
      this.validatingUser = Number(this.theuserid)
      if(this.features.includes('FEAT_DOCUMENTS')){
        this.ask_validation = true
      }
      else{
        this.ask_validation_no_doc = true
      }
    },
    validateTask() {
      console.log("user id: " + this.validatingUser)
      let current_data = new Date().toISOString()

      // before validate the intervention and in the then check the file
      this.validatingIntervention.completed = true
      this.validatingIntervention.validationDate = current_data
      this.validatingIntervention.validationRequestDate = current_data
      // TODO change with the real user ID
      this.validatingIntervention.validatingUserId = this.$store.state.auth.user.umid
      console.log(this.validatingIntervention)
      this.editInterventionByValidation({
        intervention: this.validatingIntervention,
        plan: this.validatingIntervention.listId
      }).then(() => {
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
            this.doc_shell.userId = this.validatingUser
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
            console.log(this.validatingIntervention)
            console.log(this.validatingIntervention.id)
            this.saveDoc({
              document: this.doc_shell,
              id_intervention: this.validatingIntervention.id
            }).then(() => {
              // still have to write the completed_intervention_document table to associate the new doc with the intervention


            })
          }
        }
              this.createDocShell()
              this.validationFile = null
              this.validatingIntervention = null
              this.validatingUser = null
              this.validatingDocType = null
      })
    },
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
    validateIntervention(value) {
      console.log("in validation page")
      console.log(value)
      this.mergeIntervention(value)
      this.intervention_shell.completed = JSON.parse(JSON.stringify(true))
      var editing = this.intervention_plans.filter((filt) => {
        return filt.id == value.listId
      })
      this.selected_plan = JSON.parse(JSON.stringify(editing[0]))
      console.log("i am selected plan interventions")
      console.log(this.selected_plan.interventions)
      var index = this.selected_plan.interventions.findIndex(
        (item) => item.id == this.intervention_shell.id
      )
      this.selected_plan.interventions.splice(
        index,
        1,
        this.intervention_shell
      )
      var payload = {
        intervention: this.intervention_shell,
        plan: this.selected_plan
      }
      this.editIntervention(payload)
      //this.$store.dispatch('intervention_plan/editIntervention', { intervention: this.intervention_shell, plan: this.selected_plan })
    },

    editIntervention(value) {
      this.mergeIntervention(value)
      this.button_id = null
      this.isNew = false
      this.hideAdd = true
      this.hideForm = false
      this.$forceUpdate()
      console.log(this.intervention_shell)
    },

    cancelIntervention() {
      console.log("going back")
      this.button_id = null
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
    }
  },
  created() {
    var promise = []
    promise.push(this.fetchTenants())
    promise.push(this.fetchCompletionDocuments())
    /*.then(completion_docs =>{
      console.log("I am the completion documents")
      console.log(completion_docs)
    })*/
    promise.push(this.fetchDocuments(this.theuserid))
    /*.then(docs =>{
      console.log("I am the docs of this user")
      console.log(docs)
    })*/
    promise.push(this.fetchInterventionPlan(this.theuserid))
    /*.then(intervention_plans => {
        console.log("these are the returned plans")
        console.log(intervention_plans)
        this.loading = false
      })*/
    Promise.all(promise).then((promise_return) => {
      console.log(this.intervention_plans)
      console.log(this.completion_docs)
      console.log(promise_return)
      console.log("returned all promises")
      this.fetchIntegrationType().then((integration_types) => {
        console.log("got integration types")
        console.log(integration_types)
        integration_types.forEach((ut) => {
          var the_integration_types = {
            label: ut.translations.filter(
              this.filterTranslationModel(this.activeLanguage)
            )[0].interventionTitle,
            value: ut.id
          }
          this.types.push(the_integration_types)
        })
        this.fetchDocumentType().then((document_types) => {
          console.log(document_types)
          console.log("DOCUMENT TYPES FETCHED")
          document_types.forEach((document_type) => {
            var the_doc = {
              label: document_type.translations.filter(
                this.filterTranslationModel(this.activeLanguage)
              )[0].document,
              value: document_type.id
            }
            this.t_docs.push(the_doc)
          })
          this.loading = false
          console.log("I AM T DOCS")
          console.log(this.t_docs)
        })
      })

      //var payload = { userid: this.theuserid, tenantid: this.$migrant_tenant }
      this.fetchSpecificUser(this.theuserid).then((users) => {
        this.the_user = users
        console.log("return from fetch specific user")
        console.log(users)
      })
    })
    console.log(this.completion_docs)
    console.log("FINISHED CREATED")
  }
}
</script>
<style scoped>
#first-div {
  padding-left: 25px;
}

#second-div {
  width: 900px;
  margin: 0 auto;
  padding-left: 0px;
  padding-right: 0px;
}

#third-div {
  width: 900px;
  margin: 0 auto;
  padding-left: 0px;
}

.list {
  width: 900px;
  border-radius: 10px;
}

#header {
  padding-top: 10px;
  font-size: 20pt;
  font-weight: 600;
  padding-bottom: 20px;
  margin-top: 0px;
  height: 60px;
  margin-bottom: 0px;
  width: 900px;
  padding-left: 5px;
  background-color: #0f3a5d;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

#first-span {
  padding-left: 30px;
  font-size: 25px;
}

#second-span {
  float: right;
  margin-right: 15px;
}

#button {
  margin-top: 0px;
  border-radius: 5px;
}
.header {
  margin-bottom: 0px;
  padding-left: 12px;
  width: 65%;
  font-size: 25pt;
  font-weight: 600;
}
.top-span {
  text-align: right;
  width: 35%;
  display: inline-block;
  vertical-align: middle;
}
.add-button {
  width: 150px;
  margin-top: 37px;
  margin-bottom: 30px;
  margin-left: 5px;
  border-radius: 2px;
}
.icon {
  color: #ffd02c;
}
#content {
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

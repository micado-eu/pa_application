<template>
  <div class="q-pa-md">
    <div class="row">
      <h5 class="col-6">
        {{ $t("data_settings.document_types") }}
      </h5>
      <div
        class="col-6 "
        style="display: flex;align-items: center;justify-content: right"
      >
        <q-btn
          color="info"
          no-caps
          :data-cy="'addtype'"
          :label="$t('button.add_type')"
          @click="newDoc()"
          :disable="hideAdd"
          class="add-button"
        />
        <input
          id="import-input"
          type="file"
          name="name"
          style="display: none;"
          accept=".json"
          @change="importFileWindow($event)"
        >
        <q-btn
          class="add-button"
          color="accent"
          unelevated
          rounded
          :label="$t('button.import')"
          no-caps
          size="15px"
          @click="callImportFile()"
        />
      </div>
    </div>
    <q-card
      class="q-pa-xl div-2"
      :hidden="hideForm"
    >
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class=""
      >
        <!-- it seems that the following q-input causes a console error saying that he cannot read the property topic of undefined -->
        <HelpLabel
          :field-label="$t('input_labels.doc_type')"
          :help-label="$t('help.doc_type')"
          class="div-3"
        />
         
        <q-input
          outlined
          filled
          dense
          ref="doc_type"
          :hint="$t('input_labels.required')"
          counter
          :maxlength="$envconfig.titleLimit"
          :rules="[ 
            val => val.length <= $envconfig.titleLimit || 'Please use maximum 25 characters',
            val => !!val || 'Field is required'
          ]"
          v-model="int_doc_shell.translations.filter(
            (top) => top.translated == false
          )[0].document"
          :readonly="!(
            int_doc_shell.translations.filter(
              (top) => top.translated == false
            )[0].translationState == 0 &&
            int_doc_shell.published == false
          )"
          :label="$t('input_labels.doc_type_placeholder')"
        />
        <HelpLabel
          :field-label="$t('input_labels.description')"
          :help-label="$t('help.doc_type_description')"
          class="div-3"
        />
          
        <GlossaryEditor
          class="desc-editor"
          :readonly="!(
            int_doc_shell.translations.filter(
              (top) => top.translated == false
            )[0].translationState == 0 &&
            int_doc_shell.published == false
          )"
          v-model="int_doc_shell.translations.filter(
            (top) => top.translated == false
          )[0].description"
          :lang="int_doc_shell.translations.filter(
            (top) => top.translated == false
          )[0].lang"
          ref="editor"
        />

        <div class="row">
          <q-card-section
            class=" col section"
            style="padding-right:10px"
          >
            <HelpLabel
              :field-label="$t('input_labels.issuer')"
              :help-label="$t('help.issuer')"
              class="div-3"
              style="padding-top:10px"
            />
            <q-input
              outlined
              :readonly="int_doc_shell.published"
              filled
              dense
              maxlength="20"
              v-model="int_doc_shell.issuer"
              :label="$t('input_labels.issuer')"
            />
          </q-card-section>

          <q-card-section class=" col section">
            <HelpLabel
              :field-label="$t('input_labels.icon')"
              :help-label="$t('help.doc_type_icon')"
              class="field"
              style="padding-top:10px"
            /> 
            <q-select
              dense
              filled
              v-model="int_doc_shell.icon"
              :options="this.document_types_icons"
              :label="$t('input_labels.icon')"
              :rules="[ 
                val => val != null|| 'Field is required'
              ]"
              :readonly="int_doc_shell.published"
              ref="icon"
              color="teal"
              @input="addIcon($event)"
              @remove="removeIcon($event)"
              clearable
            >
              <template v-slot:selected>
                <q-chip
                  v-if="int_doc_shell.icon"
                  square  
                >
                  <q-avatar>
                    <img :src="int_doc_shell.icon">
                  </q-avatar>
                </q-chip>
                <q-badge v-else />
              </template>
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-img
                      style="max-width:24px; max-heigth:24px"
                      :src="scope.opt.value"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <!-- <q-select
            filled
            dense
            :hint="$t('input_labels.required')"
            ref="icon"
            clearable
            :rules="[ 
                val => val.length > 0 || 'Field is required'
                ]"
            :readonly="int_doc_shell.published"
            v-model="int_doc_shell.icon"
            @input="addIcon($event)"
            @remove="removeIcon($event)"
            emit-value
            map-options
            :options="this.icons"
            :label="$t('input_labels.icon')"
            class="select"
          />-->
            <!--<q-file
              @input="getFilesIcon($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_icon')"
              standout
              outlined
              accept=".jpg, image/*" 
              @rejected="onRejected"
            >

            </q-file>
            <q-card v-if="icon != null" class="pictures-card">
             <q-item-section
              class="col-4 pictures-section"
            >
              <q-img
                :src="int_doc_shell.icon"
                spinner-color="white"
                class="image"
              />

              <span class="span">
                <q-btn
                  no-caps
                  rounded
                  class="negative-button"
                  filled
                  color="accent"
                  @click="removeIcon()"
                  :label="$t('button.remove')"
                />
              </span>
              
            </q-item-section>
            </q-card>-->
          </q-card-section>
        </div>
        <div class="row">
          <q-card-section
            class="col section"
            style="padding-right:10px"
          >
            <HelpLabel
              :field-label="$t('input_labels.doc_pics')"
              :help-label="$t('help.doc_pics')"
              class="field"
            /> 
          
            <q-file
              @input="getFilesPics($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_doc_pics')"
              standout
              :disable="int_doc_shell.published"
              outlined
              accept=".jpg, image/*"
              @rejected="onRejected"
            />
            <q-card class="pictures-card">
              <div class="row">
                <q-item-section
                  class="col-4 pictures-section"
                  v-for="image in uploaded_images"
                  :key="image"
                >
                  <q-img
                    :src="image"
                    spinner-color="white"
                    class="image"
                    @click="addHotspot(image)"
                  />

                  <span class="span">
                    <q-btn
                      no-caps
                      rounded
                      class="negative-button"
                      filled
                      color="accent"
                      @click="removePicture(image)"
                      :label="$t('button.remove')"
                    />
                  </span>
                </q-item-section>
                <q-dialog
                  v-model="hotimage"
                  @hide="hotspotConfig.data = []"
                >
                  <q-card>
                    <v-hotspot
                      :init-options="hotspotConfig"
                      @save-data="saveHotspot"
                    />
                  </q-card>
                </q-dialog>
              </div>
            </q-card>
          </q-card-section>
          <q-card-section class=" col section">
            <HelpLabel
              :field-label="$t('input_labels.upload_model')"
              :help-label="$t('help.upload_model')"
              class="field"
            /> 
          
            <q-file
              @input="getFilesModel($event)"
              bg-color="grey-3"
              dense
              :disable="int_doc_shell.published"
              :label="$t('input_labels.upload_model')"
              standout
              outlined
              accept=".pdf"
              @rejected="onRejected"
            />
            <q-item
              v-if="int_doc_shell.model"
              class="col-6"
            >
              <q-item-section avatar>
                <q-icon name="note_add" />
              </q-item-section>
              <q-item-section>{{ this.int_doc_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].document }} model</q-item-section>
              <q-item-section>
                <q-btn
                  no-caps
                  dense
                  class="delete-button"
                  :data-cy="'cancelmodel'"
                  unelevated
                  rounded
                  :label="$t('button.remove')"
                  @click="cancelModel()"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
        </div>

        <div class="q-gutter-sm row">
          <div
            class="col"
            style="justify-content:center"
          >
            <div class="row">
              <HelpLabel
                :field-label="$t('input_labels.validable')"
                :help-label="$t('help.validable')"
                style="padding-top:10px"
              /> 
              <q-checkbox
                :disable="int_doc_shell.published"
                class=" col-1 div-3"
                color="accent"
                style="padding-top:10px"
                v-model="int_doc_shell.validable"
              />
            </div>
          </div>
          <div class="col">
            <div
              class="row"
              style="padding-top:9px"
            >
              <HelpLabel
                :field-label="$t('translation_states.translatable')"
                :help-label="$t('help.is_published')"
                style="padding-top:0px"
              />


              <!--<q-toggle
            v-model="int_doc_shell.published"
            color="accent"
            :disable="int_doc_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
            @input="isPublished($event, int_doc_shell.id)"
          />-->
              <q-toggle
                :value="
                  int_doc_shell.translations.filter(
                    (top) => top.translated == false
                  )[0].translationState == 1
                "
                color="accent"
                style=""
                @input="makeTranslatable($event)"
              />
            </div>
          </div>
        </div>
        <q-card-section
          v-if="int_doc_shell.validable"
          class="section"
        >
          <HelpLabel
            
            :field-label="$t('input_labels.validators')"
            :help-label="$t('help.validators')"
            class="field"
          /> 
          
          <q-select
            v-if="int_doc_shell.validable"
            multiple
            :readonly="int_doc_shell.published"
            filled
            dense
            clearable
            v-model="int_doc_shell.validators"
            @input="addValidators($event)"
            @remove="removeValidator($event)"
            @clear="clearValidators()"
            emit-value
            map-options
            :options="this.validatorList"
            :label="$t('input_labels.validators')"
            class="select"
          />
        </q-card-section>
      

        <hr id="hr">
        <q-btn
          no-caps
          class="delete-button"
          :data-cy="'canceldoc'"
          unelevated
          rounded
          :label="$t('button.cancel')"
          @click="cancelDoc()"
        />
        <q-btn
          no-caps
          :disable="int_doc_shell.published"
          :data-cy="'savedoc'"
          color="accent"
          unelevated
          rounded
          :label="$t('button.save')"
          class="button"
          type="submit"
        />
      </form>
    </q-card>
    <q-item>
      <q-item-section class="col-1">
        {{ $t('input_labels.image') }}
      </q-item-section>
      <q-item-section class="col-6 flex flex-left  ">
        {{ $t('input_labels.name') }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t('input_labels.is_published') }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t('input_labels.transl_state') }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t('input_labels.edit') }}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{ $t('input_labels.export') }}
      </q-item-section>
    </q-item>

    <q-list
      bordered
      separator
    >
      <div
        v-for="document_type in document_types"
        :key="document_type.id"
      >
        <q-item>
          <q-item-section class="col-1 ">
            <q-img
              :src="document_type.icon"
              spinner-color="white"
              id="image"
            />
          </q-item-section>
          <q-item-section class="col-6 flex flex-left ">
            {{ document_type.translations.filter(filterTranslationModel(activeLanguage))[0].document }}
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            <q-toggle
              v-model="document_type.published"
              color="accent"
              :disable="
                document_type.translations.filter((top) => top.translated == false)[0]
                  .translationState != 1
              "
              @input="isPublished($event, document_type.id)"
            />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            {{ getTranslationState(document_type.id) }}
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top ">
            <q-icon
              :data-cy="'editdoc'.concat(document_type.id)"
              id="icon"
              name="img:statics/icons/Edit.png"
              size="md"
              @click.stop="editingDocWindow(document_type)"
            />
          </q-item-section>
          <q-item-section class="col-1  flex flex-center top">
            <q-icon
              :data-cy="'deletedoc'.concat(document_type.id)"
              name="img:statics/icons/Icon - Download.svg"
              @click.stop="exportDoc(document_type.id)"
              size="md"
            />
          </q-item-section>
        </q-item>
        <div class="row pad">
          <p style="padding-top:8px; margin-bottom:0px;padding-left:20px">
            {{ $t('input_labels.available_transl') }}:
          </p>
          <q-chip
            style="background-color:#C4C4C4"
            text-color="white"
            v-for=" lang in translationAvailable(document_type)"
            :key="lang.lang"
          >
            {{ lang.lang.toUpperCase() }}
          </q-chip>
        </div>
        <hr style="margin-bottom:0px">
      </div>
    </q-list>
    <q-card class="my-card" />
    <q-dialog v-model="editing">   
      <q-card
        class="q-pa-md"
        style="padding-top:0px;width: 700px; max-width: 80vw;"
      >
        <div style="padding-top:30px; text-align:center">
          <p class="delete_desc">
            {{ $t('input_labels.edit_or_delete') }}
          </p>
          <p class="delete_text">
            {{ int_doc_shell.translations.filter(filterTranslationModel(activeLanguage))[0].document }}?
          </p>
        </div>
        <div style="text-align:center;">
          <q-btn
            class="edit_button"
            :label="$t('button.edit')"
            :icon="'img:statics/icons/Edit.png'"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="editingDoc()"
            style="margin-right:10px"
          />
          <q-btn
            class="delete_button"
            :label="$t('button.delete')"
            :icon="'img:statics/icons/Icon - Delete.svg'"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="deletingDoc(int_doc_shell)"
          />
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="importing">   
      <q-card
        class="q-pa-md"
        style="padding-top:0px;width: 700px; max-width: 80vw;"
      >
        <div style="padding-top:30px; text-align:center">
          <p class="delete_desc">
            {{ $t('input_labels.import') }}
          </p>
        </div>
        <div style="text-align:center;">
          <q-btn
            class="edit_button"
            :label="$t('button.import')"
            :icon="'img:statics/icons/Edit.png'"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="importFile()"
            style="margin-right:10px"
          />
          <q-btn
            class="delete_button"
            :label="$t('button.cancel')"
            :icon="'img:statics/icons/Icon - Delete.svg'"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="importing = false"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
  <!--<div :id="$options.name" class="q-pa-md">
    <router-link :to="'#'+$options.name">
      <h5 @click="onClickTitle()">{{$options.name}}</h5>
    </router-link>
    <div id="div-1" >
      <div class="q-gutter-md justify-center div-2">
        <q-btn
          class="add-button"
          size="lg"
          unelevated
          rounded
          color="accent"
          style=""
          :label="$t('button.add_document')"
          to="/adddocument"
        />
      </div>
    </div>
    <div class="div-2">
      <div id="div-3">
        <q-list>
          <ListItem
            v-for="document_type in document_types"
            :key="document_type.id"
            :Title="document_type.translations.filter(filterTranslationModel(activeLanguage))[0].document"
            :Text="document_type.translations.filter(filterTranslationModel(activeLanguage))[0].description"
            :Image="document_type.icon"
            :Link="document_type.id"
            :theDocumentType="document_type"
            @remove="deleteDocument"
          ></ListItem>
        </q-list>
      </div>
    </div>
  </div>-->
</template>


<script>
import ListItem from "./ListItem"
import editEntityMixin from '../../mixin/editEntityMixin'
import storeMappingMixin from '../../mixin/storeMappingMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import VueHotspot from 'vue-hotspot'
import DocumentTypeIcons from '../../mixin/DocumentTypeIcons.json'
import translatedButtonMixin from '../../mixin/translatedButtonMixin'
import HelpLabel from '../HelpLabel'




export default {
  name: "DocumentTypeManager",
  mixins: [editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        document_types: 'document_type/document_types',
        hotspots: 'picture_hotspots/hotspots',
        tenants: 'tenant/tenants',
        flowsDocs: 'flows/processes',
        steps: 'steps/steps',
        document_types_icons:'document_type/document_types_icons'
      }, actions: {
        fetchSteps: 'steps/fetchSteps',
        exportDocumentType:'document_type/exportDocumentType',
        fetchFlowsDocs:'flows/fetchFlows',
        deleteDocumentType: 'document_type/deleteDocumentType',
        fetchDocumentType: 'document_type/fetchDocumentType',
        saveDocumentType: 'document_type/saveDocumentType',
        editDocumentType: 'document_type/editDocumentType',
        fetchHotspots: 'picture_hotspots/fetchHotspots',
        fetchHotspotsById: 'picture_hotspots/fetchHotspotsById',
        fetchTenants: 'tenant/fetchTenants',
        updatePublished: 'document_type/updatePublished',
        updatePublishedFlows: 'flows/updatePublished',
        deleteStepTranslationProd: 'steps/deleteTranslationProd',
        saveTranslationProd: 'document_type/saveTranslationProd',
        deleteTranslationProd: 'document_type/deleteTranslationProd',
        deleteTranslationProdFlows: 'flows/deleteTranslationProd',
        saveSpotTranslationProd: 'picture_hotspots/saveTranslationProd',
        deleteSpotTranslationProd: 'picture_hotspots/deleteTranslationProd',
        fetchDocumentTypeIcons:'document_type/fetchDocumentTypeIcons',
        importDocumentType:'document_type/importDocumentType'
      }
    })],
  components: {
    'v-hotspot': VueHotspot, GlossaryEditor,HelpLabel
  },
  data () {
    return {
      import_doc:null,
      importing:false,
      icons: DocumentTypeIcons,
      deleting_hotspots:[],
      editing:false,
      hideForm: true,
      hideAdd: false,
      isNew: false,
      uploaded_images: [],
      int_doc_shell:
      {
        id: -1, issuer: null, translations: [], icon: "", model: "", validable: false
      },
      hotimage: false,
      myimage: null,
      hotspotConfig: {
        image: null,
        editable: true,
        interactivity: 'hover',
        data: [

        ],
        hotspotColor: '#85ce61',
        messageBoxColor: '#409eff',
        textColor: '#333',
        opacity: 0.9
      },
      icon: null,
      the_model:null, 
      order: 0, 
      validatorList:[],
      publishedOrig:false
    }
  },

  methods: {
    callImportFile() {
      document.getElementById('import-input').click()
    },
    importFileWindow(event) {
      console.log(event)
        const files = document.getElementById('import-input').files
  if (files.length <= 0) {
    return false
  }
          const fr = new FileReader()

  fr.onload = e => {
    const result = JSON.parse(e.target.result)
    const formatted = JSON.stringify(result, null, 2)
    console.log(result[0])
    this.import_doc = JSON.parse(formatted)[0]
    console.log(this.import_doc)
    //we assign the formatted json to a data field so we can manipulate it later
    //document.getElementById('result').innerHTML = formatted
  }
  console.log(this.import_doc)
  fr.readAsText(files.item(0))
        this.importing = true

    },
    importFile(){
      this.import_doc.published = false
      this.importDocumentType(this.import_doc)
      this.importing = false
    },
      exportDoc(value){
       console.log(value)
       this.exportDocumentType(value).then((doc)=>{
        console.log(doc)
         var filename = doc[0].translations.filter((transl)=>{
           return transl.lang == this.$userLang
         })[0].document
         var element = document.createElement('a')
        element.setAttribute('href', "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(doc,null, 4)))
        element.setAttribute('download', filename + '.json')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
       })
     },
     makeTranslatable(value) {
      console.log(value)
      if (value) {
        this.int_doc_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 1
      } else {
        this.int_doc_shell.translations.filter(
          (top) => top.translated == false
        )[0].translationState = 0
      }
    },
    getTranslationState(id){
      var doc = this.document_types.filter((thedoc)=>{
        return thedoc.id == id
      })[0]
      var state = doc.translations.filter((transl)=>{
        return transl.lang == this.$defaultLang
      })[0].translationState
      if(state == 0){
        return this.$i18n.t('translation_states.editing')
      }
      else if(state ==1){
        return this.$i18n.t('translation_states.translatable')
      }
      else if(state==2){
        return this.$i18n.t('translation_states.translating')
      }
      else{
        return this.$i18n.t('translation_states.translated')
      }
    },
    onSubmit () {
      console.log(this.$refs.doc_type)
      console.log(this.$refs.icon)
      this.$refs.icon.validate()
      this.$refs.doc_type.validate()
      console.log(this.$refs.icon.hasError)
      if (this.$refs.doc_type.hasError || this.$refs.icon.hasError ) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: this.$t('warning.req_fields')
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.savingDoc()
      }
    },
        onReset () {
       this.$refs.doc_type.validate()
       this.$refs.icon.validate()

       this.$refs.doc_type.resetValidation()
       this.$refs.icon.resetValidation()
    },
    isPublished(event,value){
     console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_doc =  this.document_types.filter((doc)=>{
        return doc.id == value
      })[0]
      var publishing_hotspots = []
      if(publishing_doc.pictures){
        publishing_doc.pictures.forEach((pic)=>{
  
       var pic_spots =  this.hotspots.filter((spot)=>{
          return spot.pictureId == pic.id
        })
        if(pic_spots.lenght!=0){
          pic_spots.forEach((spot)=>{
            publishing_hotspots.push(spot)
          })
        }
      })
      }
      console.log("i am doc to publish")
      console.log(publishing_doc)
      var docs = JSON.parse(JSON.stringify(publishing_doc))
      var spots= JSON.parse(JSON.stringify(publishing_hotspots))
      if( event == true){
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.publish_doc_type'),
        actions: [
          { label: this.$t('lists.yes'), color: 'accent', handler: () => { 
            this.updatePublished({doc:docs, published:event})
            this.saveTranslationProd(value)
            this.saveSpotTranslationProd(spots)
            this.cancelDoc()
             } },
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
            this.document_types.filter((topic) => {
                  return topic.id == value
                })[0].published = false
             } }
        ]
      })
       
      }
      else{
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.unpublish_doc_type'),
        actions: [
          { label: this.$t('lists.yes'), color: 'accent', handler: () => {
            console.log("inside unublishing stuff")
            console.log(this.flowsDocs)
            var related_processes =[]
             this.flowsDocs.forEach((flow)=>{
               console.log("inside foreach")
               console.log(flow)
              if(flow.producedDoc){
                console.log("flows has documents")
                var temp = flow.producedDoc.filter((fl)=>{
                  return fl.idDocument == publishing_doc.id
                })
                if(temp.length>0){
                  console.log("flow has the document i am unpublishing")
                  related_processes.push(flow)
                }
              }
            })
            if(related_processes.length>0){
              related_processes.forEach((process)=>{
                console.log("in unpublishing flow")
                this.updatePublishedFlows({process:process, published:false})
                this.deleteTranslationProdFlows(process.id)
                var publishing_steps = this.steps.filter((step)=>{
                    return step.idProcess == process.id
                  })
                this.deleteStepTranslationProd(publishing_steps) 
              })
            }
            this.updatePublished({doc:docs, published:event})
            this.deleteTranslationProd(value)
            this.deleteSpotTranslationProd(spots)}},
          { label: this.$t('lists.no'), color: 'red', handler: () => { 
            this.document_types.filter((topic) => {
                  return topic.id == value
                })[0].published = true
             } }
        ]
      })
       
      }
     },
     
    cancelModel(){
      this.int_doc_shell.model = ""
      this.the_model = ""
    },
    addIcon(value){
      console.log(value)
      this.int_doc_shell.icon = value.value
      console.log("I am doc shel after adding icon ")
      console.log(this.int_doc_shell)
    }, 
     addValidators(value){
       console.log(value)
       this.int_doc_shell.validators = value
      /* value.forEach((validator)=>{
         this.int_doc_shell.validators.push(value)
       })*/
      //this.int_doc_shell.validators.push(value)
      console.log("I am doc shel after adding validators ")
      console.log(this.int_doc_shell.validators)
    }, 
    
    saveHotspot(value){
      console.log("saving hotspot")
      console.log(value)
      console.log(value[0].x)
      console.log(Math.floor(value[0].y))
      var the_picture = this.int_doc_shell.pictures.filter((pic) => {
        return pic.image == this.hotspotConfig.image
      })[0]
      var originalHotspots =[]
      if(the_picture.hotspots.length > 0){
        the_picture.hotspots.forEach((hspott)=>{
          originalHotspots.push(hspott)
        })
      }
      console.log(originalHotspots)
      originalHotspots.forEach((spot)=>{
        var to_remove=value.filter(((hspot)=>{
          return (spot.x== hspot.x && spot.y == hspot.y)
        }))[0]
        var index = value.findIndex(val => val.x == to_remove.x && val.y == to_remove.y)
        value.splice(index, 1)

      })
      console.log("i am values after removing the ones that were present already")
      console.log(value)
      value.forEach((spot) => {
             var hotspot_translations = []
             hotspot_translations.push({ phtId: -1, lang: this.activeLanguage, title: spot.Title, message: spot.Message, translationState:this.int_doc_shell.translations.filter((doc)=>{return doc.translated == false})[0].translationState, translationDate:null, translated:false })
            hotspot_translations.push({ phtId: -1, lang: this.activeLanguage, title: spot.Title, message: spot.Message, translationState:this.int_doc_shell.translations.filter((doc)=>{return doc.translated == false})[0].translationState, translationDate:null, translated:true })
            hotspot_translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        /*this.languages.forEach(l => {
          if (l.lang == this.activeLanguage) {
            hotspot_translations.push({ phtId: -1, lang: l.lang, title: spot.Title, message: spot.Message, translationState:this.int_doc_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].translationState })
          }
          else {
            hotspot_translations.push({ phtId: -1, lang: l.lang, title: '', message: '', translationState:this.int_doc_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].translationState  })
          }
        })*/
        the_picture.hotspots.push({
          id: -1,
          x: Math.floor(spot.x),
          y: Math.floor(spot.y),
          pictureId: the_picture.id,
          translations: hotspot_translations
        })
      })
      this.hotimage = false
      this.hotspotConfig.data = []
      console.log("this is the hotspot data")
      console.log(this.hotspotConfig.data)

      console.log("this is the doc shell")
      console.log(this.int_doc_shell)
    },
    editingDoc(){
    if(this.int_doc_shell.published){
        this.$q.notify({
        message: this.$t('warning.published_edit'),
        color: 'red'
    })
      }
      else{
        this.hideForm = false
        this.editing = false
      }
    },
    editingDocWindow(doc) {
      this.isNew = false
      //this.hideForm = false
      this.mergeDoc(doc)
      this.publishedOrig = doc.published
      this.editing = true
    },
    deletingDoc (doc) {
      //we will need to filter through the hotspots and send those to because they need to be deleted and we can't delete 
      //hotspots translations without having hotspots ids
      console.log(doc)
      if (doc.pictures) {
        console.log(doc.pictures)

        doc.pictures.forEach((pic) => {
          var spots = this.hotspots.filter((spot) => {
            return spot.pictureId == pic.id
          })
          if (spots != null) {
            console.log("inside if")
            console.log(spots)
            spots.forEach((spot) => {
              this.deleting_hotspots.push(spot)
            })

          }
        })

        console.log("i am deleting hotspots")

      }
      console.log(this.deleting_hotspots)
      //this.$store.dispatch("topic/deleteTopic", index);
      var payload = { index: doc.id, hotspots: this.deleting_hotspots }
      console.log(payload.hotspots.length != 0)
       this.$q.notify({
        type: 'warning',
        timeout:0,
        message: this.$t('warning.delete_doc_type'),
        actions: [
          { label: this.$t('button.delete'), color: 'red', handler: () => { 
             this.deleteDocumentType(payload)
              this.deleting_hotspots = [] } },
          { label: this.$t('button.back'), color: 'accent', handler: () => { 
            console.log("not deleting")
           this.deleting_hotspots = [] } }
        ]
      })
     this.editing = false



    },
    removeIcon () {
      this.icon = null
      this.int_doc_shell.icon = ''
    },
    removeValidator (value) {
      console.log(value)
      var idx = this.int_doc_shell.validators.indexOf(value)
      console.log(idx)
      this.int_doc_shell.validators.splice(idx, 1)
      console.log(this.int_doc_shell.validators)
    },
    clearValidators(){
      this.int_doc_shell.validators = []
    },
    cancelDoc () {
      this.onReset()
      this.isNew = false
      this.hideForm = true
      this.hideAdd = false
      this.int_doc_shell.validators = []
      this.uploaded_images = []
      this.icon = null
      this.the_model = null
      this.order = 0
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    getFilesIcon (files) {
      console.log(files)
      console.log(this)
      console.log(self)
      console.log("getting icon")
      const reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: files.name,
          type: files.type,
          size: `${Math.round(files.size / 1000)} kB`,
          base64: reader.result,
          file: files
        }
        console.log(this.uploaded_images)
        this.icon = fileInfo.base64
        this.int_doc_shell.icon = fileInfo.base64
        console.log(fileInfo)
      }
    },
    getFilesModel (files) {
      console.log(files)
      console.log(this)
      console.log(self)
      console.log("getting model")
       const reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: files.name,
          type: files.type,
          size: `${Math.round(files.size / 1000)} kB`,
          base64: reader.result,
          file: files
        }
        console.log(this.uploaded_images)
        this.the_model = files
        this.int_doc_shell.model = fileInfo.base64
        console.log(this.int_doc_shell)
        console.log(fileInfo)
      }

      /*const reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: files.name,
          type: files.type,
          size: `${Math.round(files.size / 1000)} kB`,
          base64: reader.result,
          file: files
        }
        this.uploaded_images.push(fileInfo.base64)
        console.log(this.uploaded_images)
        this.int_doc_shell.pictures.push({
          id: -1,
          image: fileInfo.base64,
          documentTypeId: -1,
          order: null
        })
        console.log(fileInfo)
      }*/
    },
    getFilesPics (files) {
      console.log(files)
      console.log(this)
      console.log(self)

      const reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: files.name,
          type: files.type,
          size: `${Math.round(files.size / 1000)} kB`,
          base64: reader.result,
          file: files
        }
        this.uploaded_images.push(fileInfo.base64)
        console.log(this.uploaded_images)
        this.int_doc_shell.pictures.push({
          id: -1,
          image: fileInfo.base64,
          documentTypeId: this.int_doc_shell.id,
          order: this.order,
          hotspots: []
        })
        this.order += 1
        this.myimage = fileInfo.base64
        this.hotspotConfig.image = fileInfo.base64
        console.log(fileInfo)
      }
    },
    createShell () {
      this.int_doc_shell = { id: -1, issuer: null, translations: [], pictures: [], validators:[], icon: "", model: "", validable: false, published:false }
       this.int_doc_shell.translations.push({
        id: -1,
        lang: this.activeLanguage,
        document: "",
        description: "",
        translationDate: null,
        translationState: 0,
        translated: false
      })
    },
    addHotspot (picture) {
      var selected_picture = this.uploaded_images.filter((pic) => {
        console.log(pic == String(picture))
        return pic == String(picture)
      })[0]
      console.log("this is the selected pic")
      console.log(selected_picture)

      this.hotspotConfig.image = selected_picture
      console.log("this is the do shell I'm working on")
      console.log(this.int_doc_shell)
      var spots = this.int_doc_shell.pictures.filter((the_pic) => {
        console.log("i am picture in filter")
        console.log(the_pic)
        return the_pic.image == String(picture)
      })[0].hotspots
      if (spots.length != 0) {
        console.log("These are the spots")
        console.log(spots)
        spots.forEach((spot) => {
          var message = spot.translations.filter((transl) => {
            return transl.lang == this.activeLanguage
          })[0]
          this.hotspotConfig.data.push({
            Message: message.message,
            Title: message.title,
            x: spot.x,
            y: spot.y
          })
        })
        console.log("i am data for hotspot")
        console.log(this.hotspotConfig.data)
      }

      this.hotimage = true
    },

    mergeDoc (doc) {
      console.log("in merging")
      console.log(doc)
      this.int_doc_shell.id = doc.id
      this.int_doc_shell.icon = doc.icon
      this.icon = doc.icon
      this.int_doc_shell.published = doc.published
      //var model = atob(doc.model.replace('data:application/pdf;base64,',''))
      //console.log("i am the model")
      //console.log(model)
      //this.int_doc_shell.published = doc.published
      //this.int_doc_shell.publicationDate = doc.publicationDate
      this.int_doc_shell.issuer = doc.issuer
      this.int_doc_shell.model = doc.model
      this.int_doc_shell.validable = doc.validable
      if(doc.validators!= null){
        doc.validators.forEach((validator)=>{
          this.int_doc_shell.validators.push(validator.validableByTenant)
        })
        
      }
      if (doc.pictures != null) {
        this.int_doc_shell.pictures = doc.pictures
        this.int_doc_shell.pictures.forEach((pic) => {
          console.log("in int doc picture foreach")
          pic.hotspots = []
          this.fetchHotspotsById(pic.id).then((spots) => {
            console.log("after fetch spots")
            console.log(spots)
            pic.hotspots = spots
          })
        })
      }
      else {
        this.int_doc_shell.pictures = []
      }
      this.int_doc_shell.pictures.forEach((a_picture) => {
        this.uploaded_images.push(a_picture.image)
      })
      this.int_doc_shell.translations = [
        doc.translations.filter((top) => {
          return top.lang == this.activeLanguage && top.translated == false
        })[0]
      ]
      console.log("after merge")
      console.log(this.int_doc_shell)
    },
    removePicture (image) {
      var idx = this.uploaded_images.findIndex(an_image => an_image === image)
      this.uploaded_images.splice(idx, 1)
      console.log(this.uploaded_images)
      var doc_idx = this.int_doc_shell.pictures.findIndex(an_image => an_image.image === image)
      this.int_doc_shell.pictures.splice(doc_idx, 1)
      console.log(this.int_doc_shell.pictures)
    },

    async savingDoc () {
      if (this.isNew) {
        console.log("I am the document")
        console.log(this.int_doc_shell)
        this.int_doc_shell.translations.push({
          id: -1,
          lang: this.activeLanguage,
          document: this.int_doc_shell.translations[0].document,
          description: this.int_doc_shell.translations[0].description,
          translationDate: null,
          translationState: this.int_doc_shell.translations[0]
            .translationState,
          translated: true
        })
        //}
        this.int_doc_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        this.saveDocumentType(this.int_doc_shell).then((doc) => {

          console.log("I am the saved document in the store")
          console.log(doc)
          this.order = 0
        }
        )
      }
      else {
        if (this.int_doc_shell.translations[0].translationState == 1) {
          this.int_doc_shell.translations.push({
            id: this.int_doc_shell.id,
            lang: this.activeLanguage,
            document: this.int_doc_shell.translations[0].document,
            description: this.int_doc_shell.translations[0].description,
            translationDate: null,
            translationState: 1,
            translated: true
          })
        }
        this.int_doc_shell.translations.forEach((transl) => {
          transl.translationDate = new Date().toISOString()
        })
        console.log(this.int_doc_shell)
        this.int_doc_shell.pictures.forEach((picture)=>{
          picture.hotspots.forEach((spot)=>{
            spot.translations.forEach((transl)=>{
              console.log(this.int_doc_shell.translations[0].translationState)
              transl.translationState = this.int_doc_shell.translations[0].translationState
            })
          })
        })
        console.log("doc after change of  transl state")
                console.log(this.int_doc_shell)

        this.editDocumentType({doc_element:this.int_doc_shell, publishedOrig: this.publishedOrig}).then(()=>{
          console.log("In edit")
        console.log(this.int_doc_shell)
        //if(this.int_doc_shell.published != this.publishedOrig){
        //  this.isPublished(this.int_doc_shell)
        //}
        })
        

      }

      this.uploaded_images = []
      this.icon = null
      this.hideAdd = false
      this.hideForm = true
      //this.createShell()
    },
    newDoc () {
      this.uploaded_images = []
      this.icon = null
      this.createShell()
      this.isNew = true
      this.hideForm = false
      this.hideAdd = true
    },
    onClickTitle: function () {
      this.$emit("scroll", "#" + this.$options.name)
    },
    /*deleteDocument(value) {
      var filteredDocuments = this.document_types.filter(filt => {
        console.log("in fil");
        console.log(filt);
        return filt.id == value;
      });
      this.deleteDocumentType(filteredDocuments[0].id)
    },*/
    filterTranslationModel (currentLang) {
      return function (element) {
        return element.lang == currentLang
      }
    }
  },

  created () {
    this.createShell()
    this.fetchDocumentTypeIcons()
    this.fetchHotspots()
    this.loading = true
    this.fetchSteps()
      .then(steps => {
        this.loading = false
        console.log(this.steps)
      })
    this.fetchFlowsDocs().then((flows)=>{
      console.log("i amflow doscs")
      console.log(flows)
    })
    console.log(this.$store)
    this.fetchDocumentType()
      .then(document_types => {
        console.log(document_types)
        this.loading = false
      })
    this.fetchTenants().then((tenants)=>{
      console.log(tenants)
      tenants.forEach((tenant)=>{
        this.validatorList.push({
          label: tenant.name,
          value:tenant.id
        })

      })
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  max-height: 175px;
  max-width: 150px;
  margin: 0 auto;
}
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width: 100px;
  border-radius: 2px;
  margin-right: 15px;
  margin-left: 10px;
  margin-top: 30px;
}
h5 {
  font-weight: bold;
}
.div-1 {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: right;
}
.div-2 {
  margin-bottom: 100px;
}
.add-button {
  width: 200px;
  border-radius: 2px;
  margin-right:10px
}
.button {
  width: 100px;
  border-radius: 2px;
  margin-top: 30px;
}
.div-3 {
  font-size: 16px;
  font-weight: 600;
}
#hr {
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #dadada;
}
.div-4 {
  padding-left: 20px;
  padding-bottom: 10px;
}
.div-5 {
  padding-left: 10px;
}
.div-6 {
  padding-left: 30px;
}
#image {
  height: 40px;
  max-width: 40px;
}
.section {
  font-size: 16px;
  font-weight: 600;
  padding-left: 0px;
  padding-right:0px;
}

.span {
  margin-top: 10px;
}
.pictures-card {
  margin: 0 auto;
  width: 100%;
  padding-right: 0px;
}
.pictures-section {
  text-align: center;
  margin-left: 0px;
  margin-bottom: 10px;
}
.edit_button{
  width:200px;
 background: #FFFFFF;
border: 1px solid #FF7C44;
box-sizing: border-box;
border-radius: 5px;
font-weight: 700;
}
.delete_button{
  width:200px;
 background: #FFFFFF;
border: 1px solid #9E1F63;
box-sizing: border-box;
border-radius: 5px;
font-weight: 700;
}
</style>

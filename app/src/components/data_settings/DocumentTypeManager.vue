  <template>
  <div class="q-pa-md">
    <div class="row">
      <h5 class="col-6">{{$options.name}}</h5>
      <div class="col-6 div-1">
        <q-btn
          color="info"
          no-caps
          :data-cy="'addtype'"
          :label="$t('button.add_type')"
          @click="newDoc()"
          :disable="hideAdd"
          class="add-button"
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

      <q-tab-panels
        v-model="langTab"
        class="bg-grey-2 inset-shadow "
        animated
      >
        <q-tab-panel
          v-for="language in languages"
          :key="language.lang"
          :name="language.name"
        >
          <!-- it seems that the following q-input causes a console error saying that he cannot read the property topic of undefined -->
          <HelpLabel
          :fieldLabel="$t('input_labels.doc_type')"
          :helpLabel ="$t('help.doc_type')"
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
            v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].document"
            :readonly="!(int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
            :label="$t('input_labels.doc_type_placeholder')"
          />
           <HelpLabel
          :fieldLabel="$t('input_labels.description')"
          :helpLabel ="$t('help.doc_type_description')"
          class="div-3"
          />
          
          <GlossaryEditor
            class="desc-editor"
            :readonly="!(int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
            v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
            :lang="language.lang"
            ref="editor"
          />
            <TranslateStateButton
              v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].translationState"
              :isForDefaultLanguage="language.lang===activeLanguage"
              :objectId="int_doc_shell.id"
              :readonly="!(language.lang===activeLanguage)"
              @micado-change="(id) => {
                changeTranslationState(int_doc_shell, id.state)
                int_doc_shell.pictures.forEach((pic)=>{
                  pic.hotspots.forEach((spot)=>{
                    changeTranslationState(spot, id.state)
                  })
                })
              }"
              @return-to-edit="(id) => {
                  changeTranslationState(int_doc_shell, id.state)
                  deleteTranslationProd(int_doc_shell.id)
                  int_doc_shell.published = false
                }"
            />
        </q-tab-panel>
      </q-tab-panels>
      <q-tabs
        v-model="langTab"
        dense
        class="bg-grey-2"
        active-color="accent"
        indicator-color="accent"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="language in languages"
          :key="language.lang"
          :name="language.name"
          :label="language.name"
        />
      </q-tabs>
          <HelpLabel
          :fieldLabel="$t('input_labels.issuer')"
          :helpLabel ="$t('help.issuer')"
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
            <div class="q-gutter-sm row">
               <HelpLabel
          :fieldLabel="$t('input_labels.validable')"
          :helpLabel ="$t('help.validable')"
          class="col-1.5 field"
          style="padding-top:10px"
          /> 
              <q-checkbox :disable="int_doc_shell.published" class=" col-1 div-3" color="accent" style="padding-top:10px" v-model="int_doc_shell.validable"  />
            </div>
            <HelpLabel
            v-if="int_doc_shell.validable" 
          :fieldLabel="$t('input_labels.validators')"
          :helpLabel ="$t('help.validators')"
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
       
          <q-card-section class="section">
            <HelpLabel
          :fieldLabel="$t('input_labels.icon')"
          :helpLabel ="$t('help.doc_type_icon')"
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
          <q-badge v-else></q-badge>
        </template>
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-img style="max-width:24px; max-heigth:24px" :src="scope.opt.value" />
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
          
        <q-card-section class="section">
          <HelpLabel
          :fieldLabel="$t('input_labels.doc_pics')"
          :helpLabel ="$t('help.doc_pics')"
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
          >

          </q-file>
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
        <q-card-section class="section">
           <HelpLabel
          :fieldLabel="$t('input_labels.upload_model')"
          :helpLabel ="$t('help.upload_model')"
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
          >

          </q-file>
          <q-item v-if="int_doc_shell.model" class="col-6">
        <q-item-section avatar>
          <q-icon  name="note_add"/>
        </q-item-section>
        <q-item-section>{{this.int_doc_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].document}} model</q-item-section>
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
        
       <div class="row">
        <div class="col-2" style="min-width:200px; ">
          <HelpLabel
            :fieldLabel="$t('button.validate_and_publish')"
            :helpLabel ="$t('help.is_published')"
            style="padding-left:17px"
          />
        </div>
        <div class="col" style="padding-top:2px">
          <q-toggle
            v-model="int_doc_shell.published"
            color="accent"
            :disable="int_doc_shell.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
            @input="isPublished($event, int_doc_shell.id)"
          />
        </div>
      </div>
      

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
        {{$t('input_labels.image')}}
      </q-item-section>
      <q-item-section class="col-6 flex flex-left  ">
        {{$t('input_labels.name')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top" >
        {{$t('input_labels.is_published')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top" >
        {{$t('input_labels.transl_state')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{$t('input_labels.edit')}}
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        {{$t('input_labels.delete')}}
      </q-item-section>
    </q-item>

    <q-list
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="document_type in document_types"
        :key="document_type.id"
      >
        <q-item-section class="col-1 ">
          <q-img
            :src="document_type.icon"
            spinner-color="white"
            id="image"
          />
        </q-item-section>
        <q-item-section class="col-6 flex flex-left ">{{document_type.translations.filter(filterTranslationModel(activeLanguage))[0].document}}</q-item-section>
        <q-item-section class="col-1 flex flex-center top" >
           <q-toggle
            v-model="document_type.published"
            color="accent"
            disable
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top" >
               {{getTranslationState(document_type.id)}}
            </q-item-section>
        <q-item-section class="col-1 flex flex-center top ">
          <q-icon
          :data-cy="'editdoc'.concat(document_type.id)"
            id="icon"
            name="img:statics/icons/Edit.png"
            size="md"
            @click.stop="editingDoc(document_type)"
          />
        </q-item-section>
        <q-item-section class="col-1  flex flex-center top">
          <q-icon
          :data-cy="'deletedoc'.concat(document_type.id)"
            name="img:statics/icons/Icon - Delete.svg"
            @click.stop="deletingDoc(document_type)"
            size="md"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">

    </q-card>
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
        fetchDocumentTypeIcons:'document_type/fetchDocumentTypeIcons'
      }
    })],
  components: {
    ListItem, 'v-hotspot': VueHotspot, GlossaryEditor,HelpLabel
  },
  data () {
    return {
      icons: DocumentTypeIcons,
      deleting_hotspots:[],
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
      this.$refs.doc_type[0].validate()
      console.log(this.$refs.icon.hasError)
      if (this.$refs.doc_type[0].hasError || this.$refs.icon.hasError ) {
        this.formHasError = true
         this.$q.notify({
          color: 'negative',
          message: 'You need to fill in the required fields first'
        })
        return false
      }
      else{
        console.log("in else of submit")
        this.savingDoc()
      }
    },
        onReset () {
       this.$refs.doc_type[0].validate()
       this.$refs.icon.validate()

       this.$refs.doc_type[0].resetValidation()
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
        message: 'Warning: Publishing the document type will make it visible on the migrant app and no changes will be possible before unpublishing. Proceed?',
        actions: [
          { label: 'Yes', color: 'accent', handler: () => { 
            this.updatePublished({doc:docs, published:event})
            this.saveTranslationProd(value)
            this.saveSpotTranslationProd(spots)
            this.cancelDoc()
             } },
          { label: 'No', color: 'red', handler: () => { 
            this.int_doc_shell.published = false } }
        ]
      })
       
      }
      else{
        this.$q.notify({
        type: 'warning',
        timeout:0,
        message: 'Warning: Unpublishing the document type will delete all existing translations and unpublish all related processes. Proceed?',
        actions: [
          { label: 'Yes', color: 'accent', handler: () => {
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
          { label: 'No', color: 'red', handler: () => { 
            this.int_doc_shell.published = true } }
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
        this.languages.forEach(l => {
          if (l.lang == this.activeLanguage) {
            hotspot_translations.push({ phtId: -1, lang: l.lang, title: spot.Title, message: spot.Message, translationState:this.int_doc_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].translationState })
          }
          else {
            hotspot_translations.push({ phtId: -1, lang: l.lang, title: '', message: '', translationState:this.int_doc_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].translationState  })
          }
        })
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
    editingDoc (doc) {
      this.isNew = false
      this.hideForm = false
      this.mergeDoc(doc)
      this.publishedOrig = doc.published
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
        message: 'Warning: Deleting a document type will also delete it from all the processes and steps where it appears. Proceed?',
        actions: [
          { label: 'Delete', color: 'red', handler: () => { 
             this.deleteDocumentType(payload)
              this.deleting_hotspots = [] } },
          { label: 'Back', color: 'accent', handler: () => { 
            console.log("not deleting")
           this.deleting_hotspots = [] } }
        ]
      })
     



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
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_doc_shell.translations.push({ id: -1, lang: l.lang, document: '', description: '', translationDate: null, translationState: 0 })
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

      doc.translations.forEach(doc => {
        console.log(doc)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_doc_shell.translations.length; i++) {
          if (this.int_doc_shell.translations[i].lang == doc.lang) {
            this.int_doc_shell.translations.splice(i, 1)
            this.int_doc_shell.translations.push(JSON.parse(JSON.stringify(doc)))
            break
          }
        }
      })
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
        this.saveDocumentType(this.int_doc_shell).then((doc) => {

          console.log("I am the saved document in the store")
          console.log(doc)
          this.order = 0
        }
        )
      }
      else {
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
  padding-right: 0px;
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
</style>

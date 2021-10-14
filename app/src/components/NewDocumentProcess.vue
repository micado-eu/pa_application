<template>
<div>
<div style="text-align:right">
<q-btn
  style="width:210px;border-radius: 5px;"
  :label="$t('button.new_doc_process')"
  color="secondary"
  no-caps
  unelevated
  padding="sm"
  @click="layout = true"
/>
</div>
<q-dialog v-model="layout" full-width>
       <q-layout view="Lhh lpR fff" container class="bg-white">
  <q-header class="bg-accent">
          <q-toolbar>
            <q-toolbar-title>{{$t('input_labels.add_doc_type')}}</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
  <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class=""
        >
          <HelpLabel
          :fieldLabel="$t('input_labels.doc_type')"
          :helpLabel ="$t('help.doc_type')"
          class="div-3"
          />
         
          <q-input
            outlined
            filled
            dense
            ref="doc_type_dialog"
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
            :label="$t('input_labels.doc_type_placeholder')"
         />
      <HelpLabel
          :fieldLabel="$t('input_labels.description')"
          :helpLabel ="$t('help.doc_type_description')"
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
        ref="icon_dialog"
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
            :fieldLabel="$t('translation_states.translatable')"
            :helpLabel ="$t('help.is_published')"
            style="padding-left:17px"
          />
        </div>
        <div class="col" style="padding-top:2px">

          <q-toggle
              :value="
                int_doc_shell.translations.filter(
                  (top) => top.translated == false
                )[0].translationState == 1
              "
              color="accent"
              @input="makeTranslatable($event)"
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
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import VueHotspot from 'vue-hotspot'
import DocumentTypeIcons from '../mixin/DocumentTypeIcons.json'
import translatedButtonMixin from '../mixin/translatedButtonMixin'
import HelpLabel from 'components/HelpLabel'



export default {
  // name: 'ComponentName',
  props: ['selected_process_comments'],
  mixins: [editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        tenants: 'tenant/tenants',
        document_types_icons:'document_type/document_types_icons'
      }, actions: {
        saveDocumentType: 'document_type/saveDocumentType',
        fetchTenants: 'tenant/fetchTenants',
        fetchDocumentTypeIcons:'document_type/fetchDocumentTypeIcons'
      }
    })],
  components: {
    'v-hotspot': VueHotspot, GlossaryEditor,HelpLabel
  },
  
  data () {
    return {
      layout:false,
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
  computed: {
    
  },
  methods:{
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
    
    onSubmit () {
      this.$refs.icon_dialog.validate()
      this.$refs.doc_type_dialog.validate()
      if (this.$refs.doc_type_dialog.hasError || this.$refs.icon_dialog.hasError ) {
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
       this.$refs.doc_type_dialog.validate()
       this.$refs.icon_dialog.validate()

       this.$refs.doc_type_dialog.resetValidation()
       this.$refs.icon_dialog.resetValidation()
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
      this.layout = false
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
          this.order = 0
          console.log(this.int_doc_shell)
        this.$q.loading.show({
        message: this.$t('input_labels.new_doc_typ_add')
      })

        setTimeout(() => {
          this.$q.loading.hide()
          this.$emit('new_doc', this.int_doc_shell)
          this.layout = false
        }, 1000)
            
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
      //this.createShell()
    },
    newDoc () {
      this.uploaded_images = []
      this.icon = null
      this.createShell()
      this.isNew = true
      //this.layout = true
      console.log(this.int_doc_shell)
      console.log("created shell and opened dialog")
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
  created(){
    this.newDoc()
        this.fetchTenants().then((tenants)=>{
      console.log(tenants)
      tenants.forEach((tenant)=>{
        this.validatorList.push({
          label: tenant.name,
          value:tenant.id
        })

      })
    })
        this.fetchDocumentTypeIcons()

  }
}
</script>
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
<template>
<div style="text-align:center;padding-top:30px">
   <q-tabs
          v-model="langTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
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
        <q-tab-panels
          v-model="langTab"
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
  <div class=" q-pa-lg" style="display:inline-block; border-width:1px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; padding-top:0px; width:750px;">
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px ">
      <div class="col-4" style="padding-left:40px; padding-top:30px">
        <h5 style="text-align:left;font-size:18px"> Document icon </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
       <q-file 
      
    >
     <template v-slot:append>
            <q-icon name="attachment" />
          </template>
  </q-file> 
      </div>
    </div>
    <div class="row" style="padding-bottom:15px;padding-right:45px" >
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document type description </h5>
      </div>
      <div class="col-8" style="display: block;">
        <q-input type="textarea" bg-color="grey-3" rounded standout outlined v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].description"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center; padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document type  </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input bg-color="grey-3" dense rounded standout outlined v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].document"  />
      </div>
    </div>
    
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document Issuer </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="int_doc_shell.issuer"  />
      </div>
    </div>
    
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Valididty duration </h5>
      </div>
      <div class="col-1" style="margin-top:25px;display: block;">
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="int_doc_shell.validityDuration"  />
      </div>
      <div class="col-2" style="margin: auto;display: block;">
      <h5 style="text-align:left;font-size:18px"> Days </h5>
      </div>
       <div class="col-4" style="width:50px">
        <h5 style="text-align:left;font-size:18px"> Validable?</h5>
      </div>
      <div class="col-1" style="margin: auto;display: block;">
        <q-checkbox color="accent" v-model="int_doc_shell.validable" clickable @click="int_doc_shell.validable=!int_doc_shell.validable"/>
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document model </h5>
      </div>
      <div class="col-6" style="margin: auto;display: block;">
        <q-file  @input="getFiles" bg-color="grey-3" dense rounded standout outlined >
         
        </q-file>
        </div>
        <div class="col" style="width:150px; height:100px: padding-right:45px; padding-left:15px">
        <q-img
      :src="myimage"
      spinner-color="white"
      style="max-height: 100px; max-width: 150px"
      @click="hotimage = true" 
    />
    <q-dialog v-model="hotimage">
      <q-card>
        <v-hotspot
    :init-options="hotspotConfig"
    @save-data="saveData"
    @after-delete="afterDelete" />

      </q-card>
      </q-dialog>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="q-pa-md col-6" style="text-align:right">
    <q-btn class="button" unelevated rounded label="Cancel" style="width:100px; border-radius:2px" to="/data_settings"/>
    </div>
    <div class=" q-pa-md col-6" style="text-align:left">
    <q-btn color="accent" unelevated rounded label="Save/Update" style="width:150px; border-radius:2px" @click="saveData(int_doc_shell)" to="/data_settings"/>
    </div>
    </div>
    </q-tab-panel>
        </q-tab-panels>
</div>
</template>

<script>
import VueHotspot from 'vue-hotspot'
import axios from 'axios'
import https from 'https';
import editEntityMixin from '../../mixin/editEntityMixin'

export default {
  name: 'PageIndex',
  components: {     'v-hotspot': VueHotspot },
  props: ["thedocumenttype"],
  mixins: [editEntityMixin],
  data (){
    return {
      id:this.$route.params.id,
      is_new: true, 
      int_doc_shell: 
      { 
        id: -1, issuer: null, translations: [], icon: "", model:null, validable:false, validityDuration:-1, published: false, publicationDate: null,
      },
      checked: true,
      hotimage: false,
      myimage: null,
      hotspotConfig: {
        image: null,
        editable: true,
        interactivity: 'hover',
        data: [
          { Message: 'A prepopulated hotspot', Title: 'Vue Hotspot 1', x: 33.3, y: 58.33 },
          { Message: 'Another prepopulated hotspot', Title: 'Vue Hotspot 2', x: 53.3, y: 78.3 }
        ],
        hotspotColor: '#85ce61',
        messageBoxColor: '#409eff',
        textColor: '#333',
        opacity: 0.9
      }
    }
  },
  computed: {
    document_types : {
      get (){
      return this.$store.state.document_type.document_type
      }
    },
  },
  methods: {
      getFiles(files){
        console.log(files);
        console.log(this)

        console.log(self)

        let reader = new FileReader()

          // Convert the file to base64 text
        reader.readAsDataURL(files)

        // on reader load somthing...
        reader.onload = () => {

          // Make a fileInfo Object
          let fileInfo = {
            name: files.name,
            type: files.type,
            size: Math.round(files.size / 1000)+' kB',
            base64: reader.result,
            file: files
          }
          this.myimage = fileInfo.base64
          this.hotspotConfig.image = fileInfo.base64
          console.log(fileInfo)
        }
      },
      createShell () {
      this.int_doc_shell = { id: -1, issuer: null, translations: [], pictures:[{id:-1, image: "string", documentTypeId:-1, oder:0}], icon: "", model:null, validable:false, validityDuration:-1, published: false, publicationDate: null, }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_doc_shell.translations.push({ id: -1, lang: l.lang, document: '', description: '', translationDate: null })
      });
      },
     
  
  mergeDoc (doc) {
      console.log(doc)
      this.int_doc_shell.id = doc.id
      this.int_doc_shell.icon = doc.icon
      this.int_doc_shell.published = doc.published
      this.int_doc_shell.publicationDate = doc.publicationDate
      this.int_doc_shell.issuer = doc.issuer
      this.int_doc_shell.model = doc.model
      this.int_doc_shell.validable = doc.validable
      this.int_doc_shell.validityDuration = doc.validityDuration
      this.int_doc_shell.pictures = doc.pictures
      doc.translations.forEach(doc => {
        console.log(doc)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_doc_shell.translations.length; i++) {
          if (this.int_doc_shell.translations[i].lang == doc.lang) {
            this.int_doc_shell.translations.splice(i, 1);
            this.int_doc_shell.translations.push(JSON.parse(JSON.stringify(doc)))
            break;
          }
        }
      });
      console.log("after merge")
      console.log(this.int_doc_shell)


    },
      saveData (value) {
        if(this.is_new){
          this.$store.dispatch('document_type/saveDocumentType', value)
          console.log(this.$store.state.document_type)
        }
        else{
          this.$store.dispatch('document_type/editDocumentType', value);
      console.log(value)
      console.log(this.document_types)
      console.log(this.$store.state.document_type)
        }
      },
     
      afterDelete () {
        // Do something after delete
        console.log('Do something after delete ...')
      } 
    }, 
     created () {
      this.createShell()
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('document_type/fetchDocumentType')
      .then(document_types => {
        this.loading = false
        console.log("i am document types")
       console.log(document_types)
       }
       )
           if (this.thedocumenttype != null) {
      this.mergeDoc(this.thedocumenttype)
      console.log(this.int_doc_shell)
      this.is_new = false
    }
    else{
      
      console.log("in else")
      console.log(this.int_doc_shell)
    
    this.mergeDoc(this.int_doc_shell)
    console.log("after merge in else")
    console.log(this.int_doc_shell)
    
    }

  
     }
     
 
}
</script>
<style scoped>
.button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
</style>

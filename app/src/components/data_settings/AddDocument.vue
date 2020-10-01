<template>
<div id="div-1">
      
  <div class=" q-pa-lg div-2">
      <q-tab-panels
          v-model="langTab"
          class="bg-grey-2 inset-shadow margin "
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
  <div class=" q-pa-xsm row div-7">
      <div class="col-4 div-6" >
        <h5  class="header"> Document type  </h5>
      </div>
      <div class="col-8 div-5" >
        <q-input :rules="[ val => val.length <= 50 || 'Please use maximum 50 characters']" bg-color="grey-3" dense rounded standout outlined v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].document"  />
      </div>
    </div>
    <div class="row div-7" >
      <div class="col-4 div-6">
        <h5 class="header"> Document type description </h5>
      </div>
      <div class="col-8 div-9" >
        <GlossaryEditor
        class="desc-editor"
        v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
        :lang="language.lang"
        ref="editor" />
      </div>
    </div>
     </q-tab-panel>
        </q-tab-panels>
    <q-separator />
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
      <div class=" q-pa-xsm row div-3">
      <div class="col-4 div-4" >
        <h5 class="header" > Document icon </h5>
      </div>
      <div class="col-8 div-5">
       <q-file>
     <template v-slot:append>
            <q-icon name="attachment" />
          </template>
  </q-file> 
      </div>
    </div>
    <div class=" q-pa-xsm row div-7" >
      <div class="col-4 div-6">
        <h5  class="header"> Document Issuer </h5>
      </div>
      <div class="col-8 div-5" >
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="int_doc_shell.issuer"  />
      </div>
    </div>
    
    <div class=" q-pa-xsm row div-7">
      <div class="col-4 div-6">
        <h5  class="header"> Validity duration </h5>
      </div>
      <div class="col-1 div-8" >
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="int_doc_shell.validityDuration"  />
      </div>
      <div class="col-2 div-5">
      <h5  class="header"> Days </h5>
      </div>
       <div class="col-4 div-10" >
        <h5  class="header"> Validable?</h5>
      </div>
      <div class="col-1 div-5" >
        <q-checkbox color="accent" v-model="int_doc_shell.validable" clickable @click="int_doc_shell.validable=!int_doc_shell.validable"/>
      </div>
    </div>
      <div class=" q-pa-xsm row div-7">
      <div class="col-4 div-6" >
        <h5  class="header"> Document model </h5>
      </div>
      <div class="col-6 div-5" >
        <q-file   bg-color="grey-3" dense rounded standout outlined > 
        </q-file>
        </div>
      <!--  <div class="col div-11" >
        <q-img
      :src="myimage"
      spinner-color="white"
      id="image"
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
      </div>-->
    </div>
    <div class=" q-pa-xsm row div-7">
      <div class="col-4 div-6" >
        <h5  class="header"> Document pictures </h5>
      </div>
      <div class="col-6 div-5" >
        <q-file  @input="getFiles($event)" bg-color="grey-3" dense multiple rounded standout outlined >
         
        </q-file>
        </div>
        <div class="div-11"  v-for="image in uploaded_images" :key="image" >
        <q-img
      :src="image"
      spinner-color="white"
      class="image"
      @click="addHotspot(image)" 
    />
    <span class="span">
            <q-btn  no-caps rounded class="negative-button" filled color="accent" @click="removePicture(image)"  :label="$t('button.remove')" />
            </span>     
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
    <div class="q-pa-md col-6 div-12">
    <q-btn 
    class="delete-button" 
    unelevated 
    rounded 
    :label="$t('button.cancel')"  
    to="/data_settings/document_types"/>
    </div>
    <div class=" q-pa-md col-6 div-13">
    <q-btn 
    class="button" 
    color="accent" 
    unelevated 
    rounded 
    :label="$t('button.save')" 
    @click="saveData(int_doc_shell)" 
    to="/data_settings/document_types"/>
    </div>
    </div>
   
</div>
</template>

<script>
import VueHotspot from 'vue-hotspot'
import axios from 'axios'
import https from 'https';
import editEntityMixin from '../../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import storeMappingMixin from '../../mixin/storeMappingMixin'



export default {
  name: 'PageIndex',
  components: {     'v-hotspot': VueHotspot, GlossaryEditor },
  props: ["thedocumenttypeid"],
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      document_types: 'document_type/document_types'
    }, actions: {
      saveDocumentType: 'document_type/saveDocumentType',
      fetchDocumentType: 'document_type/fetchDocumentType',
      editDocumentType: 'document_type/editDocumentType'
  }
  })],
  data (){
    return {
      id:this.$route.params.id,
      is_new: true, 
      uploaded_images:[],
      int_doc_shell: 
      { 
        id: -1, issuer: null, translations: [], icon: "", model:null, validable:false, validityDuration:-1
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

  methods: {
      getFiles(files){
        console.log(files);
        console.log(this)

        console.log(self)

        let reader = new FileReader()

          // Convert the file to base64 text
        reader.readAsDataURL(files[0])

        // on reader load somthing...
        reader.onload = () => {

          // Make a fileInfo Object
          let fileInfo = {
            name: files[0].name,
            type: files[0].type,
            size: Math.round(files[0].size / 1000)+' kB',
            base64: reader.result,
            file: files[0]
          }
          this.uploaded_images.push(fileInfo.base64)
          console.log(this.uploaded_images)
          this.int_doc_shell.pictures.push({
          id:-1,
          image: fileInfo.base64,
          documentTypeId: -1,
          order: null
        })
          this.myimage = fileInfo.base64
          this.hotspotConfig.image = fileInfo.base64
          console.log(fileInfo)
        }
      },
      createShell () {
      this.int_doc_shell = { id: -1, issuer: null, translations: [], pictures:[], icon: "", model:null, validable:false, validityDuration:-1 }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_doc_shell.translations.push({ id: -1, lang: l.lang, document: '', description: '', translationDate: null })
      });
      },
     addHotspot(picture){
       var selected_picture = this.uploaded_images.filter((pic)=>{
         console.log(pic == String(picture))
         return pic == String(picture)
       })[0]
        this.hotspotConfig.image = selected_picture
       this.hotimage = true
     },
  
  mergeDoc (doc) {
      console.log(doc)
      this.int_doc_shell.id = doc.id
      this.int_doc_shell.icon = doc.icon
      //this.int_doc_shell.published = doc.published
      //this.int_doc_shell.publicationDate = doc.publicationDate
      this.int_doc_shell.issuer = doc.issuer
      this.int_doc_shell.model = doc.model
      this.int_doc_shell.validable = doc.validable
      this.int_doc_shell.validityDuration = doc.validityDuration
      if(doc.pictures != null){
        this.int_doc_shell.pictures = doc.pictures
      }
      else{
        this.int_doc_shell.pictures = []
      }
      
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
    removePicture(image){
     var idx =  this.uploaded_images.findIndex(an_image => an_image === image)
     this.uploaded_images.splice(idx, 1)
     console.log(this.uploaded_images)
     var doc_idx = this.int_doc_shell.pictures.findIndex(an_image => an_image.image === image)
     this.int_doc_shell.pictures.splice(doc_idx, 1)
     console.log(this.int_doc_shell.pictures)
    },
      saveData (value) {
        if(this.is_new){
          console.log("I am the document")
          console.log(value)
          this.saveDocumentType(value)
          //this.$store.dispatch('document_type/saveDocumentType', value)
          console.log(this.$store.state.document_type)
        }
        else{
          this.editDocumentType(value)
          //this.$store.dispatch('document_type/editDocumentType', value);
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
    this.fetchDocumentType()
    //this.$store.dispatch('document_type/fetchDocumentType')
      .then(document_types => {
        this.loading = false
        console.log("i am document types")
       console.log(document_types)
       }
       )
      if (this.thedocumenttypeid != null) {
      var filtered_type = this.document_types.filter((the_doc_type)=>{
        return the_doc_type.id == this.thedocumenttypeid
      })[0]
      this.mergeDoc(filtered_type)
      this.int_doc_shell.pictures.forEach((a_picture) => {
        this.uploaded_images.push(a_picture.image)       
      })
      console.log(this.uploaded_images)
      console.log(this.int_doc_shell)
      this.is_new = false
    }
  

  
     }
     
 
}
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
  width:100px; 
  border-radius:2px
}
.button{
  width:150px; 
  border-radius:2px
}
#div-1{
text-align:center;
padding-top:30px
}
.div-2{
display:inline-block; 
border-width:1px; 
border-color:#0f3a5d; 
border-radius: 1.95rem;
border-style: solid; 
padding-top:0px; 
width:750px;
}
.div-3{
  text-align:center;
  padding-right:45px
}
.div-4{
  padding-left:40px; 
  padding-top:30px
}
.header{
  text-align:left;
  font-size:18px
}
.div-5{
margin: auto;
display: block;
}
.div-6{
  padding-left: 40px;
}
.div-7{
  text-align:center;
  padding-right:45px
}
.div-8{
margin-top:25px;
display: block;
}
.div-9{
display: block;
}
.div-10{
  width:50px
}
.div-11{
  width:150px;
  padding-right:45px;
  padding-left:15px
}
.image{
  max-height: 100px; 
  max-width: 150px
}
.div-12{
  text-align:right
}
.div-13{
  text-align:left
}
.margin{
  margin-top:20px
}
</style>

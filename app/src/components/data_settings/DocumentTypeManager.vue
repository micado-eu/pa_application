  <template>
   <div class="q-pa-md">
    <div class="row">
    <h5 class="col-6">{{$options.name}}</h5>
    <div class="col-6 div-1" >
     <q-btn
          color="info"
          no-caps
          :label="$t('button.add_type')"
          @click="newDoc()"
          :disable="hideAdd"
          id="add-button"
        />
  </div>
    </div>
    <q-card class="q-pa-xl div-2" :hidden="hideForm">
       
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
            <div class="div-3"> {{$t('input_labels.doc_type')}} </div>
            <q-input
              outlined
              filled
              dense
              maxlength="20"
              :rules="[ val => val.length <= 20 || 'Please use maximum 20 characters']"
              v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].document"
              :label="$t('input_labels.doc_type_placeholder')"
            />
            <div class="div-3"> {{$t('input_labels.description')}} </div>
          <GlossaryEditor
            class="desc-editor"
            v-model="int_doc_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
            :lang="language.lang"
            ref="editor"
          />
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
        <div class="div-3" style="padding-top:10px"> {{$t('input_labels.issuer')}} </div>
            <q-input
              outlined
              filled
              dense
              maxlength="20"
              v-model="int_doc_shell.issuer"
              :label="$t('input_labels.issuer')"
            />
       <q-card class="my-card">
          <q-card-section class="section">
              <div class="field"> {{$t('input_labels.icon')}} </div>
            <q-file
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
            </q-card>
          </q-card-section>
          <q-card-section class="section">
            <div class="field"> {{$t('input_labels.doc_pics')}} </div>
            <q-file
              @input="getFilesPics($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_doc_pics')"
              standout
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
            <q-dialog v-model="hotimage" @hide="hotspotConfig.data = []">
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
            <div class="field"> {{$t('input_labels.upload_model')}} </div>
            <q-file
              @input="getFilesModel($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_model')"
              standout
              outlined
              accept=".pdf" 
              @rejected="onRejected"
            >

            </q-file>
        </q-card-section>
        </q-card>
        
        <hr id="hr">
          <q-btn
          no-caps
          class="delete-button"
          unelevated
          rounded
          :label="$t('button.cancel')"
          @click="cancelDoc()"
        />
        <q-btn
          no-caps
          color="accent"
          unelevated
          rounded
          :label="$t('button.save')"
          class="button"
          @click="savingDoc()"
        />
      

      </q-card>
      <div class="row div-4">
    <div class="col-1 flex flex-left">
      {{$t('input_labels.image')}}
    </div>
    <div class="col-8 flex flex-left">
      {{$t('input_labels.name')}}
    </div>
    <div class="col-1 flex flex-left">
      <!--{{$t('input_labels.is_published')}}-->
    </div>
    <div class="col-1 flex flex-center div-5">
      {{$t('input_labels.edit')}}
    </div> 
    <div class="col-1 flex flex-center div-6" >
      {{$t('input_labels.delete')}}
    </div>
      </div>

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
        <q-item-section class="col-1 flex flex-left">
          <q-img
            :src="document_type.icon"
            spinner-color="white"
            id="image"
          />
        </q-item-section>
        <q-item-section class="col-8 flex flex-left section">{{document_type.translations.filter(filterTranslationModel(activeLanguage))[0].document}}</q-item-section>
        <q-item-section class="col-1 flex flex-left">
         <!-- <q-toggle
            v-model="a_topic.published"
            color="green"
            disable
          />-->
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          <q-icon id="icon" name="img:statics/icons/Edit.png" size="md" @click.stop="editingDoc(document_type)" />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center" >
         <q-icon  name="img:statics/icons/Icon - Delete.svg"  @click.stop="deletingDoc(document_type)" size="md" />
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
import ListItem from "./ListItem";
import editEntityMixin from '../../mixin/editEntityMixin'
import storeMappingMixin from '../../mixin/storeMappingMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import VueHotspot from 'vue-hotspot'



export default {
  name: "DocumentTypeManager",
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      document_types: 'document_type/document_types',
      hotspots: 'picture_hotspots/hotspots'
    }, actions: {
      deleteDocumentType: 'document_type/deleteDocumentType',
      fetchDocumentType: 'document_type/fetchDocumentType',
      saveDocumentType: 'document_type/saveDocumentType',
      editDocumentType: 'document_type/editDocumentType',
      fetchHotspots: 'picture_hotspots/fetchHotspots',
      fetchHotspotsById: 'picture_hotspots/fetchHotspotsById'
  }
  })],
  components: {
    ListItem, 'v-hotspot': VueHotspot, GlossaryEditor
  },
  data() {
    return {
      deleting_hotspots:[],
      hideForm: true,
      hideAdd: false,
      isNew: false,
      uploaded_images:[],
      int_doc_shell: 
      { 
        id: -1, issuer: null, translations: [], icon: "", model:null, validable:false
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
      icon:null
    }
  },
  
  methods: {
    saveHotspot(value){
      console.log("saving hotspot")
      console.log(value)
      console.log(value[0].x)
      console.log(Math.floor(value[0].y))
      var the_picture = this.int_doc_shell.pictures.filter((pic)=>{
          return pic.image == this.hotspotConfig.image
        })[0]
      value.forEach((spot) => {
        var hotspot_translations = []
        this.languages.forEach(l => {
        if(l.lang == this.activeLanguage){
        hotspot_translations.push({ phtId: -1, lang: l.lang, title: spot.Title, message: spot.Message })
        }
        else{
          hotspot_translations.push({ phtId: -1, lang: l.lang, title: '', message: '' })
        }
      });
      console.log(spot)
        the_picture.hotspots.push({
          id:-1,
          x : Math.floor(spot.x),
          y : Math.floor(spot.y),
          pictureId : the_picture.id,
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
      this.isNew = false;
      this.hideForm = false;
      this.mergeDoc(doc)
    },
    deletingDoc (doc) {
      //we will need to filter through the hotspots and send those to because they need to be deleted and we can't delete 
      //hotspots translations without having hotspots ids
      console.log(doc)
      if(doc.pictures){
          console.log(doc.pictures)

      doc.pictures.forEach((pic) =>{
        var spots = this.hotspots.filter((spot)=>{
          return spot.pictureId == pic.id
        })[0]
        if(spots!= null){
        this.deleting_hotspots.push(spots)
        }
        })
      
      console.log("i am deleting hotspots")
      console.log(this.deleting_hotspots)
      }
    
      //this.$store.dispatch("topic/deleteTopic", index);
      var payload = {index:doc.id, hotspots:this.deleting_hotspots}
      console.log(payload.hotspots.length != 0)
     this.deleteDocumentType(payload)
      this.deleting_hotspots=[]
      
      
      
    },
    removeIcon(){
      this.icon = null
      this.int_doc_shell.icon = ''
    },
    cancelDoc () {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
      this.uploaded_images=[]
      this.icon= null
    },
    onRejected(rejectedEntries){
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
        this.int_doc_shell.icon= fileInfo.base64
        console.log(fileInfo)
      }
    },
    getFilesModel (files) {
      console.log(files)
      console.log(this)
      console.log(self)
      console.log("getting model")

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
    getFilesPics(files) {
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
          order: null,
          hotspots:[]
        })
        this.myimage = fileInfo.base64
        this.hotspotConfig.image = fileInfo.base64
        console.log(fileInfo)
      }
    },
      createShell () {
      this.int_doc_shell = { id: -1, issuer: null, translations: [], pictures:[], icon: "", model:null, validable:false }
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
      console.log("this is the selected pic")
      console.log(selected_picture)

        this.hotspotConfig.image = selected_picture
      console.log("this is the do shell I'm working on")
      console.log(this.int_doc_shell)
        var spots = this.int_doc_shell.pictures.filter((the_pic) =>{
          console.log("i am picture in filter")
          console.log(the_pic)
          return the_pic.image == String(picture)
        })[0].hotspots
        if(spots.length !=0){
          console.log("These are the spots")
        console.log(spots)
        spots.forEach((spot)=>{
          var message = spot.translations.filter((transl)=>{
            return transl.lang == this.activeLanguage
          })[0]
          this.hotspotConfig.data.push({
            Message:message.message,
            Title:message.title,
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
      //this.int_doc_shell.published = doc.published
      //this.int_doc_shell.publicationDate = doc.publicationDate
      this.int_doc_shell.issuer = doc.issuer
      this.int_doc_shell.model = doc.model
      this.int_doc_shell.validable = doc.validable
      if(doc.pictures != null){
        this.int_doc_shell.pictures = doc.pictures
        this.int_doc_shell.pictures.forEach((pic)=>{
          console.log("in int doc picture foreach")
          pic.hotspots = []
          this.fetchHotspotsById(pic.id).then((spots) => {
            console.log("after fetch spots")
            console.log(spots)
            pic.hotspots = spots
          })
        })
      }
      else{
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
      savingDoc () {
        if(this.isNew){
          console.log("I am the document")
          console.log(this.int_doc_shell)
          this.saveDocumentType(this.int_doc_shell).then((doc)=>{
            console.log("I am the saved document in the store")
            console.log(doc)
          }
        )
        }
        else{
          this.editDocumentType(this.int_doc_shell)
          //this.$store.dispatch('document_type/editDocumentType', value);
          console.log("In edit")
      console.log(this.int_doc_shell)
    
        }
      
      this.uploaded_images=[]
      this.icon= null
      this.hideAdd = false
      this.hideForm = true;
      this.createShell()
      },
       newDoc(){
      this.uploaded_images = []
      this.icon = null
      this.createShell()
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    onClickTitle: function() {
      this.$emit("scroll", "#" + this.$options.name);
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
        return element.lang == currentLang;
      }
  }
    },
   
  created() {
    this.createShell()
    this.fetchHotspots()
    this.loading = true;
    console.log(this.$store);
    this.fetchDocumentType()
      .then(document_types => {
        this.loading = false;
              });
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
  width:100px;
  border-radius:2px;
  margin-right:15px; 
  margin-left:10px; 
  margin-top:30px
}
h5 {
  font-weight: bold;
}
.div-1{
  margin-top:40px;
  margin-bottom:40px; 
  text-align:right
}
.div-2{
  margin-bottom:100px
}
#add-button{
  width:200px;
}
.button{
  width:100px;
  border-radius:2px;
  margin-top:30px
}
.div-3{
  font-size:16px; 
  font-weight:600; 
  
}
#hr{
  margin-left:15px;
  margin-right:15px;
  border: 1px solid #DADADA
}
.div-4{
padding-left:20px; 
padding-bottom:10px
}
.div-5{
padding-left:10px
}
.div-6{
padding-left:30px
}
#image{
  height: 40px; 
  max-width: 40px
}
.section{
  font-size:16px; 
  font-weight:600
}
#icon{
  margin-right:10px;
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

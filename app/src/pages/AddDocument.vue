<template>
<div style="text-align:center;padding-top:30px">
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
    </q-dialog>
      </div>
    </div>
    <div class="row" style="padding-bottom:15px;padding-right:45px" >
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document type description </h5>
      </div>
      <div class="col-8" style="display: block;">
        <q-input type="textarea" bg-color="grey-3" rounded standout outlined v-model="the_document_type.description" />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center; padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document type  </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input bg-color="grey-3" dense rounded standout outlined v-model="the_document_type.type"  />
      </div>
    </div>
    
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document Issuer </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="the_document_type.issuer"  />
      </div>
    </div>
    
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Valididty duration </h5>
      </div>
      <div class="col-1" style="margin-top:25px;display: block;">
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="the_document_type.validity"  />
      </div>
      <div class="col-2" style="margin: auto;display: block;">
      <h5 style="text-align:left;font-size:18px"> Days </h5>
      </div>
       <div class="col-4" style="width:50px">
        <h5 style="text-align:left;font-size:18px"> Validable?</h5>
      </div>
      <div class="col-1" style="margin: auto;display: block;">
        <q-checkbox color="accent" v-model="the_document_type.validable" clickable @click="the_document_type.validable=!the_document_type.validable"/>
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document model </h5>
      </div>
      <div class="col-6" style="margin: auto;display: block;">
        <q-file  @input="getFiles" bg-color="grey-3" dense rounded standout outlined v-model="the_document_type.model">
         
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
    <q-btn color="accent" unelevated rounded label="Cancel" style="width:100px" to="/document_type"/>
    </div>
    <div class=" q-pa-md col-6" style="text-align:left">
    <q-btn color="info" unelevated rounded label="Save/Update" style="width:150px" to="/document_type"/>
    </div>
    </div>
</div>
</template>

<script>
import VueHotspot from 'vue-hotspot'

export default {
  name: 'PageIndex',
  components: {     'v-hotspot': VueHotspot },

  data (){
    return {
      id:this.$route.params.id,
      new: {
        type:"",
        description:"", 
        image:"", 
        issuer:"", 
        validable:false, 
        validity:"",
        icon:"", 
        model:""
      },
       edit: {
        type:"",
        description:"", 
        image:"", 
        issuer:"", 
        validable:false, 
        validity:"",
        icon:"", 
        model:""
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
    document_types () {
      return this.$store.state.document_type.document_type
    },

    the_document_type(){
      if(this.id != null){
        for(var i = 0; i< this.document_types.length; i++){
          if(this.document_types[i].id == this.id){
             this.edit = this.document_types[i] 
            return this.edit
          }
        }
      }
      else{
            console.log(this.edit)
            return this.new
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
      saveData (data) {
        // Do something with the list of hotspots
        console.log(data)
      },
      afterDelete () {
        // Do something after delete
        console.log('Do something after delete ...')
      }
    }, 
     created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('document_type/fetchDocument_type')
      .then(document_types => {
        this.loading = false
      })  
  }
 
}
</script>
<style scoped>

</style>

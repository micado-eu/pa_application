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
      </div>
    </div>
    <div class="row" style="padding-bottom:15px;padding-right:45px" >
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document type description </h5>
      </div>
      <div class="col-8" style="display: block;">
        <q-input type="textarea" bg-color="grey-3" rounded standout outlined v-model="edit_document.description"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center; padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document type  </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input bg-color="grey-3" dense rounded standout outlined v-model="edit_document.type"  />
      </div>
    </div>
    
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Document Issuer </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="edit_document.issuer"  />
      </div>
    </div>
    
    <div class=" q-pa-xsm row" style="text-align:center;padding-right:45px">
      <div class="col-4" style="padding-left:40px;">
        <h5 style="text-align:left;font-size:18px"> Valididty duration </h5>
      </div>
      <div class="col-1" style="margin-top:25px;display: block;">
        <q-input dense bg-color="grey-3" rounded standout outlined v-model="edit_document.validity"  />
      </div>
      <div class="col-2" style="margin: auto;display: block;">
      <h5 style="text-align:left;font-size:18px"> Days </h5>
      </div>
       <div class="col-4" style="width:50px">
        <h5 style="text-align:left;font-size:18px"> Validable?</h5>
      </div>
      <div class="col-1" style="margin: auto;display: block;">
        <q-checkbox color="accent" v-model="edit_document.validable" clickable @click="edit_document.validable=!edit_document.validable"/>
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
    <q-btn color="accent" unelevated rounded label="Cancel" style="width:100px" to="/document_type"/>
    </div>
    <div class=" q-pa-md col-6" style="text-align:left">
    <q-btn color="info" unelevated rounded label="Save/Update" style="width:150px" @click="saveData(edit_document)" to="/document_type"/>
    </div>
    </div>
</div>
</template>

<script>
import VueHotspot from 'vue-hotspot'
import axios from 'axios'
import https from 'https';

export default {
  name: 'PageIndex',
  components: {     'v-hotspot': VueHotspot },

  data (){
    return {
      id:this.$route.params.id,
      is_new: true, 
      edit_document: {
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
    document_types : {
      get (){
      return this.$store.state.document_type.document_type
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
          
      const agent = new https.Agent({
        rejectUnauthorized: false
      });

      axios
      .post('https://api.micadoproject.eu/db/v01/placeholder',
           {
             "id": this.id,
             "features": this.edit_document
           },
           {
//             httpsAgent: agent ,
             headers: {
                        Prefer: 'resolution=merge-duplicates',
                        "Content-Type": 'application/json',
                        Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlpqUm1ZVE13TlRKak9XVTVNbUl6TWpnek5ESTNZMkl5TW1JeVkyRXpNamRoWmpWaU1qYzBaZz09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJNaWdyYW50QXBwbGljYXRpb24iLCJpZCI6MSwidXVpZCI6bnVsbH0sInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9nYXRld2F5Lm1pY2Fkb3Byb2plY3QuZXU6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiQnJvbnplIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlBvc3RnUkVTVEFQSSIsImNvbnRleHQiOiJcL2RiXC92MDEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MDEiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn1dLCJjb25zdW1lcktleSI6InZabFNMbTFnYzVOMzIxbnRIN2Ztd2tONTNvVWEiLCJleHAiOjM3MzAyOTc0MzgsImlhdCI6MTU4MjgxMzc5MSwianRpIjoiYmYyMjBiYjMtNjY3MC00OTA5LWI4OTctOTY2ZDVhZDdhN2M0In0.GORnM7Hfflrv8iNFbBOZoLg7475tnLaXwY2f88My_qVCAupJxqPihM901E5GNQUsL2I7PW9_ymbCPJki0FuaIhdXk4ovso11ghjWDkVH9fUoMm_FElNynOlWp7gPDwtXbS5sNI2nZHflvUmc9IYG70XJG6tWhg4hI8bW0sNr03gkQOjQzbUqSqHb__J_oLJye1IGi657oJUtXnVLSDfRHOKl7w8SATrSiR_K57SkT4xGmpLqYGmbXsoWFJT-FHe1-WVrGBvwk2kqZfjgjDUoUedrDR0F9T_YrVIuPtruGqR4gJGWBuXPciOSHYsGu12Oxg3zC1FwoptN0NA2AZ-oTg' //the token is a variable which holds the token
                       }
           })
      .then(
        console.log(this.edit_document)
      ).catch(function (err) {

        // Run into big problems when I get an error
        console.log("Got an error calling API manager: ", err);
        response => []
      })
      console.log("posted")
        }
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
      if(this.id != null){
         console.log("ciso ")
        this.is_new=false
        console.log("hello")
         var filteredDocuments = this.document_types.filter((filt) => {
          console.log("in fil")
          console.log(filt)
          console.log(filt.id == this.id)
          return filt.id == this.id
        
         })  
         this.edit_document = Object.assign({},filteredDocuments[0]);
        console.log(this.edit_document)
         
    }
      
  }
 
}
</script>
<style scoped>

</style>

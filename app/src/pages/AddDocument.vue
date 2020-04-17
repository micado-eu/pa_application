<template>
<div>
  <div class=" q-pa-lg" style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document type </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document type description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document icon </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-file 
    @input="getFiles">
  </q-file><q-img
      :src="myimage"
      spinner-color="white"
      style="height: 140px; max-width: 150px"
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
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document Issuer </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Validable </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-checkbox color="accent" v-model="checked" clickable @click="this.checked=!this.checked"/>
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Valididty duration </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document model </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-file rounded standout outlined v-model="model">
          <template v-slot:append>
            <q-icon name="attachment" />
          </template>
        </q-file>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="q-pa-md col-6" style="text-align:right">
    <q-btn color="red" label="Save" style="width:100px" to="/placeholder"/>
    </div>
    <div class=" q-pa-md col-6" style="text-align:left">
    <q-btn color="red" label="Back" style="width:100px" to="/document_type"/>
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
    }
 
}
</script>
<style scoped>

</style>

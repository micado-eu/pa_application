<template>
    <q-card class="my-card">
          <q-card-section class="section">
            <HelpLabel
          :fieldLabel="$t('input_labels.upload_icon')"
          :helpLabel ="this.label"
          class="field"
          style="padding-top:10px"
          />
            
            <q-file
              @input="getFiles($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_icon')"
              standout
              outlined
              :disable="this.published"
              accept=".jpg, image/*" 
              @rejected="onRejected"
            >

            </q-file>
            <q-img
            v-if="this.Image!=null"
              :src="this.Image"
              spinner-color="white"
              class="image"
            />
          </q-card-section>
     

        </q-card>
</template>

<script>
import HelpLabel from './HelpLabel'

export default {
  name: "FileUploader",
  components: {HelpLabel},
  props: ["Image",  "published", "publicationDate", "icon", "label"],
  computed: {},
  mounted() {},
  methods: {
     getFiles (value) {
      console.log(value);
      console.log(this)
      this.$emit('upload', value)

    
     },
     onRejected(rejectedEntries){
       this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
     /*isPublished(value){
      console.log(value)
        this.$emit('publish', value)
     }*/
  }

}
</script>

<style scoped>
.field-1{
  font-size:16px; 
  font-weight:600;
  
}
.section{
  padding-bottom:0px;
}
.image{
  max-height: 100px; 
  max-width: 150px
}
.pad{
  padding-left:20px;
}
</style>

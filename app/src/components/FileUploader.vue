<template>
    <q-card class="my-card">
          <q-card-section class="section">
            <div class="row items-center all-pointer-events field" style="padding-top:10px">
            <q-icon class="q-mr-xs" size="24px" name="img:statics/icons/Help.svg" />
            {{$t('input_labels.upload_icon')}}
            <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">{{this.label}}</q-tooltip>
            </div> 
            <q-file
              @input="getFiles($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_icon')"
              standout
              outlined
              accept=".jpg, image/*" 
              @rejected="onRejected"
            >

            </q-file>
            <q-img
              :src="this.Image"
              spinner-color="white"
              class="image"
            />
          </q-card-section>
     

        </q-card>
</template>

<script>
export default {
  name: "FileUploader",
  components: {},
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

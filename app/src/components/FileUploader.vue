<template>
    <q-card class="my-card">
          <q-card-section class="section">
            <div class="field"> Icon </div>
            <q-file
              @input="getFiles($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_icon')"
              standout
              outlined
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
  props: ["Image",  "published", "publicationDate", "icon"],
  computed: {},
  mounted() {},
  methods: {
     getFiles (value) {
      console.log(value);
      console.log(this)
      this.$emit('upload', value)

    
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

<template>
    <q-card class="my-card">
          <q-card-section>
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
          <q-card-section class="row">
              <div class="col-8">
                <!--<div class="field"> {{$t('input_labels.publication_date')}} </div>
            <q-input
            outlined
            filled
            dense
              v-model="publicationDate"
              :label="$t('input_labels.publication_date')"
              readonly
            />-->
            </div>
            <div class="col-4 pad">
             <!-- <div class="field" >{{$t('input_labels.is_published')}} </div>
            <q-toggle
              :value="published"
              color="green"
              
              @input="isPublished"
              left-label
            />-->
            </div>
          
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
  font-weight:600
}
.image{
  max-height: 100px; 
  max-width: 150px
}
.pad{
  padding-left:20px;
}
</style>

<template>
    <q-card class="my-card">
          <q-card-section>
            <div style="font-size:16px; font-weight:600"> Icon </div>
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
              style="max-height: 100px; max-width: 150px"
            />
          </q-card-section>
          <q-card-section class="row">
              <div class="col-8">
                <div style="font-size:16px; font-weight:600"> {{$t('input_labels.publication_date')}} </div>
            <q-input
            outlined
            filled
            dense
              v-model="publicationDate"
              :label="$t('input_labels.publication_date')"
              readonly
            />
            </div>
            <div class="col-4" style="padding-left:20px;">
              <div style="font-size:16px; font-weight:600">{{$t('input_labels.is_published')}} </div>
            <q-toggle
              :value="published"
              color="green"
              
              @input="isPublished"
              left-label
            />
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
     isPublished(value){
      console.log(value)
        this.$emit('publish', value)
     }
  }

}
</script>

<style>
</style>

<template>
    <q-card class="my-card">
          <q-card-section>

            <q-file
              @input="getFiles($event)"
              bg-color="grey-3"
              dense
              rounded
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
          <q-card-section>
            <q-toggle
              :value="published"
              color="green"
              label="is Published"
              @input="isPublished"
            />
            <q-input
              v-model="publicationDate"
              label="Publication date"
              readonly
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
     isPublished(value){
      console.log(value)
        this.$emit('publish', value)
     }
  }

}
</script>

<style>
</style>

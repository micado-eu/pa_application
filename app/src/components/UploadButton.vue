<template>
  <div class="col-4 justify-center">
    <q-btn
      color="info"
      label="Batch Upload"
      class="add-button"
      size="9px"
      @click="show_dialog=true"
    />
    <a href="/statics/csv/intervention_category.csv">download template</a>

    <q-dialog
      v-model="show_dialog"
      persistent
      style="width: 750px"
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-file
            v-model="files"
            :label="$t('input_labels.upload_file')"
            accept=".csv"
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('button.cancel')"
            color="active"
            v-close-popup
          />
          <q-btn
            flat
            :label="$t('button.upload')"
            color="alert"
            @click="uploadFile()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import FormData from 'form-data'
export default {
  name: 'UploadButton',
  data () {
    return {
      files: null,
      show_dialog: false
    }
  },
  props: {
    entity: {
      type: String,
      default: ''
    }
  },
  methods: {
    uploadFile: function () {
      let formData = new FormData()
      formData.append('files', this.files)
      formData.append('entity', this.entity)
      console.log(formData)
      console.log(this.$axios.defaults.headers)
      let postHeaders = this.$axios.defaults.headers
      postHeaders['Content-Type'] = 'multipart/form-data'


      //      console.log(formData.getHeaders())

      this.$axios.post('/backend/1.0.0/files',
        formData,
        {
          headers: postHeaders
        }
      ).then(function () {
        console.log('SUCCESS!!')
      })
        .catch(function () {
          console.log('FAILURE!!')

        })

    }
  }
}
</script>

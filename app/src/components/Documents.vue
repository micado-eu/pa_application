<template>
  <div class="documents">
    <q-list >
      <q-item v-for="doc in documents" :key="doc.id">
      <q-item-section avatar>
          <q-avatar rounded>
          <img :src="doc.image">
          </q-avatar>
        </q-item-section>
        <q-item-section>
        <q-item-label>{{doc.title}}</q-item-label>
        <q-item-label caption >Emitted by:{{doc.emitter}} - lasting up to: {{doc.expire_date}}</q-item-label>
        </q-item-section>
        </q-item>
    </q-list>
    Upload new documents

    <div class="ThumbnailContainer" v-if="collection === 'thumbnail'">
      <button id="open-thumbnail-modal" class="button">Select file</button>

    </div>
    <div id="DashboardContainer" v-else></div>
    </div>
  </div>
</template>

<script>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'
import Tus from '@uppy/tus'

//const Uppy = require('@uppy/core');
//const Dashboard = require('@uppy/dashboard');
//const XHRUpload = require('@uppy/xhr-upload');
//const Tus = require('@uppy/tus')

export default {
  name: 'Documents',
  props: {
    msg: String
  },
  data() {
      return {
      files: {},
      mainProps: { width: 50, height: 50, class: 'm1' }
      }
    },
  computed: {
  uppyId() {
    return `${this.modelId}-${this.collection}`;
  },
    documents() {
      return this.$store.state.documents.documents
    }
  },
  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('documents/fetchDocuments')
      .then(documents => {
        this.loading = false
      })
  },
  mounted() {
    const uppy = Uppy({
      id: this.uppyId,
      autoProceed: false,
      debug: true,
      thumbnailGeneration: true,
      restrictions: {
        maxFileSize: false,
        allowedFileTypes: ['image/*', 'application/pdf'],
      },
      meta: {
        modelId: this.modelId,
        collection: this.collection,
      },
      onBeforeFileAdded: () => {
        Promise.resolve();
      },
      onBeforeUpload: (files) => {
        this.files = files;
        Promise.resolve();
      },
    });
    if (this.collection === 'thumbnail') {
      uppy.use(Dashboard, {
        trigger: '#open-thumbnail-modal',
        metaFields: [
          { id: 'owner', name: 'Owner', placeholder: 'name of the photographer/owner' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
          { id: 'order', name: 'Order', placeholder: 'order' },
        ],
      });
    } else {
      uppy.use(Dashboard, {
        inline: true,
        target: '#DashboardContainer',
        replaceTargetContent: true,
        note: 'Images and PDF only.',
        maxHeight: 500,
        metaFields: [
          { id: 'owner', name: 'Owner', placeholder: 'name of the photographer/owner' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
          { id: 'order', name: 'Order', placeholder: 'order' },
        ],
      });
    }
    uppy.use(Tus, {
      endpoint: 'http://upload.micado.csi.it:1080/files', // use your tus endpoint here
      resume: true,
      headers: {"Upload-Metadata":"gioppo"},
      autoRetry: true,
      retryDelays: [0, 1000, 3000, 5000]
    })
    /*
    uppy.use(XHRUpload, {
      endpoint: this.endpoint,
      headers: {
        'X-CSRF-TOKEN': window.csrfToken,
      },
    });
    // uppy.on('upload-success', (fileId, resp, uploadURL) => {
    //   debugger;
    //   console.log(uploadURL)
    //   var img = new Image()
    //   img.width = 300
    //   img.alt = fileId
    //   img.src = uploadURL
    //   document.body.appendChild(img)
    // });
    */
    uppy.run();
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="uppy/dist/uppy.css"></style>

<template>
  <q-page class="flex flex-center">
  <q-card class="my-card">
  <q-card-section>
        <div class="text-h6">Migrant application configuration</div>
      </q-card-section>
    <q-card-section>
    <q-option-group
      v-model="features"
      :options="options"
      color="yellow"
      type="toggle"
    />
        <q-btn color="info" glossy label="Save" @click="saveFeatures"/>
    </q-card-section>
   </q-card>

  </q-page>
</template>

<script>
import axios from 'axios'
import https from 'https';

export default {
  name: 'PageIndex',
  data () {
    return {
      group: [ 'FEAT_SERVICES' ],
      options: [
        {
          label: 'Services',
          value: 'FEAT_SERVICES'
        },
        {
        label: 'Document wallet',
        value: 'FEAT_DOCUMENTS'
        },
        {
        label: 'Assistant',
        value: 'FEAT_ASSISTANT'
        },
        {
        label: 'Process flow',
        value: 'FEAT_PROCESSES'
        },
        {
        label: 'Integration tasks',
        value: 'FEAT_TASKS'
        },
        {
        label: 'Gloassary',
        value: 'FEAT_GLOSSARY'
        },
        {
        label: 'Default features (settings, search, notifications)',
        value: 'FEAT_DEFAULT'
        }
      ]
    }
  },
  computed: {
    features:{
      get () {
        return this.$store.state.features.features
      },
      set (value) {
        this.$store.commit('features/setFeatures', value)
      }
    }
  },
  methods: {
    saveFeatures(){
      const agent = new https.Agent({
        rejectUnauthorized: false
      });

      axios
      .post('https://api.micadoproject.eu/db/v01/migrant_app_config',
           {
             "id": 1,
             "features": this.features
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
        console.log("posted")
      ).catch(function (err) {

        // Run into big problems when I get an error
        console.log("Got an error calling API manager: ", err);
        response => []
      })
      console.log("posted")
    }

  },
  created () {
    console.log(this.$store);
    this.$store.dispatch('features/fetchFeatures')
      .then(features => {
//        this.loading = false
      })
  }
}
</script>

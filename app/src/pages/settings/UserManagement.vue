<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-6">
        <h5>{{$t('data_settings.usermgmt')}}</h5>
      </div>
      <div class="col-6 div-1">
        <q-btn
          color="info"
          no-caps
          :data-cy="'adduser'"
          :label="$t('button.add_user')"
          @click="newUser()"
          :disable="hideAdd"
          class="add-button"
        />
      </div>
    </div>
    <q-card
      class="q-pa-xl div-2"
      :hidden="hideForm"
    >
      <q-card-section>
        <div class="text-h6">Migrant application configuration</div>
      </q-card-section>
      <q-card-section>

        <hr id="hr">
        <q-btn
          no-caps
          class="delete-button"
          :data-cy="'canceldoc'"
          unelevated
          rounded
          :label="$t('button.cancel')"
          @click="cancelUser()"
        />
        <q-btn
          no-caps
          :data-cy="'savedoc'"
          color="accent"
          unelevated
          rounded
          :label="$t('button.save')"
          class="button"
          @click="savingUser()"
        />
      </q-card-section>
    </q-card>
    <q-list
      bordered
      separator
    >
      <PaUser
        v-for="user in completepausers"
        :key="user.umId"
        :theUser="user"
      />
    </q-list>
  </div>
</template>

<script>
import storeMappingMixin from '../../mixin/storeMappingMixin'
import PaUser from '../../components/pa_user_management/PaUser'


export default {
  name: "UserManagement",
  data () {
    return {
      group: ["FEAT_SERVICES"],
      hideAdd: false,
      hideForm: true,

      workingFeatures: []
    }
  },
  mixins: [
    storeMappingMixin({
      getters: {
        pausers: 'user/pausers'
      },
      actions: {
        fetchPAUser: 'user/fetchPAUser'
      }
    })],
  components: {
    PaUser
  },
  computed: {
    completepausers () {
      return this.pausers
    }
  },
  methods: {
    newUser () {
      this.hideAdd = true
      this.hideForm = false
    },
    cancelUser () {
      //    this.isNew = false
      this.hideForm = true
      this.hideAdd = false
      //   this.int_doc_shell.validators = []
      //    this.uploaded_images = []
      //     this.icon = null
      //     this.the_model = null
      //   this.order = 0
    },
    saveFeatures () {
      console.log(this.workingFeatures)
      this.updateAllFeatures(this.workingFeatures)
      console.log("posted")
      this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    }

  },
  async created () {
    console.log("created")
    await this.fetchPAUser(this.$pa_tenant)
    console.log(this.pausers)
    //    this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    /*
    this.fetchFeatures()
      .then(features => {
        //        this.loading = false
        console.log("got features")
        console.log(this.features)
      });
      */

  }
}
</script>
<style scoped>
h5 {
  font-weight: bold;
}
.add-button {
  width: 200px;
}
</style>
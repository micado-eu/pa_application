<template>
  <div style="text-align:center; padding-top:40px">
    <div
      class=""
      style=" display:inline-block; width:750px;border-width:2px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px"
    >
      <q-tabs
        v-model="langTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="language in languages"
          :key="language.lang"
          :name="language.name"
          :label="language.name"
        />
      </q-tabs>
      <q-tab-panels
        v-model="langTab"
        animated
      >
        <q-tab-panel
          v-for="language in languages"
          :key="language.lang"
          :name="language.name"
        >
          <div
            class=" q-pa-xsm row"
            style="text-align:center"
          >
            <div
              class="col-4"
              style="padding-left:40px"
            >
              <h5 style="text-align:left;font-size:15px;"> Process Name </h5>
            </div>
            <div
              class="col-8"
              style="margin: auto;display: block;padding-right:40px"
            >
              <q-input
                rounded
                dense
                bg-color="grey-3"
                standout
                outlined
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].process"
              />
            </div>
          </div>

          <div class=" q-pa-xsm row">
            <div
              class="col-4"
              style="padding-left:40px"
            >
              <h5 style="text-align:left;font-size:15px; margin:0"> Process description </h5>
            </div>
            <div
              class="col-8"
              style="margin: auto;display: block;padding-right:40px"
            >
              <q-input
                rounded
                dense
                type="textarea"
                bg-color="grey-3"
                standout
                outlined
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].description"
              />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <div
        class=" q-pa-xsm row"
        style="text-align:center"
      >
        <div
          class=" col-4"
          style="padding-left:40px"
        >
          <h5 style="text-align:left;font-size:15px"> Process tags </h5>
        </div>
        <div
          class="col-4"
          style="padding-left:0px; padding-top:15px"
        >
          <q-select
            filled
            dense
            clearable
            v-model="edit_process.applicableUsers"
            multiple
            emit-value
            map-options
            :options="this.u_tags"
            label="User Tags"
            style="width: 200px"
          />
        </div>

        <div
          class="col-4"
          style="padding-right:45px; padding-top:15px"
        >
          <q-select
            filled
            dense
            clearable
            v-model="edit_process.processTopics"
            multiple
            emit-value
            map-options
            :options="this.t_tags"
            label="Topic Tags"
            style="width: 200px"
          />
        </div>
      </div>

    </div>
    <div style="text-align:center">
      <div
        class="q-pa-md q-gutter-md col-4"
        style="display:inline-block"
      >
        <q-btn
          color="secondary"
          no-caps
          rounded
          label="Manage steps"
          unelevated
          :disable="this.disabled"
          style="width:150px;border-radius:2px"
          :to="this.id + '/steps'"
        />

        <q-btn
          color="info"
          no-caps
          rounded
          label="Save changes"
          unelevated
          style="width:150px;border-radius:2px"
          @click="saveProcess(edit_process)"
        />

        <q-btn
          color="accent"
          no-caps
          rounded
          label="Back"
          unelevated
          style="width:150px;border-radius:2px"
          to="/guided_process_editor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'

export default {
  name: 'PageIndex',
  mixins: [editEntityMixin],
  props: ["theprocess"],

  data () {
    return {
      id: this.$route.params.id,
      is_new: true,
      edit_process: { id: -1, applicableUsers: [], translations: [], processTopics: [], link: "", published: false, publicationDate: null, },
      u_tags: [

      ],
      t_tags: [

      ],
    }
  },
  computed: {
    processes () {
      return this.$store.state.flows.flows
    },
    topic () {
      return this.$store.state.topic.topic
    },
    user () {
      return this.$store.state.user_type.user_type
    },

    disabled () {
      if (this.id != null) {
        return false
      }
      else {
        return true
      }

    }

  },
  methods: {
    saveProcess (value) {
      let workingProcess = JSON.parse(JSON.stringify(this.edit_process));

      if (this.is_new) {
        this.$store.dispatch('flows/saveProcess', workingProcess)
        console.log(this.$store.state.flows)
        console.log(this.edit_process.id)
        //this.$router.push({ path: `/processmanager/edit//${this.edit_process.id}` })
      }
      else {
        this.$store.dispatch('flows/editProcess', value);
        console.log(this.is_new)
        console.log(value)
        console.log(this.processes)
        console.log(this.$store.state.flows)
      }
    },

    createShell () {
      this.edit_process = { id: -1, applicableUsers: [], translations: [], processTopics: [], link: "", published: false, publicationDate: null, }
      this.languages.forEach(l => {
        this.edit_process.translations.push({ id: -1, lang: l.lang, process: '', description: '', translationDate: null })
      });
    },
    mergeProcess (process) {
      console.log("MERGING")
      console.log(process)
      this.edit_process.id = process.id
      this.edit_process.link = process.link
      this.edit_process.published = process.published
      this.edit_process.publicationDate = process.publicationDate
      this.edit_process.applicableUsers = process.applicableUsers
      //    this.edit_process.processTopics = process.processTopics
      process.translations.forEach(pr => {
        console.log(pr)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.edit_process.translations.length; i++) {
          if (this.edit_process.translations[i].lang == pr.lang) {
            this.edit_process.translations.splice(i, 1);
            this.edit_process.translations.push(JSON.parse(JSON.stringify(pr)))
            break;
          }
        }
      });

      // here we have to cycle on topics and use the processTopics data to set the chosen ones
      process.processTopics.forEach(the_topic => {
        this.edit_process.processTopics.push(the_topic.idTopic)
      })
      console.log("THE MERGED OBJECT")
      console.log(this.edit_process)


    }
  },
  async created () {
    this.loading = true
    console.log(this.$defaultLangString);
    this.createShell()

    await this.$store.dispatch('flows/fetchFlows')
      .then(flows => {
        console.log(flows)
        this.loading = false
      })

    await this.$store.dispatch('topic/fetchTopic')
      .then(topics => {
        console.log(topics)
        topics.forEach(topic => {
          var the_topic = { label: topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic, value: topic.id }
          this.t_tags.push(the_topic)
        })

      })
    await this.$store.dispatch('user_type/fetchUserType')
      .then(user_type => {
        console.log(user_type)

        user_type.forEach(ut => {
          var the_user = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType, value: ut.id }
          this.u_tags.push(the_user)
        })
      })

    console.log("THEPROCESS:")
    console.log(this.theprocess)
    /*
    if (this.id != null) {
      console.log("ciso ")
      this.is_new = false
      console.log("hello")
      var filteredProcesses = this.processes.filter((filt) => {
        console.log("in fil")
        console.log(filt)
        console.log(filt.id == this.id)
        return filt.id == this.id

      })
      this.edit_process = Object.assign({}, filteredProcesses[0]);
      */
    if (this.theprocess != null) {
      this.mergeProcess(this.theprocess)
      console.log(this.edit_process)
    }
    // }
  },

}
</script>
<style scoped>
</style>

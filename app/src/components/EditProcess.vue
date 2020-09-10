<template>
<div>
    <div v-if="theprocess!=null" style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 30px;line-height: 41px;color:white; background-color:#FF7C44">{{$t('input_labels.edit_process')}} - {{this.title}}</div>
    <div v-else style="font-style: normal;height:72px;text-align: center; padding-top:15px;font-weight: bold;font-size: 30px;line-height: 41px;color:white; background-color:#FF7C44">{{$t('input_labels.add_new_process')}}</div>

  <div style="text-align:center; padding-top:40px">
    <div
      class=""
      style=" display:inline-block; border: 1px solid #DADADA; border-radius: 5px; margin-bottom: 1px; width:80%"
    >
      
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
            class=" q-pa-xsm "
            style="padding-bottom:50px; padding-top:40px;padding-left:150px; padding-right:150px"
          >
            
             <div style="font-size:16px; font-weight:600; text-align:left; padding-bottom:15px">{{$t('input_labels.process_name')}} </div>
            
              <q-input
                dense
                bg-color="grey-3"
                standout
                outlined
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].process"
                :label="$t('input_labels.topic_placeholder')"
              />
          </div>

          <div class=" q-pa-xsm "  style="padding-bottom:50px; padding-left:150px; padding-right:150px">
           
              <div style="text-align:left;font-size:16px; font-weight:600; padding-bottom:15px"> {{$t('input_labels.process_description')}} </div>
            <GlossaryEditor
           
        class="desc-editor"
        v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].description"
        :lang="language.lang"
        ref="editor" />
             
            </div>
          
        </q-tab-panel>
      </q-tab-panels>
    
        <div
          class=" q-pa-xsm row"
          style="padding-left:150px; padding-right:150px"
        >
          <div class="col-6" style="text-align:left;font-size:15px;"> {{$t('input_labels.user_tags')}} </div>
          <div class="col-6" style="text-align:left;font-size:15px"> {{$t('input_labels.topic_tags')}} </div>
        </div>
        <div class="q-pa-xsm row" style="padding-left:150px; padding-right:150px">
        <div
          class="col-6"
          style="padding-left:0px; padding-top:15px"
        >
          <q-select
            filled
            dense
            clearable
            v-model="edit_process.applicableUsers"
            @add="addUserTag($event)"
            @remove="removeUserTag($event)"
            @clear="clearAllUsers()"
            multiple
            emit-value
            map-options
            :options="this.u_tags"
            :label="$t('input_labels.user_tags')"
            style="width: 90%"
          />
          <q-chip v-for="tag in selected_u_tags" dense :key="tag">{{tag}}</q-chip>
        </div>

        <div
          class="col-6"
          style="padding-right:45px; padding-top:15px"
        >
          <q-select
            filled
            dense
            clearable
            v-model="edit_process.processTopics"
            @add="addTopicTag($event)"
            @remove="removeTopicTag($event)"
            @clear="clearAllTopics()"
            multiple
            emit-value
            map-options
            :options="this.t_tags"
            :label="$t('input_labels.topic_tags')"
            style="width: 90%"
          />
          <q-chip v-for="tag in selected_t_tags" dense :key="tag">{{tag}}</q-chip>
        </div>
      </div>
      <hr style= "width:85%;border: 0.999px solid #DADADA;margin-top:90px">
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
      <hr style= "width:85%;border: 0.999px solid #DADADA;">
      <div style="text-align:left; padding-left:150px">
      <div
        class="q-pa-md q-gutter-md col-4"
        style="display:inline-block"
      >
         <q-btn
          class="button"
          no-caps
          rounded
          :label="$t('button.back')"
          unelevated
          style="width:150px;border-radius:2px"
          to="/guided_process_editor"
        />
        <q-btn
          color="secondary"
          no-caps
          rounded
          :label="$t('button.manage_steps')"
          unelevated
          :disable="this.disabled"
          style="width:150px;border-radius:2px"
          :to="this.id + '/steps'"
        />

        <q-btn
          color="accent"
          no-caps
          rounded
          :label="$t('button.save')"
          unelevated
          style="width:150px;border-radius:2px"
          @click="saveProcess(edit_process)"
        />

     
      </div>
    </div>
    </div>
    
  </div>
</div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'
export default {
  name: 'PageIndex',
  mixins: [editEntityMixin],
  props: ["theprocessid"],
  components: {
    
    GlossaryEditor
  },
  data () {
    return {
      theprocess:null,
      id: this.$route.params.id,
      is_new: true,
      edit_process: { id: -1, applicableUsers: [], translations: [], processTopics: [], link: "", published: false, publicationDate: null, },
      u_tags: [

      ],
      selected_u_tags:[],
      t_tags: [

      ],
      selected_t_tags:[]
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
    title () {
      return this.theprocess.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].process
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
    addUserTag(value){
      console.log(value)
     
     var the_user =  this.user.filter((a_user) => {
        return a_user.id == value.value
      })[0]
      var the_user_transl = the_user.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
      this.selected_u_tags.push(the_user_transl)
      
    },
    removeUserTag(value){
      console.log(value)
      var idx = this.selected_u_tags.indexOf(value)
      this.selected_u_tags.splice(value.index, 1)
    },
    clearAllUsers(){
      this.selected_u_tags = []
    },
    addTopicTag(value){
      console.log(value)
     
     var the_topic =  this.topic.filter((a_topic) => {
        return a_topic.id == value.value
      })[0]
      var the_topic_transl = the_topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
      this.selected_t_tags.push(the_topic_transl)
      
    },
    removeTopicTag(value){
      console.log(value)
     
      this.selected_t_tags.splice(value.index, 1)
    },
    clearAllTopics(){
      this.selected_t_tags = []
    },
   async saveProcess (value) {
      let workingProcess = JSON.parse(JSON.stringify(this.edit_process));

      if (this.is_new) {
       await this.$store.dispatch('flows/saveProcess', workingProcess)
        console.log(this.$store.state.flows)
        console.log(this.edit_process.id)
        //this.$router.push({ path: `/processmanager/edit//${this.edit_process.id}` })
      }
      else {
        await this.$store.dispatch('flows/editProcess', value);
        console.log("I am this is new")
        console.log(this.is_new)
        console.log(value)
        console.log(this.edit_process)
        console.log(this.$store.state.flows)
      }
      this.$router.push({path: '/guided_process_editor'})
    },

    createShell () {
      this.edit_process = { id: -1, applicableUsers: [], applicableUsersOrig:[], translations: [], processTopics: [], processTopicsOrig:[],  link: "", published: false, publicationDate: null, }
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
      this.edit_process.applicableUsersOrig = []
      this.edit_process.processTopicsOrig = []
      this.sele
      //this.edit_process.applicableUsers = process.applicableUsers
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
            console.log("pre-topics foreach")

      // here we have to cycle on topics and use the processTopics data to set the chosen ones
      if (process.processTopics != null) {
        process.processTopics.forEach(the_topic => {
          this.edit_process.processTopics.push(the_topic.idTopic)

          var the_topic =  this.topic.filter((a_topic) => {
            return a_topic.id == the_topic.idTopic
            })[0]
          var the_topic_transl = the_topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
          this.selected_t_tags.push(the_topic_transl)

          this.edit_process.processTopicsOrig.push(the_topic.idTopic)
        })
      }

      if (process.applicableUsers != null) {
        process.applicableUsers.forEach(the_user => {
          this.edit_process.applicableUsers.push(the_user.idUserTypes)

          var the_user =  this.user.filter((a_user) => {
            return a_user.id == the_user.idUserTypes
          })[0]
          var the_user_transl = the_user.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
          this.selected_u_tags.push(the_user_transl)

          this.edit_process.applicableUsersOrig.push(the_user.idUserTypes)

        })
      }

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
        console.log(this.processes)
        console.log(this.theprocessid)
        this.loading = false
        var temp = this.processes.filter((current_process) => {
          return current_process.id == this.theprocessid
        })[0]
        console.log(temp)
        this.theprocess = temp
        console.log("I am the process")
        console.log(this.theprocess)
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
    if (this.theprocess != null ) {
      this.is_new = false
      this.mergeProcess(this.theprocess)
      console.log(this.edit_process)
    }
    // }
  },

}
</script>
<style scoped>
.button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
}
</style>

<template>
  <q-item class="item">
    <div class="width">
      <div class="row">
        <div
          class="col-4 flex flex-left title"
          style="padding-top:10px"
        >
          {{ this.Title }}
        </div>
        <q-item-section class="col-1 flex flex-center">
          <q-toggle
            v-model="theProcess.published"
            color="accent"
            :disable="
              theProcess.translations.filter((top) => top.translated == false)[0]
                .translationState != 1
            "
            @input="isPublished($event, theProcess.id)"
            style="padding-top:5px"
          />            
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          {{ this.translation_state }}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          {{ this.comment_present }}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            :icon="'img:statics/icons/Edit.png'"
            :tooltip="$t('help.edit_process')"
            @click.native="editProcess()"
            :data-cy="'editprocess'.concat(theProcess.id )"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            :icon="'img:statics/icons/Icon - Manage processes.svg'"
            :tooltip="$t('help.manage_process')"
            @click.native="manageProcess()"
            :data-cy="'manageprocess'.concat(theProcess.id )"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            :icon="'img:statics/icons/graph.png'"
            :tooltip="$t('help.preview_process')"
            @click.native="viewer()"
            :data-cy="'manageprocess'.concat(theProcess.id )"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            :icon="'img:statics/icons/Icon - Delete.svg'"
            :tooltip="$t('help.delete_process')"
            @click.native="remove_process($event)"
            :data-cy="'deleteprocess'.concat(theProcess.id )"
          />
        </q-item-section>
      </div>
      <div class="row pad">
        <q-img
          class="image"
          v-for="tag in Topics"
          :src="processTopics.filter(topic => topic.id == tag.idTopic)[0].icon"
          :key="'topic'.concat(tag.idTopic)"
        >
          <q-tooltip :key="'topic_tooltip'.concat(tag.idTopic)">
            {{ topicTransl(tag.idTopic) }}
          </q-tooltip>
        </q-img>
             
        <q-img
          class="image"
          v-for="tag in Users"
          :src="processUsers.filter(user => user.id == tag.idUserTypes)[0].icon"
          :key="'user'.concat(tag.idUserTypes)"
        >
          <q-tooltip :key="'user_tooltip'.concat(tag.idUserTypes)">
            {{ userTransl(tag.idUserTypes) }}
          </q-tooltip>
        </q-img>  
      </div>
      <div class="row pad">
        <p style="padding-top:8px; margin-bottom:0px">
          {{ $t('input_labels.available_transl') }}:
        </p>
        <q-chip
          v-for=" lang in theProcess.translations.filter(lang => {return lang.process.length>1 && lang.translated == true})"
          :key="lang.lang"
        >
          {{ lang.lang }}
        </q-chip>
      </div>
      <hr class="hr">
    </div>
    <q-dialog
      v-model="alert"
      full-width
    >
      <q-layout
        view="Lhh lpR fff"
        container
        class="bg-white"
      >
        <q-header
          
          class="bg-accent"
        >
          <q-toolbar>
            <q-toolbar-title> {{ $t('input_labels.preview_migrant') }}</q-toolbar-title>
            <q-btn
              round
              dense
              flat
              v-close-popup
              color="white"
              icon="cancel"
            />
          </q-toolbar>
        </q-header>
        <q-page-container>
          <q-page class="q-pa-sm">
            <ProcessViewer
              :processid="theProcess.id"
              :topics="processTopics"
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-item>
</template>

<script>
import IconWithTooltip from '../IconWithTooltip'
import editEntityMixin from '../../mixin/editEntityMixin'
import ProcessViewer from './ProcessViewer'
export default {
  name: 'Process',
  props: ["Title", "Topics", "Users", "Link", "Path", "theProcess", "processTopics", "processUsers"],
  mixins: [editEntityMixin],
  data () {
    return {
      alert:false
    }
  },
  computed:{
    comment_present(){
      if(this.theProcess.comments){
        return this.theProcess.comments.length
      }
      else{
        return 0
      }
    },
    translation_state(){
      var state = this.theProcess.translations.filter((transl)=>{
        return transl.lang == this.$defaultLang && transl.translated == false
      })[0].translationState
      if(state == 0){
        return this.$i18n.t('translation_states.editing')
      }
      else if(state ==1){
        return this.$i18n.t('translation_states.translatable')
      }
      else if(state==2){
        return this.$i18n.t('translation_states.translating')
      }
      else{
        return this.$i18n.t('translation_states.translated')
      }
    }
  },
  components:{IconWithTooltip,ProcessViewer},
  methods: {
    viewer(){
      this.alert = true
    },
    topicTransl(topic_id){
      var working_topic = this.processTopics.filter(topic => topic.id == topic_id)[0]
      return working_topic.translations.filter((tr)=>{
        return tr.lang == this.activeLanguage
      })[0].topic
    },
      userTransl(user_id){
      var working_user = this.processUsers.filter(topic => topic.id == user_id)[0]
      return working_user.translations.filter((tr)=>{
        return tr.lang == this.activeLanguage
      })[0].userType
    },
    isPublished(event, value){
      console.log(event)
      console.log(value)
      this.$emit('publish', {isPublished: event, process_id: value})
    },
    remove_process (event) {
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('remove', this.Link)
    },
    editProcess () {
      console.log("prima di mandare i process")
      console.log(this.theProcess)
      this.$router.push({ name: 'editprocess', params: { theprocessid: this.theProcess.id } })
    },
    manageProcess () {
      if(this.theProcess.published){
        this.$q.notify({
        message: this.$t('warning.published_step'),
        color: 'red'
      })
      }
      else{
      console.log("prima di editare gli step")
      console.log(this.theProcess.id)
      console.log(this.theProcess)
      this.$router.push({ name: 'editstep', params: { processId: this.theProcess.id } })
      }
    }
  }
}
</script>
<style scoped>
.item{
  padding-top:0px; 
  padding-bottom:20px;
}
.width{
  width:100%
}
.title{
  text-align:left; 
  font-size:18px
}
.margin{
  margin-left:30px;
  margin-top:10px
}
.top{
  margin-top:10px
}
.hr{
  margin:0px;
  border: 0.999px solid #EFEFEF
}
.image{
  height: 25px; 
  max-width: 25px;
  margin-right:5px
}
.pad{
  padding-bottom:5px
}
</style>
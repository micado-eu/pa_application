<template>
  <q-item class="item" style="padding-left:0px; padding-right:0px">
    <div class="width">
      <div class="row" >
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
            :icon="'img:statics/icons/Icon - Manage processes (guided process page).svg'"
            :tooltip="$t('help.manage_process')"
            @click.native="manageProcess()"
            :data-cy="'manageprocess'.concat(theProcess.id )"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            :icon="'img:statics/icons/Icon - Preview 1.svg'"
            :tooltip="$t('help.preview_process')"
            @click.native="viewer()"
            :data-cy="'manageprocess'.concat(theProcess.id )"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            :icon="'img:statics/icons/Icon - Delete.svg'"
            :tooltip="$t('help.delete_process')"
            @click.native="deleting = true"
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
          v-for="lang in translationAvailable(theProcess)"
            style="background-color:#C4C4C4" 
            text-color="white"
            :key="lang.lang"
        >
          {{ lang.lang.toUpperCase() }}
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
    <q-dialog v-model="deleting">   
        <q-card class="q-pa-md" style="padding-top:0px;width: 700px; max-width: 80vw;">
          <div style="padding-top:30px; text-align:center">
          <p class="delete_desc">{{$t('input_labels.delete_confirm')}} </p>
          <p class="delete_text"> {{this.Title}}</p>
          </div>
          <div style="text-align:center;">
          <q-btn
            class="go_back"
            :label="$t('button.cancel')"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="deleting = false"
            style="margin-right:10px"
          />
            <q-btn
            class="delete"
            :label="$t('help.delete_process')"
            rounded
            unelevated
            no-caps
            size="15px"
            @click="remove_process($event)"
          />
          
          </div>
                
        </q-card>
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
      alert:false,
      deleting:false
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
      this.deleting = false
    },
    editProcess () {
    if(this.theProcess.published){
        this.$q.notify({
        message: this.$t('warning.published_edit'),
        color: 'red'
    })
    }
    else{
      console.log("prima di mandare i process")
      console.log(this.theProcess)
      this.$router.push({ name: 'editprocess', params: { theprocessid: this.theProcess.id } })
    }
    },
    manageProcess () {
      if(this.theProcess.published){
        this.$q.notify({
        message: this.$t('warning.published_edit'),
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
.delete_desc{
  font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 25px;
color: #0D0D0D;
}
.delete_text{
  font-weight: normal;
font-size: 18px;
line-height: 25px;
color: #0D0D0D;
}
.go_back{
  background: #FFFFFF;
border: 1px solid #C71F40;
box-sizing: border-box;
border-radius: 5px;
}
.delete{
  background: #9E1F63;
border-radius: 5px;
color: white;
}
</style>
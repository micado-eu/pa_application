<template>

    <q-item>
  <div class="col-4 flex flex-left title" style="padding-top:10px">{{this.theSurvey.title}}</div>
            <q-item-section class="col-1 flex flex-center margin">
            <q-toggle
            v-model="theSurvey.active"
            color="accent"
            disable
            style="padding-top:5px"
          />
          </q-item-section>
            <q-item-section class="col-1 flex flex-center top" >
             {{this.start_date}}
            </q-item-section>
            <q-item-section class="col-1 flex flex-center top" >
             {{this.end_date}}
            </q-item-section>
            <q-item-section class="col-1 flex flex-center top" >
             {{this.related_app}}
            </q-item-section>
            <q-item-section class="col-1 flex flex-center top" >
             {{this.theSurvey.answer_number}}
            </q-item-section>
            <q-item-section class="col-1 flex flex-center top" >
              <IconWithTooltip :icon="'img:statics/icons/Edit.png'" :tooltip="$t('help.delete_process')" @click.native="editing()" :data-cy="'deletesurvey'.concat(theSurvey.id )"/>
            </q-item-section>

            <q-item-section class="col-1 flex flex-center top" >
              <IconWithTooltip :icon="'img:statics/icons/Icon - Delete.svg'" :tooltip="$t('help.delete_process')" @click.native="remove_survey($event)" :data-cy="'deletesurvey'.concat(theSurvey.id )"/>
            </q-item-section>
    </q-item>
</template>

<script>
import IconWithTooltip from '../IconWithTooltip'

export default {
  name: 'SurveyElement',
  props: ["theSurvey"],
  data () {
    return {}
  },
  components: {
    IconWithTooltip
  },
  computed:{
    start_date(){
      console.log(typeof(this.theSurvey.activation_date))
      return this.theSurvey.activation_date.slice(0,10)
    },
    end_date(){
      return this.theSurvey.expiry_date.slice(0,10)
    },
    related_app(){
      if(this.theSurvey.destination_app == 0){
        return  this.$t("new_survey.dest_opt_migrant")
      }
      else if(this.theSurvey.destination_app ==1){
         return this.$t("new_survey.dest_opt_pa")
      }
      else{
        return this.$t("new_survey.dest_opt_ngo")
      }
      }
    },

  methods: {
    editing () {
      console.log(this.theSurvey.id)
      this.$emit('editSurvey', this.theSurvey.id)
    },
    remove_survey (event) {
      let target = event.currentTarget.id
      console.log(this.Path)
      this.$emit('remove', this.theSurvey.id)

    }

  }
}
</script>
<style scoped>
.item {
  padding-top: 16px;
  padding-bottom: 0px;
  width: 100%;
}
.username {
  font-size: 20px;
  text-align: left;
  font-size: 18px;
  width: 100%;
  padding-bottom: 0px;
  padding-left: 0px;
}
.width {
  width: 100%;
}
.container {
  text-align: left;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
.span {
  padding-right: 5px;
}
.button-container {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  text-align: center;
}
.button {
  width: 70px;
  margin-bottom: 5px;
  border-radius: 2px;
}
.hr {
  margin: 0px;
}
</style>
<template>
  <div >
      <q-separator />
       <q-expansion-item 
        group="somegroup"
        :duration="100"
        :data-cy="'intervention'.concat(intervention.id)"
        header-style="font-size:18pt; font-weight:600; height:60px; padding-left:30px;"
        @before-show="fetchPic($event, intervention)"
        @hide ="cancelIntervention($event);"
        class="width-1"
      >
      <template v-slot:header>
          

          <q-item-section>
            {{title}}
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-icon v-if="intervention.completed" name="stop_circle" color="green" size="24px" />
              <q-icon v-else-if="(!intervention.completed && intervention.validationRequestDate != null)" name="circle" color="yellow" size="24px" />
              <q-icon v-else  name="panorama_fish_eye" color="yellow" size="24px" />
            </div>
          </q-item-section>
        </template>
          <q-card-section  v-if="intervention.completed">
            <div class="row" style="text-align:center">
              <div class="col">
              <img alt="Completion document" class="image" :src="completionDoc" />
              </div>
              <div class="col " style="  position: relative;">
            <q-icon class="absolute-center" name="check" size="100px" color="green" />
            </div>
            </div>
          </q-card-section>
          <q-card-section v-else class="section" >
            <div class="div-2">
              {{$t('input_labels.description')}}:
              <br>
            </div>
            <div class="row">
              <q-item-section class="col-12 section-2">
              {{this.description}}
               <!-- <span style="width:540px; font-family: 'Nunito Sans', sans-serif;font-weight:300" v-if="!readMoreActivated">{{this.intervention.interventionType.slice(0, 200)}}   </span>
                <a class="" style="font-family: 'Nunito Sans', sans-serif;font-weight:300" v-if="!readMoreActivated && intervention.description.length >200" @click="activateReadMore" href="javascript:void(0)">
                  Read more...
                </a> -->
                <span class="span" v-if="readMoreActivated" v-html="description"></span>
              </q-item-section>
            </div>
            <div class="row section-3" style="padding-top:40px">
              <div class="col-2" style="text-align:center;padding-left:15px">
                <q-btn size="11px" class="button-1 " no-caps  unelevated rounded color="info" :data-cy="'edit_intervention'.concat(intervention.id)" :disable="intervention.completed" :id="intervention.id" :label="$t('button.edit_action')" @click="editIntervention($event, intervention)"  />
              </div>
              <div class="col-2" style="text-align:left; width:120px">
                <q-btn size="11px" class="button-2 " no-caps  unelevated rounded color="accent" :data-cy="'validate_intervention'.concat(intervention.id)" :disable="intervention.completed" :label="$t('button.validate')" :id="intervention.id" @click="validateIntervention($event, intervention)" />
              </div>
                <div class="col-8" v-if="(!intervention.completed && intervention.validationRequestDate != null)" style="text-align:left; font-weight:bold;padding-top:4px; word-break:break-all">
                *{{$t('input_labels.validator')}} {{this.theTenant}}
                </div>
              </div>
                    
             
            <div class=" q-gutter-sm  col pad-left">
              <q-card-section :hidden="hideForm" class="section">
                <q-separator />
                <div class="div-3" >
                  <h5 class="div-4">
                    {{$t('input_labels.edit')}} {{intervention.title}}
                  </h5>
                  <div class="div-5">
                  <div class=" q-pa-xsm row div-6" >
                    <div class=" q-pa-xsm col-3">
                      <HelpLabel
                      :fieldLabel="$t('input_labels.title')"
                      :helpLabel ="$t('help.intervention_title')"
                      class="header"
                      style="padding-top:10px;font-size:16px"
                      />
                    </div>
                    <div class="col-9 div-7">
                      <q-input  dense  maxlength="100" counter bg-color="white" standout outlined v-model="model.title" />
                    </div>
                  </div>

                <div class=" q-pa-xsm row div-6">
                  <div class=" q-pa-xsm col-3">
                     <HelpLabel
                      :fieldLabel="$t('input_labels.description')"
                      :helpLabel ="$t('help.intervention_description')"
                      class="header"
                      style="padding-top:10px;font-size:16px"
                      />
                  </div>
                  <div class="col-9 div-8" >
                    <q-input  dense  type="textarea" bg-color="white" standout outlined v-model="model.description" />
                  </div>
                </div>
      
                <div class=" q-pa-xsm row center" >
                  <div class=" q-pa-xsm col-3">
                     <HelpLabel
                      :fieldLabel="$t('input_labels.type')"
                      :helpLabel ="$t('help.intervention_assigned_type')"
                      class="header-2"
                      style="font-size:16px"
                      />
                  </div>
                  <div class=" q-pa-md col-9 div-9" >
                    <q-select
                        filled
                        dense
                        emit-value
                        map-options
                        clearable
                        bg-coloe="white"
                        v-model="model.interventionType"
                        :options="intervention_categories"
                        bg-color="white"
                        :label="$t('input_labels.intervention_type')"
                        class="width-2"                      />
                  </div>
                </div>

        <div class="q-gutter-sm">
         </div>
        <div class="center" style="padding-top:30px">
        <q-btn class="delete-button" :data-cy="'cancelintervention'.concat(intervention.id)" unelevated  no-caps  :label="$t('button.cancel')" @click="cancelIntervention($event)" />
        <q-btn  class="button" :data-cy="'saveintervention'.concat(intervention.id)" unelevated no-caps color="accent" :label="$t('button.save_changes')" :id="the_intervention_plan.id" @click="saveIntervention($event, intervention)" />
        </div>
          </div>
          </div>
      </q-card-section>
           </div>
          </q-card-section>
          
        </q-card>
      </q-expansion-item>
      
    </div>
</template>

<script>
import HelpLabel from './HelpLabel'

export default {
  name: "InterventionPlan",
  data(){
    return{
     readMoreActivated:false
    }
  },
  components: {},
  props:["title","description", "the_intervention_plan", "model", "intervention", "the_processes_list", "hideForm", "intervention_categories", "completionDoc", "tenants"],
  computed: {
    theTenant(){
      if(this.intervention.validatingUserTenant!=null){
        return this.tenants.filter((tenant)=>{return tenant.id == this.intervention.validatingUserTenant})[0].name
      }
      else{
        return 'Placeholder'
      }
    }
  },
  mounted() {},
  components:{HelpLabel},
  methods: {
     activateReadMore(){
        this.readMoreActivated = true;
    },
    editIntervention(event, value){
      console.log(value)
      console.log("I am the intervention being sent")
      
      this.$emit('editIntervention', value)

    },
    validateIntervention(event, value){
      console.log("In validating intervention")
      this.$emit('validated', value )

    },
    saveIntervention(event, value){
     // let targetId = event.currentTarget.id
      console.log("I am")
      console.log(value)
      this.$emit('saveIntervention', value)

    },
    cancelIntervention(event){
      console.log("canceling)")
      this.$emit('cancelIntervention')

    },
    fetchPic(event, value){
      console.log("fetching")
      if(this.intervention.completed){
        console.log("inside if")
        console.log(value)
         this.$emit('fetchPic', value)
      }
     
    }
  }
};
</script>

<style scoped>
.image{
  max-width:150px;
  max-height:150px;
}
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
  margin-top:15px;
  border-radius:2px; 
  margin-right:10px; 
  margin-bottom:10px
}
.button{
margin-top:15px;
border-radius:2px; 
margin-right:10px; 
margin-bottom:10px
}
.button-1{
  width:105px;
  margin-bottom:10px;
  border-radius:2px;
 
}
.button-2{
  width:105px;
  margin-bottom:0px;
  border-radius:2px;
  
}
.center{
  text-align: center;
}
.width-1{
  width: 900px;
   border-radius:10px
}
.width-2{
  width: 622px;
}
.section{
  padding-left:0px; 
  padding-right:0px;
  padding-bottom:0px;
  padding-top:0px
}
.div-1{
  padding-top:10px;
  padding-left:30px; 
  font-size:15pt
}
.chip{
  font-size:13pt; 
  font-weight:300; 
  border-radius:2px
}
.div-2{
  padding-left:30px; 
  font-size:15pt
}
.section-2{
  padding-left:30px; 
  padding-right:30px;
  font-size:16px; 
}
.span{
  width:540px; 
  font-family: 'Nunito Sans', sans-serif;
  font-weight:300
}
.section-3{
  margin-left:0px;
  padding-bottom:10px
}
.pad-left{
  padding-left:0px; 
  text-align:left;
}
.div-3{
  background-color:#FFF2EC; 
  padding-left:0px; 
  padding-right:0px;
  border-radius:10px
}
.div-4{
  padding-left:30px; 
  font-size:25px; 
  padding-top:40px;
  font-weight: 600;
  font-size: 25px;
  margin-top:0px
}
.div-5{
  display:inline-block; 
  width:900px;
  border-width:2px;  
  margin-bottom: 1px
}
.div-6{
  text-align:center; 
  padding-left:30px
}
.header{
  text-align:left;
  margin-bottom:0px; 
  font-size:15pt
}
.div-7{
  margin: auto;
  display: block;
  margin-bottom:0px; 
  padding-right:30px
}
.div-8{
  margin: auto;
  display: block;
  margin-bottom:0px; 
  padding-right:30px; 
  padding-top:10px
}
.header-2{
   margin-bottom: 0px;
  margin-top: 14px;
  padding-top: 22px;
  font-size: 15pt;
  padding-left: 30px;
}
.div-9{
   margin-top: 14px;
   padding-top:0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  padding-left:20px

}
</style>


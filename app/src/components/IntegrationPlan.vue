<template>
  <div >
      <q-separator />
       <q-expansion-item 
        group="somegroup"
        :label="title"
        :header-class="{ 'bg-green text-white' : intervention.completed }"
        header-style="font-size:18pt; font-weight:600; height:60px; padding-left:30px"
        :expand-icon-class="{'text-white' : intervention.completed}"
         @click="cancelIntervention"
        class="width-1"
      >
        <q-card>
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
            <div class="div-1">
              Related Processes:  <q-chip class="chip" dense v-for="tag in intervention.linked_processes_id" :label="tag" :key="tag"></q-chip>
            </div>
            <div class="div-2">
              Description:
              <br>
            </div>
            <div class="row">
              <q-item-section class="col-9 section-2">
              {{this.description}}
               <!-- <span style="width:540px; font-family: 'Nunito Sans', sans-serif;font-weight:300" v-if="!readMoreActivated">{{this.intervention.interventionType.slice(0, 200)}}   </span>
                <a class="" style="font-family: 'Nunito Sans', sans-serif;font-weight:300" v-if="!readMoreActivated && intervention.description.length >200" @click="activateReadMore" href="javascript:void(0)">
                  Read more...
                </a> -->
                <span class="span" v-if="readMoreActivated" v-html="description"></span>
              </q-item-section>
              <q-item-section class="col section-3">
                <q-btn size="11px" class="button-1" no-caps  unelevated rounded color="info"  :disable="intervention.completed" :id="intervention.id" :label="$t('button.edit_action')" @click="editIntervention($event, intervention)"  />
                <q-btn size="11px" class="button-2" no-caps  unelevated rounded color="accent" :disable="intervention.completed" :label="$t('button.validate')" :id="intervention.id" @click="validateIntervention($event, intervention)" />
              </q-item-section>
            </div>
            <div class=" q-gutter-sm  col pad-left">
              <q-card-section :hidden="hideForm" class="section">
                <div class="div-3" >
                  <div class="div-4">
                    Edit {{intervention.title}}
                  </div>
                  <div class="div-5">
                  <div class=" q-pa-xsm row div-6" >
                    <div class=" q-pa-xsm col-4">
                      <h5 class="header"> Title </h5>
                    </div>
                    <div class="col-8 div-7">
                      <q-input  dense   bg-color="white" standout outlined v-model="model.title" />
                    </div>
                  </div>

                <div class=" q-pa-xsm row div-6">
                  <div class=" q-pa-xsm col-4">
                    <h5 class="header"> Description </h5>
                  </div>
                  <div class="col-8 div-8" >
                    <q-input  dense  type="textarea" bg-color="white" standout outlined v-model="model.description" />
                  </div>
                </div>

                <div class=" q-pa-xsm row center" >
                  <div class=" q-pa-xsm col-4">
                    <h5 class="header-2"> Related processes </h5>
                  </div>
                  <div class=" q-pa-md col-8 div-9">
                    <q-select
                        filled
                        clearable
                        v-model="model.linked_processes_id"
                        multiple
                        :options="the_processes_list"
                        bg-color="white"
                        :label="$t('input_labels.related_processes')"
                        class="width-2"
                      />
                  </div>
                </div>
      
                <div class=" q-pa-xsm row center" >
                  <div class=" q-pa-xsm col-4">
                    <h5 class="header-2">  Type </h5>
                  </div>
                  <div class=" q-pa-md col-8 div-9" >
                    <q-select
                        filled
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
        <div class=center>
        <q-btn class="delete-button" unelevated  no-caps  :label="$t('button.cancel')" @click="cancelIntervention($event)" />
        <q-btn  class="button" unelevated no-caps color="accent" :label="$t('button.save')" :id="the_intervention_plan.id" @click="saveIntervention($event, intervention)" />
        </div>
          </div>
          </div>
      </q-card-section>
           </div>
          </q-card-section>
          
        </q-card>
      </q-expansion-item>
      
      <q-separator />
    </div>
</template>

<script>
export default {
  name: "InterventionPlan",
  data(){
    return{
     readMoreActivated:false
    }
  },
  components: {},
  props:["title","description", "the_intervention_plan", "model", "intervention", "the_processes_list", "hideForm", "intervention_categories", "completionDoc"],
  computed: {},
  mounted() {},
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
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('cancelIntervention')

    },
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
  margin-left:45px; 
  margin-right:30px
}
.button-2{
  width:105px;
  margin-bottom:0px;
  border-radius:2px;
  margin-left:45px; 
  margin-right:30px
}
.center{
  text-align: center;
}
.width-1{
  width: 750px;
}
.width-2{
  width: 450px;
}
.section{
  padding-left:0px; 
  padding-right:0px
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
  font-size:15pt; 
  width:570px
}
.span{
  width:540px; 
  font-family: 'Nunito Sans', sans-serif;
  font-weight:300
}
.section-3{
  text-align:right; 
  margin-left:0px
}
.pad-left{
  padding-left:0px; 
  text-align:left;
}
.div-3{
  background-color:#efefef; 
  padding-left:0px; 
  padding-right:0px
}
.div-4{
  padding-left:30px; 
  font-size:15pt; 
  padding-top:20px
}
.div-5{
  display:inline-block; 
  width:750px;
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
  text-align:left; 
  padding-left:30px
}
.div-9{
  margin-top:14px; 
  margin-bottom:0px; 
  padding-bottom:0px
}
</style>


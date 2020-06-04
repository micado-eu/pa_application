<template>
  <div >
      <q-separator />
       <q-expansion-item 
        group="somegroup"
        :label="intervention.intervention_title"
        :header-class="{ 'bg-secondary text-white' : intervention.validated }"
        header-style="font-size:18pt; font-weight:600; height:60px; padding-left:30px"
        :expand-icon-class="{'text-white' : intervention.validated}"
         @click="cancelIntervention"
         style="width:750px;"
      >
        <q-card>
          <q-card-section style="padding-left:0px; padding-right:0px">
            <div style="padding-top:10px;padding-left:30px; font-size:15pt" >
              Related Processes:  <q-chip style="font-size:13pt; font-weight:300; border-radius:2px" dense v-for="tag in intervention.linked_processes_id" :label="tag" :key="tag"></q-chip>
            </div>
            <div style="padding-left:30px; font-size:15pt">
              Description:
              <br>
            </div>
            <div class="row">
              <q-item-section class="col-9" style="padding-left:30px; font-size:15pt; width:570px">
                <span style="width:540px; font-family: 'Nunito Sans', sans-serif;font-weight:300" v-if="!readMoreActivated">{{intervention.description.slice(0, 200)}}   </span>
                <a class="" style="font-family: 'Nunito Sans', sans-serif;font-weight:300" v-if="!readMoreActivated && intervention.description.length >200" @click="activateReadMore" href="javascript:void(0)">
                  Read more...
                </a>
                <span style="width:540px; font-family: 'Nunito Sans', sans-serif;font-weight:300" v-if="readMoreActivated" v-html="intervention.description"></span>
              </q-item-section>
              <q-item-section class="col" style="text-align:right; margin-left:0px">
                <q-btn size="11px" no-caps style="width:105px;margin-bottom:10px;border-radius:2px;margin-left:45px; margin-right:30px" unelevated rounded color="info"  :disable="intervention.validated" :id="intervention.id" label="Edit action" @click="editIntervention($event)"  />
                <q-btn size="11px" no-caps style="width:105px;margin-bottom:0px;border-radius:2px;margin-left:45px; margin-right:30px" unelevated rounded color="accent" :disable="intervention.validated" label="Validate" :id="intervention.id" @click="validateIntervention($event)" />
              </q-item-section>
            </div>
            <div class=" q-gutter-sm  col" style="padding-left:0px; text-align:left;">
              <q-card-section :hidden="hideForm" style="padding-left:0px; padding-right:0px">
                <div style="background-color:#efefef; padding-left:0px; padding-right:0px" >
                  <div style="padding-left:30px; font-size:15pt; padding-top:20px">
                    Edit {{intervention.intervention_title}}
                  </div>
                  <div class=" " style="display:inline-block; width:750px;border-width:2px;  margin-bottom: 1px">
                  <div class=" q-pa-xsm row" style="text-align:center; padding-left:30px">
                    <div class=" q-pa-xsm col-4">
                      <h5 style="text-align:left;margin-bottom:0px; font-size:15pt"> Title </h5>
                    </div>
                    <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-right:30px">
                      <q-input  dense   bg-color="white" standout outlined v-model="model.intervention_title" />
                    </div>
                  </div>

                <div class=" q-pa-xsm row" style="text-align:center; padding-left:30px">
                  <div class=" q-pa-xsm col-4">
                    <h5 style="text-align:left;margin-bottom:0px; font-size:15pt"> Description </h5>
                  </div>
                  <div class="col-8" style="margin: auto;display: block;margin-bottom:0px; padding-right:30px; padding-top:10px">
                    <q-input  dense  type="textarea" bg-color="white" standout outlined v-model="model.description" />
                  </div>
                </div>

                <div class=" q-pa-xsm row" style="text-align:center">
                  <div class=" q-pa-xsm col-4">
                    <h5 style="text-align:left; padding-left:30px"> Related processes </h5>
                  </div>
                  <div class=" q-pa-md col-8" style="margin-top:14px; margin-bottom:0px; padding-bottom:0px">
                    <q-select
                        filled
                        clearable
                        v-model="model.linked_processes_id"
                        multiple
                        :options="the_processes_list"
                        bg-color="white"
                        label="Related Processes"
                        style="width: 450px"
                      />
                  </div>
                </div>
      
                <div class=" q-pa-xsm row" style="text-align:center">
                  <div class=" q-pa-xsm col-4">
                    <h5 style="text-align:left; padding-left:30px">  Category </h5>
                  </div>
                  <div class=" q-pa-md col-8" style="margin-top:14px; margin-bottom:0px; padding-bottom:0px">
                    <q-select
                        filled
                        clearable
                        bg-coloe="white"
                        v-model="model.category"
                        :options="intervention_categories"
                        bg-color="white"
                        label="Intervention Category"
                        style="width: 450px"
                      />
                  </div>
                </div>

        <div class="q-gutter-sm">
         </div>
        <div style="text-align:center">
        <q-btn class="button"  style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px" unelevated  no-caps  label="Cancel" @click="cancelIntervention($event)" />
        <q-btn  style="margin-top:15px;border-radius:2px; margin-right:10px; margin-bottom:10px" unelevated no-caps color="accent" label="Save Changes" :id="the_intervention_plan.id" @click="saveIntervention($event)" />
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
  props:["title", "the_intervention_plan", "model", "intervention", "the_processes_list", "hideForm", "intervention_categories"],
  computed: {},
  mounted() {},
  methods: {
     activateReadMore(){
        this.readMoreActivated = true;
    },
    editIntervention(event){
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('editIntervention', targetId)

    },
    validateIntervention(event){

    },
    saveIntervention(event){
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('saveIntervention', targetId)

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
.button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
</style>


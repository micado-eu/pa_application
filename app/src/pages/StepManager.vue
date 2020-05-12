  <template>
  <div class="container" >
   <div >
   <div class="col" style="display:inline-block;text-align:left;width:600px">
   <h5> Manage Steps </h5>
  </div>
  <div class="col" style="display:inline-block;text-align:right;padding-right:15px">
   <q-btn style="width:135px; margin-bottom:15px" color="accent" rounded label="Add step" no-caps size="15px" @click="addNode" />
  </div>
  </div>
    <div >
    <q-card class="my-card">
      <q-card-section>
<cytoscape ref="cyRef" :config="configcy"  v-on:cxttapstart="updateNode($event, def)" :preConfig="preConfig" :afterCreated="afterCreated">
          <cy-element
            v-for="def in testdata"
            :key="`${def.data.id}`"
            :definition="def"
            
            v-on:mousedown="editStep($event, def)"
          />

        </cytoscape>  
            </q-card-section>
    </q-card>
    <div style="text-align:center; padding-top:40px" v-if="this.editing">
  <div class=" q-pa-lg" style="display:inline-block; width:750px;border-width:2px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step Name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="edit_step.title" />
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step location </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="edit_step.location"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step cost </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="edit_step.cost"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Required documents </h5>
      </div>
      <div class=" q-pa-md col-8">
     <q-select
        filled
        clearable
        
        v-model="edit_step.required_documents"
        multiple
        :options="documents_list"
        
        label="Required documents"
        style="width: 450px"
      />
      </div>
      </div>
      
       <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Linked processes </h5>
      </div>
      <div class=" q-pa-md col-8">
     <q-select
        filled
        
        clearable
        
        v-model="edit_step.linked_processes"
        multiple
        :options="processes_list"
        
        label="linked processes"
        style="width: 450px"
      />
      </div>
      </div>

      

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Step description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input  type="textarea" dense  bg-color="grey-3" filled v-model="edit_step.description"  />
      </div>
    </div>


   
    
    
   
  </div>
  <div class="row">
    <div class="q-pa-md col-6" style="text-align:right">
    <q-btn color="red" label="Save" @click="saveStep(edit_step)" style="width:150px" />
    </div>
    <div class="q-pa-md col-6" style="text-align:left">
    <q-btn color="red" label="Back"  style="width:150px"/>
    </div>
    </div>
</div>
    </div>
  </div>
</template>


<script>
import Step from 'components/Step'
//import { Core, EventObject } from 'cytoscape'
import configcy from '../configs/cytoscapeConfig'
import edgeHandles from 'cytoscape-edgehandles'

export default {
  //name: 'DocumentType',
  
  props: {
    msg: String
  },
  components: {
   Step
  },
  data () {
    return {
      id:this.$route.params.id,
        configcy,
        is_new: false,
        testdata: [
             
           ],
           editing: false,
      step_list:[],
       documents_list: [
        "document_1",
        "document_2",
        "document_3",
        "document_4",
        "document_5"
      ],
      processes_list:[
        "How to certify education degree",
        "Renewal of residence permit for working reasons", 
        "How to get driver licence recognized",
        "How to get access to public funded housing",
        "How to enroll children to school"
      ],
      edit_step: {
        title:"",
        location:"",
        cost:"",
        required_documents:[],
        linked_processes:[],
        description:"", 
        process_id:[]
      }
    }
    
  },

  computed: {
     processes () {
      return this.$store.state.flows.flows
    },
    steps() {
      return this.$store.state.steps.steps
    },
    
  },
  methods: {
    deleteStep(value) {
      var deletedSteps = this.steps.filter((filt) => {
          //console.log("in fil")
          //console.log(filt.id == value)
          return filt.id == value
        })  
      this.$store.dispatch('steps/deleteSteps', deletedSteps[0].id)
    },
  preConfig(cytoscape) {
    console.log("calling pre-config");

    // register edgehandles extension
    if (typeof cytoscape('core', 'edgehandles') !== 'function') {
      cytoscape.use(edgeHandles)
    }
},

    editStep(event, node) {
      console.log("editing")
      this.editing = true
      this.cy.edgehandles();
      console.log("I am the new data label" + node.data.title)
      var current_node_id = node.data.id
      var selected_step = this.testdata.filter((filt) => {
          //console.log("in fil")
          //console.log(filt)
          //console.log(typeof(current_node_id))
          //console.log(typeof(this.testdata[0].data.id))
          //console.log(filt.data.id == current_node_id)
          return filt.data.id == current_node_id
        }) 
        console.log(selected_step) 
    if(selected_step[0].data.title =="new step"){
      this.is_new = true
      this.edit_step = selected_step[0].data
      console.log("i'm new")
    }
    else {
      console.log("I'm old")
      this.is_new = false
      this.edit_step = selected_step[0].data
    }
    },

    saveStep(value) {
        if(this.is_new){
          this.$store.dispatch('steps/saveSteps', value)
          console.log("I am the store")
          console.log(this.$store.state.steps)
          //console.log(this.edit_step.id)
          //this.$router.push({ path: `/processmanager/edit//${this.edit_process.id}` })
          this.editing = false
        }
        else{
          console.log(this.is_new)
          this.$store.dispatch('steps/editSteps', value);
        //console.log(value)
        //console.log(this.steps)
        console.log("I am the store")
        console.log(this.$store.state.steps)
        this.editing = false
     }
   },


        addNode(event, cy) {
          console.log(event.target);
  //      if (event.target === this.$refs.cyRef.instance)
          console.log("adding", this.cy);
          this.cy.add({
            group: 'nodes',
            data: { 
              id:999, 
              title:"new step",
              location:"",
              cost:"",
              required_documents:[],
              linked_processes:[],
              description:"", 
              process_id:[this.id] },
            position: { x: 300, y: 250 }, 
          })
          console.log(this.cy.data())
          this.testdata.push({
            group: 'nodes',
            data: { 
              id:999, 
              title:"new step",
              location:"",
              cost:"",
              required_documents:[],
              linked_processes:[],
              description:"", 
              process_id:[this.id] },
            position: { x: 250, y: 250 }, 
          })
          console.log(this.testdata)
          console.log("adding node", event.target);
          },

    updateNode(event, node) {
      console.log("right click node", event)
      console.log(node)
    },
        
    deleteNode(event, node) {
      console.log("node clicked", node);
      if(node.group === 'nodes'){
        console.log(node.data.id)
      }

    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      
      console.log("after created", cy);
      this.cy = cy;
      console.log(this.testdata)
       
      cy.resize();
      //console.log("i'm here")
      
    },


  },



  created () {
    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('flows/fetchFlows')
      .then(processes => {
        this.loading = false
      })  
    console.log(this.$store);
    this.$store.dispatch('steps/fetchSteps')
      .then(steps => {
           var filteredSteps =  this.steps.filter((filt) => {
          //console.log("in fil")
          //console.log(filt)
          //console.log(typeof(this.id))
         //console.log(filt.process_id)
          return filt.process_id.includes(this.id)
        })  
        console.log(filteredSteps)
        for(var i = 0; i<filteredSteps.length;i++){
         var next_x = 200
         var next_y = 200 + 50 * i
         var step_nodes = {
           group: 'nodes',
          data:{
            id:filteredSteps[i].id, 
            title:filteredSteps[i].title,
            location: filteredSteps[i].location,
            cost:filteredSteps[i].cost,
            required_documents:filteredSteps[i].required_documents,
            linked_processes:filteredSteps[i].linked_processes,
            description:filteredSteps[i].description, 
            process_id:filteredSteps[i].process_id, 
            },
          position: { x: filteredSteps[i].horizontal, y:filteredSteps[i].vertical} }
         this.testdata.push(step_nodes)
      }
        this.loading = false
      })  
      
  }, 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;
}


</style>

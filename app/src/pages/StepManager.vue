  <template>
  <div class="container" >
   <div >
   <div class="col" style="display:inline-block;text-align:left;width:600px">
   <h5> Manage Steps </h5>
  </div>
  <div class="col" style="display:inline-block;text-align:right;padding-right:15px">
   <q-btn style="width:135px; margin-bottom:15px;border-radius:2px" color="accent"  unelevated rounded label="Add step" no-caps size="15px" @click="addNode" />
  </div>
  <div class="col" style="display:inline-block;text-align:right;padding-right:15px">
   <q-btn style="width:135px; margin-bottom:15px;border-radius:2px" color="accent"  unelevated rounded label="Save Graph" no-caps size="15px" @click="saveGraph" />
  </div>
  </div>
    <div >
    <q-card class="my-card">
      <q-card-section>
<cytoscape ref="cyRef" :config="configcy" :preConfig="preConfig" :afterCreated="afterCreated">
          <cy-element
            v-for="def in testdata"
            :key="`${def.data.id}`"
            :definition="def"
            v-on:click="editStep($event, def)"
            v-on:cxttapstart="deleteNode($event, def)"
          />

        </cytoscape>  
            </q-card-section>
    </q-card>
    <div style="text-align:center; padding-top:40px" v-if="this.editing">
  <div class=" q-pa-lg" style="display:inline-block; width:750px;border-width:2px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Step Name </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="edit_step.data.title" />
      </div>
    </div>
    
   
    
    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Step location </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="edit_step.data.location"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" >
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left;margin-bottom:0px"> Step cost </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;margin-bottom:0px">
        <q-input rounded dense  bg-color="grey-3" standout outlined v-model="edit_step.data.cost"  />
      </div>
    </div>

    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Required documents </h5>
      </div>
      <div class=" q-pa-md col-8" style="margin-top:14px; margin-bottom:0px; padding-bottom:0px">
     <q-select
        filled
        clearable
        
        v-model="edit_step.data.required_documents"
        multiple
        :options="documents_list"
        
        label="Required documents"
        style="width: 450px"
      />
      </div>
      </div>
      
       <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left; margin-top:14px"> Linked processes </h5>
      </div>
      <div class=" q-pa-md col-8" style="padding-top:0px">
     <q-select
        filled
        
        clearable
        
        v-model="edit_step.data.linked_processes"
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
    <q-btn color="accent"  unelevated label="Save" @click="saveStep(edit_step)" style="width:150px;border-radius:2px" />
    </div>
    <div class="q-pa-md col-6" style="text-align:left">
    <q-btn color="info"  unelevated label="Back"  style="width:150px;border-radius:2px"/>
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
        graph_id: null, 
           testdata:[],
           editing: false,
      selected_node:"",
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
        data:{
        title:"",
        location:"",
        cost:"",
        required_documents:[],
        linked_processes:[],
        description:"", 
        process_id:[]
        },
        group:"", 
        position:{}
      },
    }
    },
    
    
  

  computed: {
     processes () {
      return this.$store.state.flows.flows
    },
    steps() {
      return this.$store.state.steps.steps
    },
     graphs() {
      return this.$store.state.graphs.graphs
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
      console.log(node)
      if(node.group == "nodes"){
      console.log("editing")
      this.editing = true
      
    
      console.log("I'm old")
      this.is_new = false
      this.edit_step =  JSON.parse(JSON.stringify(node))
      console.log("this is edit step")

      console.log(this.edit_step)
    
    }},

    saveStep(value) {
     
       console.log(value)
       console.log("value above")
          let my_elements = []
     var nodes = this.cy.elements().nodes().jsons()
     var edges = this.cy.elements().edges().jsons()
     for( let i = 0; i< nodes.length; i++){
       my_elements.push(nodes[i])
     }
     for( let i = 0; i< edges.length; i++){
       my_elements.push(edges[i])
     }
     for(let i = 0; i < my_elements.length; i++){
          console.log(my_elements[i].classes)
          if(my_elements[i].classes == "eh-handle"){
            my_elements.splice(i, 1)
          }
        }
     var index = my_elements.findIndex(item => item.data.id == value.data.id)
     console.log("this is the index")
     console.log(index)
     my_elements.splice(index, 1, value)

      var data_index = this.testdata.findIndex(item => item.data.id == value.data.id)
      console.log("this is the index")
     console.log(index)
     this.testdata.splice(data_index, 1, value)

     
        console.log("these are the elements")
        console.log(my_elements)
    if(this.graph_id != null){
         var edit_graph = {
           id_graph: this.graph_id, 
           elements:my_elements,
           graph_process: this.id
         }
          this.$store.dispatch('graphs/editGraphs', edit_graph)
          console.log("I am the store")
          console.log(this.$store.state.graphs)
     }
     else{
       var edit_graph ={
           id_graph: 999, 
           elements:my_elements,
           graph_process: this.id
         }
          this.$store.dispatch('graphs/saveGraphs', edit_graph)
          console.log("I am the store")
          console.log(this.$store.state.graphs)
     }
          

        this.editing = false
     
   },
   saveGraph() {
      /*console.log("initial test data")
          console.log(this.testdata)
          var edges = this.cy.elements().edges().jsons()
          console.log(edges)
          for (let i = 0; i< edges.length; i++)
          {
            var filteredData = this.testdata.filter((filt) => {
              console.log(filt.data.id == edges[i].data.id)
              return filt.data.id == edges[i].data.id
            })
            console.log("I am filtered data")
            console.log(filteredData)
            if(filteredData.length != 0){
              console.log("i'm in")
             var index = edges.findIndex(item => item.data.id == filteredData[0].data.id)
            console.log("this is the index")
              console.log(index)
              edges.splice(index, 1)
              console.log("edges")
              console.log(edges)
          }
          }
          
          for(let j = 0; j < edges.length; j++){
            this.testdata.push(edges[j])
          }
          console.log("middle test data")
          console.log(this.testdata)*/
     let my_elements = []
     var nodes = this.cy.elements().nodes().jsons()
     var edges = this.cy.elements().edges().jsons()
     for( let i = 0; i< nodes.length; i++){
       my_elements.push(nodes[i])
     }
     for( let i = 0; i< edges.length; i++){
       my_elements.push(edges[i])
     }


     for(let i = 0; i < my_elements.length; i++){
          console.log(my_elements[i].classes)
          if(my_elements[i].classes == "eh-handle"){
            my_elements.splice(i, 1)
          }
        }
     console.log("this are the elements")
     console.log(my_elements)
     if(this.graph_id != null){
         var edit_graph ={
           id_graph: this.graph_id, 
           elements:my_elements,
           graph_process: this.id
         }
          this.$store.dispatch('graphs/editGraphs', edit_graph)
          console.log("I am the store")
          console.log(this.$store.state.graphs)
     }
     else{
       var edit_graph ={
           id_graph: 999, 
           elements:my_elements,
           graph_process: this.id
         }
          this.$store.dispatch('graphs/saveGraphs', edit_graph)
          console.log("I am the store")
          console.log(this.$store.state.graphs)
     }
          
   },


        addNode(event, cy) {
         
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
          console.log("final test data")
          console.log(this.testdata)
          console.log(this.cy.elements().edges().jsons())
          console.log("adding node", event.target);
          },

    /*updateNode(event, node) {
      console.log("right click node", event)
      console.log(node)
    },*/
        
    deleteNode(event, node, cy) {
      
      console.log("these are the testdata")
      
      console.log(this.cy.elements().edges().jsons())
      console.log(this.testdata)
      console.log("node clicked", node);
       console.log("removed")
       var data_index = this.testdata.findIndex(item => item.data.id == node.data.id)
      console.log("this is the index")
     console.log(data_index)
     this.testdata.splice(data_index, 1)
       console.log(this.cy.elements().nodes().jsons())
      console.log(this.cy.elements().edges().jsons())
      console.log(this.testdata)

    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      
      console.log("after created", cy);
      this.cy = cy;
      console.log(this.testdata)
       this.cy.edgehandles();
       //cy.layout({ name: 'cose' }).run();
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
        this.loading = false
      }) 
    console.log(this.$store);
    this.$store.dispatch('graphs/fetchGraphs')
      .then(graphs => {
          var filteredGraphs =  this.graphs.filter((filt) => {
          //console.log("in fil")
          //console.log(filt)
          //console.log(typeof(this.id))
         //console.log(filt.process_id)
          return filt.graph_process == this.id
        })  
        console.log(filteredGraphs)
        var my_graph = filteredGraphs[0]
        if(my_graph != null){
        this.graph_id = my_graph.id_graph
      
        console.log("this is the graph id" + this.graph_id)
        console.log(my_graph)
        for(var i = 0; i < my_graph.elements.length;i++){
         this.testdata.push(my_graph.elements[i])
      }
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

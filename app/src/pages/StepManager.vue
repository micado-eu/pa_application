  <template>
  <div class="container" >
   <div >
   <div class="col" style="display:inline-block;text-align:left;width:600px">
   <h5> Manage Steps </h5>
  </div>
  <div class="col" style="display:inline-block;text-align:right;padding-right:15px">
   <q-btn style="width:135px; margin-bottom:15px" color="accent" rounded label="Add step" no-caps size="15px" to="/edit_step/" />
  </div>
  </div>
    <div >
    <q-list style="display:inline-block;width:750px" >
        <Step v-for="step in filteredSteps"
         :key="step.id"
         :Title="step.title"
         :Link="step.id"
         @remove="deleteStep"
         :Back="id">
        </Step>
    </q-list>
    <cytoscape ref="flow_cyt" :config="configcy" v-on:mousedown="addNode" v-on:cxttapstart="updateNode" :preConfig="preConfig" :afterCreated="afterCreated">
          <cy-element
            v-for="def in testdata"
            :key="`${def.data.id}`"
            :definition="def"
            v-on:mousedown="deleteNode($event, def)"
          />

        </cytoscape>
    </div>
  </div>
</template>


<script>
import Step from 'components/Step'
//import { Core, EventObject } from 'cytoscape'
import configcy from '../configs/cytoscapeConfig'

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
        testdata: [{"data":{"id":"a","data":{"id":"n", "data": {"longitude":41, "latitude": 7, "documents":[{"id":1,"type":"adoc"}]} } }},
             {"data":{"id": "b","data":{"id":"n", "data": {"longitude":41, "latitude": 7, "documents":[{"id":1,"type":"adoc"}]} } }},
             {"data": { "id": "ab", "source": "a", "target": "b" }}
           ],
      step_list:[]
    }
  },

  computed: {
     processes () {
      return this.$store.state.flows.flows
    },
    steps() {
      return this.$store.state.steps.steps
    },
     filteredSteps() {
         console.log("hello")
         return this.steps.filter((filt) => {
          console.log("in fil")
          console.log(filt)
          console.log(typeof(this.id))
         console.log(filt.process_id)
          return filt.process_id.includes(this.id)
        })  
         
     }
  },
  methods: {
    deleteStep(value) {
      var deletedSteps = this.steps.filter((filt) => {
          console.log("in fil")
          console.log(filt.id == value)
          return filt.id == value
        })  
      this.$store.dispatch('steps/deleteSteps', deletedSteps[0].id)
    },
    preConfig(cytoscape) {
    //console.log(config);

    //console.log(this.configCyto);
//    console.log(this.configcyt);
//    console.log(configcyt);
      console.log("calling pre-config", cytoscape);
    },
        addNode(event) {
      console.log(event.target);
  //    if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    updateNode(event) {
      console.log("right click node", event);
    },
        deleteNode(event, node) {
      console.log("node clicked", node);
      if(node.group === 'nodes'){
        console.log(node.data.id);
        console.log(node.data.data.longitude);
//        this.$store.commit("flows/setNodePanelVisible", "");

//        this.$store.commit("flows/setDocuments", node.data.data.documents);

      }

    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("after created", cy);
      cy.resize();
    }
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
  }
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

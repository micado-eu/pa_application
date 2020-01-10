<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-list bordered  >
          <q-expansion-item v-for="flow in flows" group="somegroup" :label="flow.title" header-class="text-primary" :key="flow.id" @show="showFlow(flow.id)">
            <q-card>

              <q-card-section>
                {{ flow.text }}


              </q-card-section>
          </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn round color="primary" icon="add">
          <q-tooltip>
            Add a new process
          </q-tooltip>
        </q-btn>
        <q-card class="my-card">
          <q-card-section>
            <q-input color="lime-11" bg-color="green" filled v-model="text" label="Title">
            </q-input>
            <q-input color="lime-11" bg-color="green" filled v-model="text" label="Description">
            </q-input>
            <q-list >
              <q-item-label header>Process steps</q-item-label>
              <q-item v-for="step  in steps" :key="step.id">

              </q-item>
            </q-list>
            <q-btn round color="primary" icon="add">
              <q-tooltip>
                Add a new step
              </q-tooltip>
            </q-btn>
            <q-card class="my-card">
              <q-card-section>
                <q-input color="lime-11" bg-color="green" filled v-model="text" label="Title">
                </q-input>
                <q-card class="my-card">
                  <q-card-section>
                    <div class="text-h6">Documents needed for the step</div>
                  </q-card-section>
                  <q-card-section>
                    <q-option-group
                      :options="options"
                      label="Documents"
                      type="checkbox"
                      v-model="group"
                    />
                  </q-card-section>
                </q-card>
                <q-list >
                  <q-item-label header>Process steps</q-item-label>
                  <q-item v-for="step  in steps" :key="step.id">

                  </q-item>
                </q-list>
                <q-btn rounded color="primary" icon="add">
                  <q-tooltip>
                    Save
                  </q-tooltip>
                </q-btn>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          v-model="mermaid"
          filled
          autogrow
        >
          <template v-slot:append>
            <q-icon name="send" @click="actCode" class="cursor-pointer" />
          </template>
         </q-input>
      </div>
      <div class="col">
        <vue-mermaid
              :nodes="theFlow"
              type="graph LR"
              :config="merconf"
              ></vue-mermaid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      mermaid: "",
      group: [],
      options: [
        { label: 'Fiscal document', value: 'bat' },
        { label: "University's registration certificate", value: 'friend' },
        { label: 'Work contract', value: 'upload'}
      ],
      merconf: { theme: "default", startOnLoad: false, securityLevel: 'loose' }
    }
  },
  computed: {
    flows () {
      return this.$store.state.flows.flows
    },
    steps() {
      return this.$store.state.flows.steps
    },
    documents() {
      return this.$store.state.flows.documents
    },
    theFlow () {
      return this.$store.state.flows.theFlow
    }
  },
  methods: {
    showFlow(id){
      console.log("opened accordion")
      console.log(id)
      const element = this.flows.filter(f => f.id == id);
      console.log(element)
      const elementFlow = element[0].mermaid
      console.log(elementFlow)
      this.mermaid = JSON.stringify(elementFlow, null, '\t')
//      this.mermaid = elementFlow
      this.$store.commit("flows/setNodePanelVisible", "hidden");

    },
    actCode() {
      console.log("in actCode")
      console.log(this.mermaid)
      const jCode = JSON.parse(this.mermaid)
      console.log(jCode)
      this.$store.commit("flows/setTheFlows", jCode);

    }
  },
  created () {
//    this.loading = true
    console.log(this.$store);
    this.$store.dispatch('flows/fetchFlows')
      .then(flows => {
//        this.loading = false
      })
  }
}
</script>

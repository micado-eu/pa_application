<template>
  <div id="example-five" class="container mb-3 mt-3">
    <vue-form-json-schema
      v-if="this.loaded"
      v-model="model"
      :schema="schema"
      :ui-schema="uiSchema"
      v-on:state-change="onChangeState"
      v-on:validated="onValidated"
    ></vue-form-json-schema>
    <div class="alert alert-info" v-if="!this.loaded">
      <h4 class="alert-heading">Hang on!</h4>
      <div>Loading form...</div>
    </div>
    <div v-if="this.loaded" class="text-center mt-2">
      <button class="btn btn-primary" @click="getForm">Reload form</button>
    </div>

    <hr>


    <h4>Valid</h4>
    <div>{{ valid }}</div>
    <div>{{ model }}</div>
  </div>
</template>

<script>
// Import VueFormJsonSchema
import VueFormJsonSchema from 'vue-form-json-schema/dist/vue-form-json-schema.esm.js';
// We use a component to display JSON in a pretty way
// it is NOT included NOR required by VueFormJsonSchema

export default {
  name: "example-one",
  components: {
    "vue-form-json-schema": VueFormJsonSchema
  },
  data() {
    return {
      model: {},
      state: {},
      valid: false,
      schema: {},
      uiSchema: [],
      loaded: false,
      delay: 5000
    };
  },
  methods: {
    onChangeState(value) {
      this.state = value;
    },
    onValidated(value) {
      this.valid = value;
    },
    getUiSchemaFromAPI() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              component: "input",
              model: "firstName",
              fieldOptions: {
                class: ["form-control"],
                on: ["input"],
                attrs: {
                  placeholder: "Please enter your first name"
                }
              }
            }
          ]);
        }, this.delay);
      });
    },
    getSchemaFromAPI() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            type: "object",
            required: ["firstName"],
            properties: {
              firstName: {
                type: "string"
              }
            }
          });
        }, this.delay);
      });
    },
    getDataFromAPI() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            firstName: "Tobias"
          });
        }, this.delay);
      });
    },
    getForm() {
      // Reset properties
      this.uiSchema = [];
      this.schema = [];
      this.model = [];

      // Set form as not loaded
      this.loaded = false;

      // Get the data from the API
      return Promise.all([
        this.getUiSchemaFromAPI(),
        this.getSchemaFromAPI(),
        this.getDataFromAPI()
      ]).then(([uiSchema, schema, model]) => {
        // Update the form properties with data from the API
        this.uiSchema = uiSchema;
        this.schema = schema;
        this.model = model;

        // Set form as loaded
        this.loaded = true;
      });
    }
  },
  created() {
    this.getForm();
  }
};
</script>

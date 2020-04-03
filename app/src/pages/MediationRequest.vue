<template>
  <div id="example-five" class="container mb-3 mt-3">
    <vue-form-json-schema
      v-if="this.loaded"
      v-model="model"
      :schema="schema"
      :options="options"
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
      options: {
        castToSchemaType: true
      },
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
              component: "q-input",
              model: "customer",
              fieldOptions: {
                class: ["form-control"],
                on: ["input"],
                attrs: {
                  label: "Customer"
                }
              }
            },
            {
              "component": "div",
              "fieldOptions": {
                "attrs": {
                  "for": "first-name"
                },
                "class": [
                  "font-weight-bold"
                ],
                "domProps": {
                  "innerHTML": "Requiring Entity"
                }
              }
            },
            {
              "component": "hr",
              "fieldOptions": {
                "attrs": {
                  "color": "teal"
                }
              }
            },
            {
              "component": "q-checkbox",
              "model": "auth_entity",
              "fieldOptions": {
                on: ["input"],
                "attrs": {
                  "label": "Authorized entity?"
                }
              }
            },
            {
              "component": "q-input",
              "model": "department",
              "fieldOptions": {
                on: ["input"],
                "attrs": {
                  "label": "Department",
                }
              }
            },
            {
              "component": "q-input",
              "model": "requester",
              "fieldOptions": {
                on: ["input"],
                "attrs": {
                  "label": "Requester",
                }
              }
            },
            {
              "component": "q-input",
              "model": "date_request",
              "fieldOptions": {
                on: ["input"],
                "attrs": {
                  "label": "Date of request",
                  "type":"date"
                }
              }
            },
            {
              "component": "q-input",
              "model": "email",
              "fieldOptions": {
                on: ["input"],
                "attrs": {
                  "label": "e-mail",
                  "type":"email"
                }
              }
            },
            {
              "component": "q-input",
              "model": "phone",
              "fieldOptions": {
                on: ["input"],
                "attrs": {
                  "label": "Requester's phone",
                  "type":"tel"
                }
              }
            },
            {
              "component": "div",
              "fieldOptions": {
                "attrs": {
                  "for": "first-name"
                },
                "class": [
                  "font-weight-bold"
                ],
                "domProps": {
                  "innerHTML": "Required service"
                }
              }
            },
            {
              "component": "hr",
              "fieldOptions": {
                "attrs": {
                  "color": "teal"
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
            required: ["customer", "auth_entity", "department", "requester", "date_request", "email", "phone"],
            properties: {
              customer: {
                type: "string"
              },
              "auth_entity": {
                "type": "boolean",
                const: true
              },
              "department": {
                "type": "string"
              },
              "requester": {
                "type": "string"
              },
              "date_request": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "phone": {
                "type": "string"
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
            customer: "ASP Bologna",
            auth_entity: true,
            date_request: ""
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

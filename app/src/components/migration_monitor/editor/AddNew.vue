<template>
  <div :id="$options.name" class="q-pa-md">
    <router-link :to="'#'+$options.name">
      <h5 @click="onClickTitle()">{{$options.name}}</h5>
    </router-link>
    <div style="text-align:center;padding-top:30px">
      <div
        class="q-pa-lg"
        style="display:inline-block; border-width:1px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; padding-top:0px; width:750px;"
      >
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Graph title</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input bg-color="grey-3" dense rounded standout outlined />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Category</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-select
              v-model="category"
              rounded
              standout
              :options="categories"
              label
              @input="onInput"
            />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Graph type</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-select v-model="type" rounded standout :options="types" label @input="onInput" />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">x axis</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input bg-color="grey-3" dense rounded standout outlined />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">y axis</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input bg-color="grey-3" dense rounded standout outlined />
          </div>
        </div>

        <div class="row" style="padding-bottom:15px;padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Graph description</h5>
          </div>
          <div class="col-8" style="display: block;">
            <q-input type="textarea" bg-color="grey-3" rounded standout outlined />
          </div>
        </div>

        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Data format</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-select
              v-model="data_format"
              rounded
              standout
              :options="formats"
              label="Standard"
              @input="onInput"
            />
          </div>
        </div>
        <div
          v-if="data_format === 'csv'"
          class="q-pa-xsm row"
          style="text-align:center;padding-right:45px"
        >
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Choose csv</h5>
          </div>
          <div class="col-6" style="margin: auto;display: block;">
            <q-file @input="getFiles" bg-color="grey-3" dense rounded standout outlined></q-file>
          </div>
          <div class="col" style="width:150px; height:100px: padding-right:45px; padding-left:15px">
            <q-img
              :src="myimage"
              spinner-color="white"
              style="max-height: 100px; max-width: 150px"
              @click="hotimage = true"
            />
            <q-dialog>
              <q-card>
                <v-hotspot
                  :init-options="hotspotConfig"
                  @save-data="saveData"
                  @after-delete="afterDelete"
                />
              </q-card>
            </q-dialog>
          </div>
        </div>

        <div
          v-if="data_format === 'JSON'"
          class="q-pa-xsm row"
          style="text-align:center;padding-right:45px"
        >
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Choose JSON</h5>
          </div>
          <div class="col-6" style="margin: auto;display: block;">
            <q-file @input="getFiles" bg-color="grey-3" dense rounded standout outlined></q-file>
          </div>
          <div class="col" style="width:150px; height:100px: padding-right:45px; padding-left:15px">
            <q-img
              :src="myimage"
              spinner-color="white"
              style="max-height: 100px; max-width: 150px"
              @click="hotimage = true"
            />
            <q-dialog>
              <q-card>
                <v-hotspot
                  :init-options="hotspotConfig"
                  @save-data="saveData"
                  @after-delete="afterDelete"
                />
              </q-card>
            </q-dialog>
          </div>
        </div>

        <div
          v-if="data_format === 'API'"
          class="q-pa-xsm row"
          style="text-align:center; padding-right:45px"
        >
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">API address</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input bg-color="grey-3" dense rounded standout outlined />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="q-pa-md col-6" style="text-align:right">
          <q-btn
            color="accent"
            unelevated
            rounded
            label="Cancel"
            style="width:100px"
            to="/document_type"
          />
        </div>
        <div class="q-pa-md col-6" style="text-align:left">
          <q-btn
            color="info"
            unelevated
            rounded
            label="Save/Update"
            style="width:150px"
            @click="saveData(edit_document)"
            to="/document_type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewGraph",

  data() {
    return {
      data_format: "JSON",
      formats: ["JSON", "csv", "API"],
      category: "",
      type: "",
      types: ["BAR", "LINE", "PIE"]
    };
  },
  computed: {
    categories() {
      return this.$store.state.statistics.categories;
    }
  },
  methods: {
    onInput: function(e) {
      console.log("Change: ", e);
    }
  }
};
</script>
<style scoped>
</style>

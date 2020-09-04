<template>
  <div :id="$options.name" class="q-pa-md">
    <div style="text-align:center;padding-top:30px">
      <div class="q-pa-lg edit-element-component">
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Chart title</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input
              bg-color="grey-3"
              dense
              standout
              outlined
              v-model="title"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Category</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input
              bg-color="grey-3"
              dense
              standout
              outlined
              v-model="category"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Chart type</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-select
              v-model="type"
              standout
              :options="types"
              label
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Board</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input
              bg-color="grey-3"
              dense
              standout
              outlined
              v-model="board"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">x axis</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input
              bg-color="grey-3"
              dense
              standout
              outlined
              v-model="x"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">y axis</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-input
              bg-color="grey-3"
              dense
              standout
              outlined
              v-model="y"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>

        <div class="row" style="padding-bottom:15px;padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Chart description</h5>
          </div>
          <div class="col-8" style="display: block;">
            <q-input type="textarea" bg-color="grey-3" standout outlined v-model="description" />
          </div>
        </div>

        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">X axis is unix-timestamp</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-checkbox color="accent" v-model="xistime" clickable />
          </div>
        </div>

        <div class="q-pa-xsm row" style="text-align:center; padding-right:45px">
          <div class="col-4" style="padding-left:40px;">
            <h5 style="text-align:left;font-size:18px">Data format</h5>
          </div>
          <div class="col-8" style="margin: auto;display: block;">
            <q-select
              v-model="data_format"
              standout
              :options="formats"
              label="Standard"
              @input="onChangeFileType"
              :rules="[val => !!val || 'Field is required']"
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
          <div class="col" style="margin: auto;display: block;">
            <q-file
              v-model="filename"
              @input="getFiles"
              bg-color="grey-3"
              dense
              standout
              outlined
              :rules="[val => !!val || 'Field is required']"
            ></q-file>
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
          <div class="col" style="margin: auto;display: block;">
            <q-file
              v-model="filename"
              @input="getFiles"
              bg-color="grey-3"
              dense
              standout
              outlined
              :rules="[val => !!val || 'Field is required']"
            ></q-file>
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
            <q-input
              bg-color="grey-3"
              dense
              standout
              outlined
              v-model="url"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="q-pa-md col-6" style="text-align:right">
          <q-btn
            color="accent"
            unelevated
            label="Cancel"
            style="width:100px"
            @click="reset()"
            to="/situation/editor"
          />
        </div>
        <div class="q-pa-md col-6" style="text-align:left">
          <q-btn
            color="info"
            unelevated
            label="Save/Update"
            style="width:150px"
            @click="addChart()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewChart",

  data() {
    return {
      title: "",
      description: "",
      x: "",
      y: "",
      url: "",
      xistime: false,
      data_format: "JSON",
      formats: ["JSON", "csv", "API"],
      category: "",
      type: "",
      types: ["BAR", "LINE", "PIE"],
      board: "",
      content: null,
      filename: null,
    };
  },
  computed: {
    categories() {
      return this.$store.state.statistics.categories.map((c) => c.category);
    },
  },
  methods: {
    addChart: function () {
      const data = {
        title: this.title,
        content: this.content,
        description: this.description,
        category: this.category,
        format: this.data_format,
        type: this.type,
        xistime: this.xistime,
        x: this.x,
        y: this.y,
        board: this.board,
      };
      this.$store
        .dispatch("statistics/addChart", data)
        .then(() => {
          this.$q.dialog({
            message: "upload succeeds, please refresh to see new charts",
          });
          // this.$router.push("/situation/editor");
        })
        .catch((err) => {
          this.$q.dialog({
            message: err,
          });
        });
    },
    reset: function () {
      this.title = "";
      this.description = "";
      this.x = "";
      this.y = "";
      this.url = "";
      this.xistime = false;
      this.data_format = "JSON";
      this.category = "";
      this.type = "";
      this.board = "";
      this.content = null;
    },
    onChangeFileType: function (e) {
      this.filename = null;
      this.content = null;
    },
    getFiles(file) {
      if (file != undefined) {
        this.filename = file;
        let reader = new FileReader();
        // Convert the file to base64 text
        // reader.readAsDataURL(file);
        reader.readAsText(file);
        reader.onload = () => {
          // Make a fileInfo Object
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            result: reader.result,
            file: file,
          };
          this.content = fileInfo.result;
        };
      } else {
        this.content = null;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$btn_secondary: #cdd0d2;
.edit-element-component {
  border: 1px solid $btn_secondary;
  border-radius: 10px;
}
</style>

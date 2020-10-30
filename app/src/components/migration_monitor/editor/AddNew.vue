<template>
  <div :id="$options.name" class="q-pa-md">
    <div style="text-align:center;padding-top:30px" class="main">
      <div class="q-pa-lg edit-element-component">
        <div class="q-pa-xsm q-mt-md row" style="text-align:center; padding-right:45px">
          <div class="col-12 q-pl-xl">
            <p class='label'>Chart Title</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-input
              bg-color="grey-3"
              dense
              standout
              v-model="title"
              :rules="[val => !!val || 'Field is required']"
              placeholder="Enter chart title here"
            />
          </div>
        </div>
        <div class="q-pa-xsm q-mt-md row" style="text-align:center; padding-right:45px">
          <div class="col-12 q-pl-xl">
            <p class='label'>Category</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-input
              bg-color="grey-3"
              dense
              standout
              v-model="category"
              :rules="[val => !!val || 'Field is required']"
              placeholder="Select category"
            />
          </div>
        </div>
        <div class="q-pa-xsm q-mt-md row" style="text-align:center; padding-right:45px">
          <div class="col-12 q-pl-xl">
            <p class='label'>Chart Type</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-select
              v-model="type"
              standout
              :options="types"
              label
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-pa-xsm q-mt-md row" style="text-align:center; padding-right:45px">
          <div class="col-12 q-pl-xl">
            <p class='label'>Board</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-input
              bg-color="grey-3"
              dense
              standout
              v-model="board"
              :rules="[val => !!val || 'Field is required']"
              placeholder="Enter board name"
            />
          </div>
        </div>
        <div class="q-pa-xsm q-mt-md row" style="text-align:center; padding-right:45px">
          <div class="col-6 q-pl-xl q-mr-l">
            <p class='label'>x Axis</p>
          </div>
          <div class="col-6 q-pl-xl">
            <p class='label'>y Axis</p>
          </div>
          <div class="col-6 q-pl-xl" >
            <q-input
              bg-color="grey-3"
              dense
              standout
              v-model="x"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
          <div class="col-6 q-pl-xl" style="margin: auto;display: block;">
            <q-input
              bg-color="grey-3"
              dense
              standout
              v-model="y"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
        
        <div class="q-mt-md row" style="padding-bottom:15px;padding-right:45px">
          <div class="col-12 q-pl-xl">
            <p class='label'>Chart Description</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-input type="textarea" bg-color="grey-3" standout v-model="description" placeholder="Describe your Chart"/>
          </div>
        </div>

        <div class="q-pa-xsm q-mt-md row" style="text-align:center; padding-right:45px">
          <div class="col-12 q-pl-xl">
            <p class='label'>Data Format</p>
          </div>
          <div class="col-12 q-pl-xl">
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
          class="q-pa-xsm q-mt-md row"
          style="text-align:center;padding-right:45px"
        >
          <div class="col-12 q-pl-xl">
            <p class='label'>Choose csv</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-file
              v-model="filename"
              @input="getFiles"
              bg-color="grey-3"
              dense
              standout
              :rules="[val => !!val || 'Field is required']"
            ></q-file>
          </div>
        </div>

        <div
          v-if="data_format === 'JSON'"
          class="q-pa-xsm q-mt-md row"
          style="text-align:center;padding-right:45px"
        >
          <div class="col-12 q-pl-xl">
            <p class='label'>Choose JSON</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-file
              v-model="filename"
              @input="getFiles"
              bg-color="grey-3"
              dense
              standout
              :rules="[val => !!val || 'Field is required']"
            ></q-file>
          </div>
        </div>

        <div
          v-if="data_format === 'API'"
          class="q-pa-xsm q-mt-md row"
          style="text-align:center; padding-right:45px"
        >
          <div class="col-12 q-pl-xl">
            <p class='label'>API address</p>
          </div>
          <div class="col-12 q-pl-xl">
            <q-input
              bg-color="grey-3"
              dense
              standout
              v-model="url"
              :rules="[val => !!val || 'Field is required']"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="q-pa-md col-6" style="text-align:right">
          <q-btn
            class="delete-button"
            unelevated
            no-caps
            size='md'
            label="Cancel"
            @click="reset()"
            to="/situation/editor"
          />
        </div>
        <div class="q-pa-md col-6" style="text-align:left">
          <q-btn
            color="accent"
            unelevated
            no-caps
            size='md'
            label="Save"
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
      formats: ["JSON", "csv"],
      category: "",
      type: "",
      types: ["BAR", "LINE", "PIE"],
      board: "",
      content: null,
      filename: null
    }
  },
  computed: {
    categories() {
      return this.$store.state.statistics.categories.map((c) => c.category)
    }
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
        board: this.board
      }
      this.$store
        .dispatch("statistics/addChart", data)
        .then(() => {
          this.$q.dialog({
            message: "upload succeeds, please refresh to see new charts"
          })
          // this.$router.push("/situation/editor");
        })
        .catch((err) => {
          this.$q.dialog({
            message: err
          })
        })
    },
    reset: function () {
      this.title = ""
      this.description = ""
      this.x = ""
      this.y = ""
      this.url = ""
      this.xistime = false
      this.data_format = "JSON"
      this.category = ""
      this.type = ""
      this.board = ""
      this.content = null
    },
    onChangeFileType: function (e) {
      this.filename = null
      this.content = null
    },
    getFiles(file) {
      if (file != undefined) {
        this.filename = file
        let reader = new FileReader()
        // Convert the file to base64 text
        // reader.readAsDataURL(file);
        reader.readAsText(file)
        reader.onload = () => {
          // Make a fileInfo Object
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            result: reader.result,
            file: file
          }
          this.content = fileInfo.result
        }
      } else {
        this.content = null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$btn_secondary: #cdd0d2;
.edit-element-component {
  border: 1px solid $btn_secondary;
  border-radius: 10px;
}
.main{
  padding: 16px 210px;
}
.label{
  text-align:left;
  font-size:18px
}
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
}
.q-btn{
  width: 135px;
}
</style>

<template>
  <div :id="$options.name" class="q-pa-md">
    <div style="text-align: center; padding-top: 30px" class="main">
      <div 
      class="edit-element-component"
      v:on >
        <div
        class="section col"
        id="fileupload">
          <p class="sectiontitle">
          {{$t('input_labels.data_source')}}
          </p>
          <div
          class="row tag_list">
            <div 
            class="s50 q-py-md">
            <p class="label">{{$t('input_labels.file_source')}}</p>
            <q-select
              filled
              v-model="source"
              :options="sources"
              :hint="$t('help.file_source')"
              label
              :rules="[(val) => !!val || $t('warning.req_fields')]"
            />
            </div>
          <div 
          class="s50 q-py-md">
            <p 
            v-if="source==='File'"
            class="label">{{$t('input_labels.upload_file')}}</p>
            <q-file
              v-if="source==='File'"
              v-model="filename"
              @input="getFiles"
              :hint="$t('help.upload_file')"
              filled
              :rules="[(val) => !!val || $t('warning.req_fields')]"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
            <p 
            v-if="source==='API'"
            class="label">{{$t('input_labels.add_api')}}</p>
            <q-input
              v-if="source==='API'"
              :hint="$t('help.api_link')"
              filled
              v-model="link"
              :rules="[(val) => !!val || $t('warning.req_fields')]"
            />
          </div>
          </div>
        </div>
        <div
        class="section col"
        id="metadata">
        <p class="sectiontitle">
          {{$t("migration_monitor.chart_settings")}}
        </p>
        <div class="row tag_list">
          <div
            class="s50 q-py-md">
            <p class="label">{{$t("migration_monitor.chart_title")}}</p>
            <q-input
              class=""
              filled
              v-model="title"
              :rules="[(val) => !!val || $t('warning.req_fields')]"
              :placeholder="$t('help.enter_chart_title')"
            />
          </div>
          <div
          class="s50 q-py-md">
            <p class="label">{{$t("input_labels.chart_type")}}</p>
            <q-select
              filled
              class="row q-px-sm"
              v-model="type"
              :hint="$t('help.chart_type')"
              :options="types"
              label
              :rules="[(val) => !!val || $t('warning.req_fields')]"
            />
          </div>
        </div>
          <div
          class="row tag_list">
            <p class="label row">{{$t("migration_monitor.chart_description")}}</p>
          </div>
          <q-input
            class="row col-12"
            type="textarea"
            filled
            v-model="description"
            :placeholder="$t('help.chart_description')"
          />
          <div class="row tag_list">
            <div
              class="s50 q-py-md">
              <p class="label">{{$t("input_labels.board")}}</p>
              <q-select
              filled
              class=""
              :value="board"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="boardOpts"
              @filter="filterBoards"
              @input-value="setBoard"
              :hint="$t('help.board')"
              :rules="[(val) => !!val || $t('warning.req_fields')]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{$t('warning.no_results')}}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            </div>
            <div
              class="s50 q-py-md">
              <p class="label">{{$t("input_labels.category")}}</p>
              <q-select
              filled
              :value="category"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="catOpts"
              @filter="filterCats"
              @input-value="setCategory"
              :hint="$t('help.category')"
              :rules="[(val) => !!val || $t('warning.req_fields')]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{$t('warning.no_results')}}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            </div>
            </div>   

            <div class="row tag_list">
            <div
              class="s50 q-py-md">
              <p class="label">{{$t("migration_monitor.chart_data_provider")}}</p>
              <q-input
                filled
                v-model="provider"
                :placeholder="$t('migration_monitor.chart_data_provider_description')"
              />
            </div>
            <div
              class="s50 q-py-md">
              <p class="label">{{$t("migration_monitor.updated_time")}}</p>
              <q-input
                data-cy="title_input"
                bg-color="grey-3"
                v-model="updated"
              >
                <template v-slot:prepend>
                  <q-icon
                    style="padding-left: 5px"
                    name="event"
                    class="cursor-pointer"
                    data-cy="date_icon"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="updated"
                        mask="YYYY-MM-DD"
                        color="accent"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            :label="$t('date_selector.close')"
                            color="accent"
                            flat
                            data-cy="close_date_menu"
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>            
          </div>
          <div 
          v-if="source==='File'"
          class="row tag_list">
            <div
              class="s50 q-py-md">
              <p class="label">{{$t("input_labels.x_axis")}}</p>
              <q-select
                filled
                class="q-mb-md"
                :value="headers[keyindex]"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="headers"
                @input-value="setKeyIndex"
                :hint="$t('help.index_column')"
                :rules="[(val) => !!val || $t('warning.req_fields')]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{$t('warning.no_results')}}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

              <p class="label">{{$t("input_labels.label")}}</p>
              <q-input
                bg-color="grey-3"
                filled
                v-model="x"
                use-input
                fill-input
                @input="setXaxis"
                :value="headers[keyindex]"
                :hint="$t('migration_monitor.index_label_description')"
            />
            </div>
            <div
              class="s50 q-py-md">
              <p class="label">{{$t("input_labels.y_axis")}}</p>
              <q-select
                  filled
                  :value="headers[valueindex]"
                  class="q-mb-md"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="headers"
                  @input-value="setValueIndex"
                  :hint="$t('help.value_column')"
                  :rules="[(val) => !!val || $t('warning.req_fields')]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{$t('warning.no_results')}}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
              <p class="label">{{$t("input_labels.label")}}</p>
              <q-input
                filled
                v-model="y"
                use-input
                fill-input
                @input="setYaxis"
                :value="headers[valueindex]"
                :hint="$t('migration_monitor.value_label_description')"
            />
            </div>
          </div>
          <div 
          v-if="source==='API'"
          class="row tag_list">
              <div
              class="s50 q-py-md">
              <p class="label">{{$t("input_labels.x_axis")}}</p>
              <q-input
                filled
                v-model="x"
                use-input
                fill-input
                @input="setXaxis"
                :value="headers[keyindex]"
                :hint="$t('migration_monitor.index_label_description')"
              />
              </div>
                            <div
              class="s50 q-py-md">
              <p class="label">{{$t("input_labels.y_axis")}}</p>
              <q-input
                filled
                v-model="y"
                use-input
                fill-input
                @input="setYaxis"
                :value="headers[valueindex]"
                :hint="$t('migration_monitor.index_label_description')"
              />
              </div>
          </div>
          <div
          class="row tag_list">
            <div
              v-if="data_format==='CSV'" 
              class="s50 q-py-md">
                <p 
                class="label">{{$t("input_labels.delimiter")}}</p>
                <q-select
                filled
                use-input
                hide-selected
                fill-input
                :value="delimiter"
                v-model="delimiter"
                map-options
                input-debounce="0"
                :options="delimiterOpts"
                :option-value="'value'"
                :option-label="'label'"
                @input="setDelimiter"
                :hint="$t('help.delimiter')"
                :rules="[(val) => !!val || $t('warning.req_fields')]"
                >
                </q-select>
            </div>
            <div
              v-if="source==='API'" 
              class="s50 q-py-md">
            <p class="label">{{$t("input_labels.transformation_function")}}</p>
              <q-input
                filled
                v-model="func"
                use-input
                fill-input
                :hint="$t('help.transformation_function')"
              />
            </div>
            <div 
            class="s50 q-py-md"
            v-if="source==='File'" >
              <q-checkbox
                color="accent"
                v-if="data_format === 'CSV'"
                v-model="headerrow"
                :label="$t('migration_monitor.headerrow')"
                 @input="generatePreview"
              />
              <q-checkbox
                color="accent"
                v-model="xistime"
                :label="$t('migration_monitor.timescale_checkbox')"
              />

            </div>
            <div 
            class="s50 q-py-md centered"
            v-if="source==='API'" >
              <q-checkbox
                color="accent"
                v-model="xistime"
                :label="$t('migration_monitor.timescale_checkbox')"
              />
            </div>
          </div>
          <div
          class="row col-12">
          </div>
        </div>
        <div
        class="section"
        id="preview"
        v-if="source === 'File'">
        <p class="sectiontitle">
          {{$t("migration_monitor.chart_preview")}}        
          </p>
          <table
          id="previewtable"
          >
          </table>
        </div>
        <div
        class="section"
        id="filesave">
              <div class="row">
        <div class="q-pa-md col-6" style="text-align: right">
          <q-btn
            class="delete-button"
            unelevated
            no-caps
            size="md"
            :label="$t('button.cancel')"
            @click="reset()"
            to="/situation/overview"
          />
        </div>
        <div class="q-pa-md col-6" style="text-align: left">
          <q-btn
            color="accent"
            unelevated
            no-caps
            size="md"
            :label="$t('button.save')"
            @click="addChart()"
          />
        </div>
      </div>
        </div>
      </div>
    <q-dialog v-model="succeed">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{$t("success_messages.add_chart_title")}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{$t("success_messages.add_chart_description")}}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="black"
            v-close-popup
            @click="!succeed"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="fail">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{$t('error_messages.add_chart_title')}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{$t('error_messages.add_chart_description_1')}}<br />
          {{$t('error_messages.add_chart_description_2')}}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="black" v-close-popup @click="!fail" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="empty">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{$t('error_messages.add_chart_empty_field_title')}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none"> {{$t('error_messages.add_chart_empty_field_description')}} </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="black" v-close-popup @click="!empty" />
        </q-card-actions>
      </q-card>
    </q-dialog>
      </div>
    </div>
</template>

<script>
import HelpLabel from 'components/HelpLabel'
import { SurveyTriggerRunExpression } from 'survey-vue'

export default {
  name: "AddNewChart",

  data() {
    return {
      title: null,
      description: null,
      x: null,
      y: null,
      url: null,
      xistime: false,
      data_format: "",
      delimiter: null,
      formats: ["JSON", "CSV"],
      category: null,
      type: null,
      types: ["BAR", "LINE", "PIE"],
      board: null,
      provider: null,
      updated: null,
      content: null,
      filename: null,
      succeed: false,
      fail: false,
      empty:false,
      rawdata: null,
      boardOpts: [],
      catOpts: [],
      delimiterOpts: [{value:";", label:"semicolon (;)"},{value:",", label:"comma (,)"},{value:"|",label:"pipe (|)"}],
      headers: [],
      headerrow: true,
      keyindex: 0,
      valueindex: 1,
      source: null,
      sources:  ["File","API"],
      link: null,
      func: null,
      notRequired: false
    }
  },
    components: {
    'help-label': HelpLabel,
  },
  computed: {
    categories() {
      return this.$store.state.statistics.categories.filter(
        (c) => c.board === this.board
      )
    },
    boards() {
      return this.$store.state.statistics.boards
    }
  },
  methods: {
    titleRule(){
        v => !!v || 'Name is required'
    },
    generatePreview(){
          this.content = []

          function addrow (val1,val2,type){
            let row = document.createElement('tr')
            let cell1 = document.createElement(type)
            cell1.innerText=val1
            let cell2 = document.createElement(type)
            cell2.innerText=val2
            row.appendChild(cell1)
            row.appendChild(cell2)
            return row
          }

          var previewtable = document.getElementById('previewtable')
          previewtable.innerHTML=''

          if (this.data_format==="CSV"){

            let splitregex = new RegExp(this.delimiter.value+'(?=(?:(?:[^"]*"){2})*[^"]*$)')


            var allTextLines = this.rawdata.split(/\r\n|\n/)

            var headertype = 'td'
            var headerrow = 0
            this.headers=[]

            let trimregex = /(^\"+|\"+$)/mg

            //   /,(?=(?:(?:[^"]*"){2})*[^"]*$)/

            previewtable.appendChild(addrow(this.x,this.y,'th'))

            if (this.headerrow===true) {
              headertype='th'
              headerrow=1
              // this.headers=
              allTextLines[0].split(splitregex).forEach(obj =>
                this.headers.push(obj.replace(trimregex,""))
              )
              // previewtable.appendChild(addrow(this.x,this.headers[this.valueindex],headertype))
            } else {
              for (var i=0; i<allTextLines[0].split(splitregex).length; i++) this.headers.push('column '+ i)
            }


            for (var i=headerrow; i<allTextLines.length-1; i++) {
              previewtable.appendChild(
                addrow(
                  allTextLines[i].split(splitregex)[this.keyindex].replace(trimregex,""),
                  allTextLines[i].split(splitregex)[this.valueindex].replace(trimregex,""), 'td')
                )
                this.content.push(
                  {[this.x]:allTextLines[i].split(splitregex)[this.keyindex].replace(trimregex,""),
                  [this.y]:allTextLines[i].split(splitregex)[this.valueindex].replace(trimregex,"")}
                )               
            }            
          } else if (this.data_format==="JSON"){
            this.headers=[]
            let dataobj = JSON.parse(this.rawdata)
            dataobj.forEach( obj =>
              Object.keys(obj).forEach( key => 
                {if(this.headers.indexOf(key) === -1) this.headers.push(key)}
                //  if(this.headers.indexOf(key) === -1) {this.headers.push(key)}
              )  
            )
            previewtable.appendChild(addrow(this.x,this.y,'th'))
            dataobj.forEach( obj =>
              {
                previewtable.appendChild(addrow(
                obj[this.headers[this.keyindex]],obj[this.headers[this.valueindex]], 'td')
              )
                this.content.push(
                  {[this.x]:obj[this.headers[this.keyindex]],
                  [this.y]:obj[this.headers[this.valueindex]]}
                )
              }
            )

          }

          this.content = JSON.stringify(this.content)
          
    },
    filterBoards(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.boardOpts = this.boards.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        )
      })
    },
    setBoard(val) {
      this.board = val
    },
    setDelimiter(val) {
      this.delimiter=val
      // this.delimiter = this.delimiterOpts[val]
      this.generatePreview()
    },
    getDelimiterOpts() {
      return Object.keys(this.delimiterOpts)
    },
    setKeyIndex(val){
      this.keyindex=this.headers.indexOf(val)
      this.x=val
      this.generatePreview()
    },
    setXaxis(val) {
      this.x=val
      this.generatePreview()
    },
    setYaxis(val) {
      this.y=val
      this.generatePreview()
    },
    setValueIndex(val){
      this.valueindex=this.headers.indexOf(val)
      this.y=val
      this.generatePreview()
    },
    filterCats(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.catOpts = this.categories
          .map((c) => c.category)
          .filter((c) => c.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    setCategory(val) {
      this.category = val
    },
        addChart: function () {

      var update_date = new Date(this.updated)
      var update_transformed = new Date(update_date.getTime()-update_date.getTimezoneOffset()*-60000)

      if (this.source === "API"){
        this.data_format = "api"
        this.content = JSON.stringify([0])
        this.title = "-"
      }
      
      if (
        this.source === "File" &
        (this.title === null ||
        this.content === null ||
        this.data_format === null ||
        this.type === null ||
        this.x === null ||
        this.y === null ||
        this.board === null ||
        this.category === null)
      ) {
        this.empty = true
        return
      }
      if (
        this.source === "API" & 
        (
        this.board === null ||
        this.type === null ||
        this.link === null ||
        this.func === null)
        ) {
          this.empty = true
          return
        }
      
      var output = {}

      const data = {
          "title": this.title,
          "content": this.content,
          "description": this.description,
          "category": this.category,
          "format": "api",
          "type": this.type,
          "provider": this.provider,
          "updated": this.updated,
          "xistime": this.xistime,
          "x": this.x,
          "y": this.y,
          "board": this.board,
          "function": this.func,
          "link": this.link
      }

      Object.keys(data).forEach(key=>{
        if (data[key] !== null) {
          output[key] = data[key]
        }
      })

      this.$q.loading.show({ delay: 400 })
      this.$store
        .dispatch("statistics/addChart", output)
        .then((res) => {
          this.$q.loading.hide()
          this.succeed = true
        })
        .catch((err) => {
          this.$q.loading.hide()
          this.fail = true
        })
        .then(()=>{this.reset()})

    },
    reset: function () {
      this.title = null
      this.description = null
      this.x = null
      this.y = null
      this.url = null
      this.xistime = false
      this.data_format = null
      this.category = null
      this.type = null
      this.provider = null
      this.updated = null
      this.board = null
      this.content = null
      this.headerrow = true
      this.filename = null
      this.delimiter = null
      this.rawdata = null
      this.headers = []
      this.headerrow = true
      this.keyindex = 0
      this.valueindex = 1
      this.generatePreview(),
      this.func = null
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
          const mime_csv = ["text/plain","text/x-csv","application/vnd.ms-excel","application/csv","application/x-csv","text/csv","text/comma-separated-values","text/x-comma-separated-values","text/tab-separated-values"]
          const mime_json = ["application/json"]
          
          if (mime_csv.includes(file.type)){
            this.data_format="CSV"
            this.delimiter=this.delimiterOpts[1]
          } else if (mime_json.includes(file.type)) {
            this.data_format="JSON"
          } else {
            alert("Filetype not supported, please select a CSV or a JSON-file")
            this.filename=""
          }

          this.rawdata=reader.result

          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            result: reader.result,
            file: file
          }
          this.content = fileInfo.result
          this.generatePreview()
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
.centered {
  align-self: center;
}
.edit-element-component {
  border: 1px solid $btn_secondary;
  border-radius: 10px;
}
.main {
  padding: 16px 210px;
}
.label {
  text-align: left;
  font-size: 18px;
}
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
}
.q-btn {
  width: 135px;
}
.text-primary {
  color: none;
}
.section {
  padding: 2em;
}

.sectiontitle {
  font-weight: bolder;
  text-align: left;
  font-size: 18px;
  color: var(--q-color-secondary)
}

.s50 {
  width: 50%;
  min-width: 100px;
  text-align: left;
}

.s50:first-child{
  padding-right: 1em;
}

.s50:last-child{
  padding-left: 1em;
}

.tag_list {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
}
</style>
<style>
#previewtable {
  width: 50%;
  border-collapse: collapse;
}

td {
  border: 1pt rgb(235, 235, 235) solid;
}
th {
  border: 1pt rgb(235, 235, 235) solid;
}

tr:nth-child(even) {
  background-color: var(--q-color-primary);
}

td, th {
  padding: 8px
}

</style>

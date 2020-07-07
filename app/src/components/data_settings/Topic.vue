<template>
  <div class="q-pa-md">
    <h5>{{$options.name}}</h5>
    <q-list
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="a_topic in topic"
        :key="a_topic.id"
      >
        <q-item-section class="col-2 flex flex-left">
          <q-img
            :src="a_topic.icon"
            spinner-color="white"
            style="height: 40px; max-width: 40px"
          />
        </q-item-section>
        <q-item-section class="col-5 flex flex-left">{{showTopicLabel(a_topic)}}</q-item-section>
        <q-item-section class="col-2 flex flex-left">
          <q-toggle
            v-model="a_topic.published"
            color="green"
            disable
          />
        </q-item-section>
        <q-item-section class="col-3 flex flex-center">
          <q-btn
            no-caps
            color="negative"
            unelevated
            rounded
            style="width:70px;border-radius:2px; margin-bottom:10px"
            label="Delete"
            size="xs"
            @click="deleteTopic(a_topic.id)"
          />
          <q-btn
            no-caps
            color="info"
            unelevated
            rounded
            style="width:70px;border-radius:2px"
            label="Edit"
            size="xs"
            @click="editTopic(a_topic)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn
          color="secondary"
          label="Add"
          @click="newTopic()"
          :disable="hideAdd"
        />
      </q-card-section>
      <q-card-section :hidden="hideForm">
        <q-tabs
          v-model="langTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
            :label="language.name"
          />
        </q-tabs>
        <q-tab-panels
          v-model="langTab"
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
            <!-- it seems that the following q-input causes a console error saying that he cannot read the property topic of undefined -->
            <q-input
              v-model="int_topic_shell.translations.filter(filterTranslationModel(language.lang))[0].topic"
              label="Topic"
            />
          </q-tab-panel>
        </q-tab-panels>
        <FileUploader
          :Image="topicimage"
          :published="int_topic_shell.published"
          :publicationDate="int_topic_shell.publicationDate"
          :icon="int_topic_shell.icon"
          @upload="getFiles"
          @publish="isPublished"
        >

        </FileUploader>

        <!--  <q-card class="my-card">
          <q-card-section>

            <q-file
              @input="getFiles"
              bg-color="grey-3"
              dense
              rounded
              standout
              outlined
            >

            </q-file>
            <q-img
              :src="topicimage"
              spinner-color="white"
              style="max-height: 100px; max-width: 150px"
            />
          </q-card-section>
          <q-card-section>
            <q-toggle
              v-model="int_topic_shell.published"
              color="green"
              label="is Published"
            />
            <q-input
              v-model="int_topic_shell.publicationDate"
              label="Publication date"
              readonly
            />
          </q-card-section>

        </q-card>-->

        <q-btn
          no-caps
          color="accent"
          unelevated
          rounded
          style="width:70px;border-radius:2px"
          label="Save"
          @click="saveTopic()"
        />
        <q-btn
          no-caps
          class="button"
          unelevated
          rounded
          style="width:70px;border-radius:2px"
          label="Cancel"
          @click="cancelTopic()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
//.translations.filter(function(t){t.lang='en'})[0].topic
/*
function startsWith(wordToCompare) {
  console.log(wordToCompare)
    return function(element) {
        return element.lang==wordToCompare;
    }
}
*/
import FileUploader from 'components/FileUploader'
import editEntityMixin from '../../mixin/editEntityMixin'

export default {
  name: "TopicType",
  mixins: [editEntityMixin],
  data () {
    return {
      int_topic_shell: { id: -1, translations: [], icon: "" },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      topicimage: null,
    };
  },
  components: {
    FileUploader
  },
  computed: {
    topic () {
      return this.$store.state.topic.topic;
    },
  },
  methods: {
    deleteTopic (index) {
      console.log(index);
      this.$store.dispatch("topic/deleteTopic", index);
    },
    saveTopic () {
      let workingTopic = JSON.parse(JSON.stringify(this.int_topic_shell));

      if (this.isNew) {
        // we are adding a new instance

        this.$store
          .dispatch("topic/saveTopic", workingTopic)
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch("topic/editTopic", workingTopic)
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.createShell()
    },
    isPublished (value) {
      console.log("publishing")
      this.int_topic_shell.published = value
      console.log(this.int_topic_shell.published)

    },
    newTopic () {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelTopic () {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editTopic (topic) {
      this.isNew = false;
      this.hideForm = false;
      //     this.int_topic_shell = JSON.parse(JSON.stringify(topic));
      this.mergeTopic(topic)
    },
    
    showTopicLabel (workingTopic) {
      return workingTopic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
    },
    createShell () {
      this.int_topic_shell = { id: -1, topic: null, translations: [], icon: "", published: false, publicationDate: null, }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_topic_shell.translations.push({ id: -1, lang: l.lang, topic: '', translationDate: null })
      });
    },
    mergeTopic (topic) {
      console.log(topic)
      this.int_topic_shell.id = topic.id
      this.int_topic_shell.icon = topic.icon
      this.int_topic_shell.published = topic.published
      this.int_topic_shell.publicationDate = topic.publicationDate
      topic.translations.forEach(tr => {
        console.log(tr)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_topic_shell.translations.length; i++) {
          if (this.int_topic_shell.translations[i].lang == tr.lang) {
            this.int_topic_shell.translations.splice(i, 1);
            this.int_topic_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break;
          }
        }
      });

      console.log(this.int_topic_shell)


    },
    getFiles (files) {
      console.log(files);
      console.log(this)

      console.log(self)

      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files)

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: files.name,
          type: files.type,
          size: Math.round(files.size / 1000) + ' kB',
          base64: reader.result,
          file: files
        }
        this.topicimage = fileInfo.base64
        this.int_topic_shell.icon = fileInfo.base64
        console.log(fileInfo)
      }
    }
  },
  //store.commit('increment', 10)
  created () {
    this.loading = true;
    console.log(this.$store);
    this.$store.dispatch("topic/fetchTopic").then(processes => {
      this.loading = false;
    });
    //   this.activeLanguage = this.$i18n.locale,
    this.createShell()
    /*
        this.$store.dispatch("language/fetchLanguages").then(langs => {
          let al = this.activeLanguage
          this.langTab = this.languages.filter(function (l) { return l.lang == al })[0].name
          console.log('active language')
          console.log(this.int_topic_shell)
        })
    */
  }
};
</script>
<style scoped>
.button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
}
</style>
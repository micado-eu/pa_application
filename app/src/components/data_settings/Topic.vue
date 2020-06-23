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
        <q-item-section>
          <q-img
            :src="a_topic.icon"
            spinner-color="white"
            style="height: 40px; max-width: 40px"
          />
        </q-item-section>
        <q-item-section class="col-5 flex flex-left">{{a_topic.translations.filter(function(t){return t.lang==activeLanguage})[0].topic}}</q-item-section>
        <q-item-section class="col-5 flex flex-center">
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
            <q-input
              v-model="int_topic_shell.translations.filter(filterTranslationModel(language.lang))[0].topic"
              label="Topic"
            />
          </q-tab-panel>
        </q-tab-panels>

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
export default {
  name: "TopicType",
  data () {
    return {
      int_topic_shell: { id: -1, topic: "", translations: [], icon: "" },
      hideForm: true,
      hideAdd: false,
      isNew: false,
      activeLanguage: this.$i18n.locale,
      langTab: ''
    };
  },
  computed: {
    topic () {
      return this.$store.state.topic.topic;
    },
    languages () {
      return this.$store.state.language.languages;

    }

  },
  methods: {
    deleteTopic (index) {
      console.log(index);
      this.$store.dispatch("topic/deleteTopic", index);
    },
    saveTopic () {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch("topic/saveTopic", this.int_topic_shell)
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch("topic/editTopic", this.int_topic_shell)
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.int_topic_shell = { id: -1, title: "" };
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
      this.int_topic_shell = JSON.parse(JSON.stringify(topic));
    },
    filterTranslationModel (currentLang) {
      return function (element) {
        return element.lang == currentLang;
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
    this.$store.dispatch("language/fetchLanguages").then(langs => {
      let al = this.activeLanguage
      this.langTab = this.languages.filter(function (l) { return l.lang == al })[0].name
      this.languages.forEach(l => {
        console.log(l)
        this.int_topic_shell.translations.push({ lang: l.lang, topic: '' })
      });
      console.log('active language')
      console.log(this.int_topic_shell)
    })
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
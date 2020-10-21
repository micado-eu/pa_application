<template>
  <div class="q-pa-md">
    <div class="row">
    <h5 class="col-6">{{$options.name}}</h5>
    <div class="col-6 div-1" >
     <q-btn
          color="info"
          no-caps
          :label="$t('button.add_type')"
          @click="newTopic()"
          :disable="hideAdd"
          id="add-button"
        />
  </div>
    </div>
    <q-card class="q-pa-xl div-2" :hidden="hideForm">
       
        <q-tab-panels
          v-model="langTab"
          class="bg-grey-2 inset-shadow "
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
            <!-- it seems that the following q-input causes a console error saying that he cannot read the property topic of undefined -->
            <div id="div-3"> {{$t('input_labels.topic')}} </div>
            <q-input
              outlined
              filled
              dense
              counter
              maxlength="20"
              :rules="[ val => val.length <= 20 || 'Please use maximum 20 characters']"
              v-model="int_topic_shell.translations.filter(filterTranslationModel(language.lang))[0].topic"
              :label="$t('input_labels.topic_placeholder')"
            />
          </q-tab-panel>
        </q-tab-panels>
        <q-separator />
          <q-tabs
          v-model="langTab"
          dense
          class="bg-grey-2"
          active-color="accent"
          indicator-color="accent"
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
        <FileUploader
          :Image="topicimage"
          :icon="int_topic_shell.icon"
          @upload="getFiles"
        >

        </FileUploader>
        
        <hr id="hr">
          <q-btn
          no-caps
          class="delete-button"
          unelevated
          rounded
          :label="$t('button.cancel')"
          @click="cancelTopic()"
        />
        <q-btn
          no-caps
          color="accent"
          unelevated
          rounded
          :label="$t('button.save')"
          class="button"
          @click="savingTopic()"
        />
      

      </q-card>
      <div class="row div-4">
    <div class="col-1 flex flex-left">
      {{$t('input_labels.image')}}
    </div>
    <div class="col-8 flex flex-left">
      {{$t('input_labels.name')}}
    </div>
    <div class="col-1 flex flex-left">
      <!--{{$t('input_labels.is_published')}}-->
    </div>
    <div class="col-1 flex flex-center div-5">
      {{$t('input_labels.edit')}}
    </div> 
    <div class="col-1 flex flex-center div-6" >
      {{$t('input_labels.delete')}}
    </div>
      </div>

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
        <q-item-section class="col-1 flex flex-left">
          <q-img
            :src="a_topic.icon"
            spinner-color="white"
            id="image"
          />
        </q-item-section>
        <q-item-section class="col-8 flex flex-left section">{{showTopicLabel(a_topic)}}</q-item-section>
        <q-item-section class="col-1 flex flex-left">
         <!-- <q-toggle
            v-model="a_topic.published"
            color="green"
            disable
          />-->
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          <q-icon id="icon" name="img:statics/icons/Edit.png" size="md" @click.stop="editingTopic(a_topic)" />
          </q-item-section>
          <q-item-section class="col-1 flex flex-center" >
         <q-icon  name="img:statics/icons/Icon - Delete.svg"  @click.stop="deletingTopic(a_topic.id)" size="md" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">

      
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
import storeMappingMixin from '../../mixin/storeMappingMixin'


export default {
  name: "TopicType",
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      topic: 'topic/topic'
    }, actions: {
      deleteTopic: 'topic/deleteTopic',
      saveTopic: 'topic/saveTopic',
      editTopic: 'topic/editTopic',
      fetchTopic: 'topic/fetchTopic'
  }
  })],
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

  methods: {
    deletingTopic (index) {
      console.log(index);
      //this.$store.dispatch("topic/deleteTopic", index);
      this.deleteTopic(index)
    },
    savingTopic () {
      //let workingTopic = JSON.parse(JSON.stringify(this.int_topic_shell));

      if (this.isNew) {
        // we are adding a new instance
        this.saveTopic(this.int_topic_shell)
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        console.log(this.int_topic_shell)
        // we are updating the exsisting
        this.editTopic(this.int_topic_shell)
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideAdd = false
      this.hideForm = true;
      this.createShell()
    },
    /*isPublished (value) {
      console.log("publishing")
      this.int_topic_shell.published = value
      console.log(this.int_topic_shell.published)

    },*/
    newTopic () {
      this.createShell()
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelTopic () {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editingTopic (topic) {
      this.isNew = false;
      this.hideForm = false;
      this.mergeTopic(topic)
    },
    
    showTopicLabel (workingTopic) {
      return workingTopic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
    },
    createShell () {
      this.int_topic_shell = { id: -1, translations: [], icon: "" }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_topic_shell.translations.push({ id: -1, lang: l.lang, topic: '', translationDate: null })
      });
    },
    mergeTopic (topic) {
      console.log(topic)
      this.int_topic_shell.id = topic.id
      this.int_topic_shell.icon = topic.icon
      //this.int_topic_shell.published = topic.published
      //this.int_topic_shell.publicationDate = topic.publicationDate
      topic.translations.forEach(tr => {
        console.log(tr)
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
  created () {
    this.loading = true;
    console.log(this.$store);
    this.$store.dispatch("topic/fetchTopic").then(processes => {
      this.loading = false;
    });
    this.createShell()
  }
};
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width:100px;
  border-radius:2px;
  margin-right:15px; 
  margin-left:10px; 
  margin-top:30px
}
h5 {
  font-weight: bold;
}
.div-1{
  margin-top:40px;
  margin-bottom:40px; 
  text-align:right
}
.div-2{
  margin-bottom:100px
}
#add-button{
  width:200px;
}
.button{
  width:100px;
  border-radius:2px;
  margin-top:30px
}
#div-3{
  font-size:16px; 
  font-weight:600; 
  
}
#hr{
  margin-left:15px;
  margin-right:15px;
  border: 1px solid #DADADA
}
.div-4{
padding-left:20px; 
padding-bottom:10px
}
.div-5{
padding-left:10px
}
.div-6{
padding-left:30px
}
#image{
  height: 40px; 
  max-width: 40px
}
.section{
  font-size:16px; 
  font-weight:600
}
#icon{
  margin-right:10px;
}
</style>
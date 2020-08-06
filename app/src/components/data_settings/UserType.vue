<template>
  <div class="q-pa-md">
    <div class="row">
    <h5 class="col-6">{{$options.name}}</h5>
    <div class="col-6" style="margin-top:40px;margin-bottom:40px; text-align:right">
     <q-btn
          color="info"
          no-caps
         :label="$t('button.add_type')"
          @click="newUserType()"
          :disable="hideAdd"
          style="width:200px"
        />
  </div>
    </div>
    <q-card class="q-pa-md" :hidden="hideForm" style="margin-bottom:100px">
      
        <q-tab-panels
          v-model="langTab"
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
           <div style="font-size:16px; font-weight:600; padding-top:10px; padding-bottom:10px"> {{$t('input_labels.user_type')}} </div>
           <q-input
              outlined
              filled
              dense
              v-model="int_user_type_shell.translations.filter(filterTranslationModel(language.lang))[0].userType"
              :label="$t('input_labels.user_type_placeholder')"
            />
       <!-- <q-input
          v-model="int_user_type_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
          filled
          type="textarea"
          label="Description"
        />-->
        <div style="font-size:16px; font-weight:600; padding-top:10px; padding-bottom:10px"> {{$t('input_labels.description')}} </div>
         <GlossaryEditor
        class="desc-editor"
        v-model="int_user_type_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
        :lang="language.lang"
        ref="editor" />
        </q-tab-panel>
        </q-tab-panels>
          <FileUploader
        :Image="userimage"
        :published="int_user_type_shell.published"
        :publicationDate="int_user_type_shell.publicationDate"
        :icon="int_user_type_shell.icon"
        @upload="getFiles"
        @publish="isPublished"> 

        </FileUploader>
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
          <hr style="margin-left:15px;margin-right:15px;border: 1px solid #DADADA;" >
          <q-btn
          no-caps
          class="button"
          unelevated
          rounded
          style="width:100px;border-radius:2px;margin-right:15px; margin-left:10px; margin-top:30px"
          :label="$t('button.cancel')"
          @click="cancelUserType()"
        />
        <q-btn
          no-caps
          color="accent"
          unelevated
          rounded
          style="width:100px;border-radius:2px;margin-top:30px"
          :label="$t('button.save')"
          @click="saveUserType()"
        />
       
    </q-card>
      <div class="row" style="padding-left:20px; padding-bottom:10px">
    <div class="col-1 flex flex-left">
      {{$t('input_labels.image')}}
    </div>
    <div class="col-8 flex flex-left">
      {{$t('input_labels.name')}}
    </div>
    <div class="col-1 flex flex-left">
      {{$t('input_labels.is_published')}}
    </div>
    <div class="col-1 flex flex-center" style="padding-left:10px">
      {{$t('input_labels.edit')}}
    </div> 
    <div class="col-1 flex flex-center" style="padding-left:30px">
      {{$t('input_labels.delete')}}
    </div>
      </div>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="a_user_type in user_type" :key="a_user_type.id">
         <q-item-section class="col-1 flex flex-left">
          <q-img
            :src="a_user_type.icon"
            spinner-color="white"
            style="height: 40px; max-width: 40px"
          />
        </q-item-section>
        <q-item-section class="col-8 flex flex-left" style="font-size:16px; font-weight:600">{{showUserTypeLabel(a_user_type)}}</q-item-section>
        <q-item-section class="col-1 flex flex-left">
          <q-toggle
            v-model="a_user_type.published"
            color="green"
            disable
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          <q-icon style="margin-right:10px;" name="img:statics/icons/Edit.png" size="md" @click.stop="editUserType(a_user_type)" />
        </q-item-section>
          <q-item-section class="col-1 flex flex-center">
          <q-icon  name="img:statics/icons/Icon - Delete.svg"  @click.stop="deleteUserType(a_user_type.id)" size="md" />
        </q-item-section>
      </q-item>
    </q-list>
    
      
      
  </div>
</template>

<script>
import FileUploader from 'components/FileUploader'
import editEntityMixin from '../../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'

export default {
  name: "UserType",
  mixins: [editEntityMixin],
  data() {
    return {
      int_user_type_shell: { id: -1, user_type: null, translations: [], icon: "", published: false, publicationDate: null, },
      hideForm: true,
      hideAdd: false,
      isNew: false, 
      userimage: null
    };
  },
   components: {
    FileUploader,
    GlossaryEditor
  },
  computed: {
    user_type() {
      return this.$store.state.user_type.user_type;
    }
  },
  methods: {
    deleteUserType(index) {
      console.log(index);
      this.$store.dispatch("user_type/deleteUserType", index);
    },
    saveUserType() {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch("user_type/saveUserType", this.int_user_type_shell)
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch("user_type/editUserType", this.int_user_type_shell)
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.hideAdd = false;
      this.createShell()
    },
    newUserType() {
      this.createShell()
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    editUserType(user_type) {
     
      this.isNew = false;
      this.hideForm = false;
      //this.int_type_shell = JSON.parse(JSON.stringify(integration_type));
      this.mergeUserType(user_type)
       console.log(this.int_user_type_shell.translations.filter(this.filterTranslationModel(this.activeLanguage))[0])
    },
    showUserTypeLabel (workingTopic) {
     
      return workingTopic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
    },
        createShell () {
      this.int_user_type_shell = { id: -1, user_type: null, translations: [], icon: "", published: false, publicationDate: null, }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_user_type_shell.translations.push({ id: -1, lang: l.lang, userType: '', description:"", translationDate: null })
      });
    },
    mergeUserType (user_type) {
      console.log(user_type)
      this.int_user_type_shell.id = user_type.id
      this.int_user_type_shell.icon = user_type.icon
      this.int_user_type_shell.published = user_type.published
      this.int_user_type_shell.publicationDate = user_type.publicationDate
      user_type.translations.forEach(tr => {
        console.log(tr)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_user_type_shell.translations.length; i++) {
          if (this.int_user_type_shell.translations[i].lang == tr.lang) {
            this.int_user_type_shell.translations.splice(i, 1);
            this.int_user_type_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break;
          }
        }
      });

      console.log(this.int_user_type_shell)


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
        this.userimage = fileInfo.base64
        this.int_user_type_shell.icon = fileInfo.base64
        console.log(fileInfo)
      }
    },
     isPublished(value){
      console.log("publishing")
      this.int_user_type_shell.published = value
            console.log(this.int_user_type_shell.published)

    },
    cancelUserType() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editUserType(user_type) {
      this.isNew = false;
      this.hideForm = false;
      this.int_user_type_shell = JSON.parse(JSON.stringify(user_type));
    }
  },
  //store.commit('increment', 10)
  created() {
    this.createShell()
    this.loading = true;
    console.log(this.$store);
    this.$store.dispatch("user_type/fetchUserType").then(processes => {
      this.loading = false;
    });
  }
};
</script>
<style scoped>
.button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
</style>
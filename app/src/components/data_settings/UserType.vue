<template>
  <div class="q-pa-md">
    <div class="row">
    <h5 class="col-6">{{$options.name}}</h5>
    <div class="col-6 div-1" >
     <q-btn
          id="add-button"
          color="info"
          no-caps
         :label="$t('button.add_type')"
          @click="newUserType()"
          :disable="hideAdd"
        />
  </div>
    </div>
    <q-card class="q-pa-md div-2" :hidden="hideForm">
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
          <div class="div-3"> {{$t('input_labels.user_type')}} </div>
           <q-input
              outlined
              filled
              dense
              maxlength="20"
              :rules="[ val => val.length <= 20 || 'Please use maximum 20 characters']"
              v-model="int_user_type_shell.translations.filter(filterTranslationModel(language.lang))[0].userType"
              :label="$t('input_labels.user_type_placeholder')"
            />
       <!-- <q-input
          v-model="int_user_type_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
          filled
          type="textarea"
          label="Description"
        />-->
        <div class=div-3> {{$t('input_labels.description')}} </div>
         <GlossaryEditor
        class="desc-editor"
        v-model="int_user_type_shell.translations.filter(filterTranslationModel(language.lang))[0].description"
        :lang="language.lang"
        ref="editor" />
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
        :Image="userimage"
        :icon="int_user_type_shell.icon"
        @upload="getFiles"
        > 
        </FileUploader> 
          <hr id="hr" >
          <q-btn
          no-caps
          class="delete-button"
          unelevated
          rounded
          style=""
          :label="$t('button.cancel')"
          @click="cancelUserType()"
        />
        <q-btn
          no-caps
          color="accent"
          unelevated
          rounded
          class="button"
          :label="$t('button.save')"
          @click="savingUserType()"
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
    <div class="col-1 flex flex-center div-6">
      {{$t('input_labels.delete')}}
    </div>
      </div>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="a_user_type in user" :key="a_user_type.id">
         <q-item-section class="col-1 flex flex-left">
          <q-img
            :src="a_user_type.icon"
            spinner-color="white"
            id="image"
          />
        </q-item-section>
        <q-item-section class="col-8 flex flex-left section">{{showUserTypeLabel(a_user_type)}}</q-item-section>
        <q-item-section class="col-1 flex flex-left">
          <!--<q-toggle
            v-model="a_user_type.published"
            color="green"
            disable
          />-->
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          <q-icon id="icon" name="img:statics/icons/Edit.png" size="md" @click.stop="editingUserType(a_user_type)" />
        </q-item-section>
          <q-item-section class="col-1 flex flex-center">
          <q-icon  name="img:statics/icons/Icon - Delete.svg"  @click.stop="deletingUserType(a_user_type.id)" size="md" />
        </q-item-section>
      </q-item>
    </q-list>
    
      
      
  </div>
</template>

<script>
import FileUploader from 'components/FileUploader'
import editEntityMixin from '../../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import storeMappingMixin from '../../mixin/storeMappingMixin'



export default {
  name: "UserType",
  mixins: [editEntityMixin,
  storeMappingMixin({
    getters: {
      user: 'user_type/user'
    }, actions: {
      deleteUserType: 'user_type/deleteUserType',
      fetchUserType: 'user_type/fetchUserType',
      saveUserType: 'user_type/saveUserType',
      editUserType: 'user_type/editUserType'
  }
  })],
  data() {
    return {
      int_user_type_shell: { id: -1, user_type: null, translations: [], icon: "" },
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

  methods: {
    deletingUserType(index) {
      console.log(index);
      this.deleteUserType(index)
    },
    savingUserType() {
      if (this.isNew) {
        // we are adding a new instance
        this.saveUserType(this.int_user_type_shell)
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        console.log("IN EDITING")
        this.editUserType(this.int_user_type_shell)
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
    editingUserType(user_type) {
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
      this.int_user_type_shell = { id: -1, user_type: null, translations: [], icon: ""}
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_user_type_shell.translations.push({ id: -1, lang: l.lang, userType: '', description:"", translationDate: null })
      });
    },
    mergeUserType (user_type) {
      console.log(user_type)
      this.int_user_type_shell.id = user_type.id
      this.int_user_type_shell.icon = user_type.icon
      //this.int_user_type_shell.published = user_type.published
      //this.int_user_type_shell.publicationDate = user_type.publicationDate
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
     /*isPublished(value){
      console.log("publishing")
      this.int_user_type_shell.published = value
            console.log(this.int_user_type_shell.published)

    },*/
    cancelUserType() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
  },
  created() {
    this.createShell()
    this.loading = true;
    console.log(this.$store);
    this.fetchUserType()
    .then(processes => {
      this.loading = false;
    });
  }
};
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
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
.div-3{
  font-size:16px; 
  font-weight:600; 
  padding-top:10px; 
  padding-bottom:10px
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
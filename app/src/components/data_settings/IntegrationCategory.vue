<template>
  <div :id="$options.name" class="q-pa-md">
    <div class="row">
    <router-link class="col-6" :to="'#'+$options.name">
      <h5  @click="onClickTitle()">{{$options.name}}</h5>
    </router-link>
    <div class="col-6" style="margin-top:40px;margin-bottom:40px; text-align:right">
       <q-btn color="info"  no-caps label="Add Category" @click="newIntegrationCategory()" :disable="hideAdd" style="width:200px"/>
    </div>
    </div>
  <q-card class="my-card">
      
      <q-card-section :hidden="hideForm" style="margin-bottom:100px">
        
      <q-tab-panels
        v-model="langTab"
        animated
      >
        <q-tab-panel
          v-for="language in languages"
          :key="language.lang"
          :name="language.name"
        >
        <div style="font-size:16px; font-weight:600"> Integration category </div>
            <q-input
              outlined
              filled
              dense
              v-model="int_cat_shell.translations.filter(filterTranslationModel(language.lang))[0].title"
              label="Enter category title here"
            />
         </q-tab-panel>
        </q-tab-panels>
         <q-card-section class="row">
              <div class="col-8">
                <div style="font-size:16px; font-weight:600"> Publication Date </div>
            <q-input
            outlined
            filled
            dense
              v-model="int_cat_shell.publicationDate"
              label="Publication date"
              readonly
            />
            </div>
            <div class="col-4" style="padding-left:20px;">
              <div style="font-size:16px; font-weight:600"> Publication Date </div>
            <q-toggle
              :value="int_cat_shell.published"
              color="green"
              @input="isPublished(!int_cat_shell.published,$event)"
              left-label
            />
            </div>
          
          </q-card-section>
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
        <q-btn color="accent" no-caps unelevated rounded style="width:100px;border-radius:2px;margin-right:15px; margin-left:10px; margin-top:30px" label="Save" @click="saveIntegrationCategory()" />
        <q-btn class="button" no-caps unelevated rounded style="width:100px;border-radius:2px;margin-right:15px; margin-left:10px; margin-top:30px" label="Cancel" @click="cancelIntegrationCategory()" />
      </q-card-section>
    </q-card>
       <div class="row" style=" padding-bottom:10px">
    
    <div class="col-9 flex flex-left" style="padding-left:15px;">
      Name
    </div>
    <div class="col-1 flex flex-left">
      Published
    </div>
    <div class="col-1 flex flex-center" style="margin-left:0px">
      Edit
    </div> 
    <div class="col-1 flex flex-center" style="padding-left:20px">
      Delete 
    </div>
      </div>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="a_integration_category in integration_category"
        :key="a_integration_category.id"
      >
        <q-item-section class="col-9 flex flex-left" style="font-size:16px; font-weight:600">{{showCategoryLabel(a_integration_category)}}</q-item-section>
        <q-item-section class="col-1 flex flex-left">
          <q-toggle
            v-model="a_integration_category.published"
            color="green"
            disable
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
           <q-icon style="margin-right:10px;" name="img:statics/icons/Edit.png" size="md" @click.stop="editIntegrationCategory(a_integration_category)" />
         
        </q-item-section>
           <q-item-section class="col-1 flex flex-center">

          <q-icon  name="img:statics/icons/Icon - Delete.svg"  @click.stop="deleteIntegrationCategory(a_integration_category.id)" size="md" />
          
        </q-item-section>
      </q-item>
    </q-list>
    
  </div>
</template>

<script>
import editEntityMixin from '../../mixin/editEntityMixin'

export default {
  name: "IntegrationCategory",
  mixins: [editEntityMixin],
  data() {
    return {
      int_cat_shell: { id: -1,  translations:[] },
      hideForm: true,
      hideAdd: false,
      isNew: false
    };
  },
  computed: {
    integration_category() {
      return this.$store.state.integration_category.integration_category;
    }
  },
  methods: {
    isPublished(value, event){
      this.int_cat_shell.published = value
    },
    onClickTitle: function() {
      this.$emit("scroll", "#" + this.$options.name);
    },
    deleteIntegrationCategory(index) {
      console.log(index);
      this.$store.dispatch(
        "integration_category/deleteIntegrationCategory",
        index
      );
    },
    showCategoryLabel (workingCat) {
     
      return workingCat.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].title
    },
    saveIntegrationCategory() {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch(
            "integration_category/saveIntegrationCategory",
            this.int_cat_shell
          )
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch(
            "integration_category/editCategoryTypeElement",
            this.int_cat_shell
          )
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.hideAdd = false
      this.createShell()
    },
    newIntegrationCategory() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelIntegrationCategory() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editIntegrationCategory(integration_category) {
      this.isNew = false;
      this.hideForm = false;
      //this.int_cat_shell = JSON.parse(JSON.stringify(integration_category));
      this.mergeCategory(integration_category)
    },
      createShell () {
      this.int_cat_shell = { id: -1,  translations: [], published: false, publicationDate: null, }
      this.languages.forEach(l => {
        //       console.log(l)
        this.int_cat_shell.translations.push({ id: -1, lang: l.lang, title: '', translationDate: null })
      });
    },
    mergeCategory (category) {
      console.log(category)
      this.int_cat_shell.id = category.id
      this.int_cat_shell.published = category.published
      this.int_cat_shell.publicationDate = category.publicationDate
      category.translations.forEach(tr => {
        console.log(tr)
        //    this.int_topic_shell.translations.filter(function(sh){return sh.lang == tr.lang})

        for (var i = 0; i < this.int_cat_shell.translations.length; i++) {
          if (this.int_cat_shell.translations[i].lang == tr.lang) {
            this.int_cat_shell.translations.splice(i, 1);
            this.int_cat_shell.translations.push(JSON.parse(JSON.stringify(tr)))
            break;
          }
        }
      });

      console.log(this.int_cat_shell)


    },
  },
  //store.commit('increment', 10)
  created() {
    this.createShell()
    this.loading = true;
    console.log(this.$store);
    this.$store
      .dispatch("integration_category/fetchIntegrationCategory")
      .then(processes => {
        this.loading = false;
      });
      
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #000000;
}
.button {
  background-color: white;
  color: black;
  border: 1px solid #C71f40;
}
</style>

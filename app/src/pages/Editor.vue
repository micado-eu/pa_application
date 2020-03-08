<template>
  <q-page class="flex flex-center">
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      <vue-markdown :prerender="myprerender" :postrender="mypostrender" :key="componentKey">
### Solar System Exploration, 1950s – 1960s

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley

text before @residence_permit text after
    </vue-markdown>

  </q-page>
</template>

<script>
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
import VueMarkdown from 'vue-markdown'
//import VRuntimeTemplate from "v-runtime-template";

export default {
  name: 'PageIndex',
  components: {
    VueMarkdown
  },
  methods: {
    myprerender(data){
      console.log("myprerender")
      console.log(data)
      var theG = this.glossary.filter(g => g.id == "@residence_permit")[0]
//      var res = data.replace("@residence_permit", "<div id=\""+theG.id+"\">"+theG.title+"</div><div class=\"hidden\" id=\"learnHTML\" >"+theG.text+"</div>");
      var res = data.replace("@residence_permit", "<a href=\"javascript:void(0);\" onclick=\"javascript:var item = document.getElementById('learnHTML');if (item) {item.className=(item.className=='hidden')?'unhidden':'hidden';}\">"+theG.title+"</a><span class=\"hidden\" id=\"learnHTML\" >"+theG.text+"</span>");

      return res
    },
    mypostrender(data){
      console.log("mypostrender")
      console.log(data)
      console.log(this.glossary)
      console.log(this.glossary.filter(g => g.id == "@residence_permit"))
      var theG = this.glossary.filter(g => g.id == "@residence_permit")[0]
      var res = data.replace("@residence_permit", "<div @click=\"javascript:console.log(this);\">"+theG.title+"</div><div class=\"hidden\" id=\"learnHTML\" >"+theG.text+"</div>");
      this.template = res

var Widget2 = Vue.extend({
//      let Widget2 = {
        template: `
          <p @click="toggleMsg()">Widget2 {{ computed1 }}!</p>
        `,
        computed: {
          computed1: function() {
            return this.msg + "2";
          }
        },
        methods: {
          toggleMsg(){
            console.log(this)
          }
        },
        data() {
          return {
            msg: "home"
          };
        }
      });

      new Widget2().$mount('#mount-point')
/*
      var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// create an instance of Profile and mount it on an element
      new QTooltip().$mount('#mount-point')
      */
      return res
    },
    unhide(){
      console.log("unhide")
      var item = document.getElementById(divID);
      if (item) {
        item.className=(item.className=='hidden')?'unhidden':'hidden';
      }
    }
  },
  data() {
      return {
          template: '',
          editor: ClassicEditor,
          editorData: '<p>Content of the editor.</p>',
          editorConfig: {
            // The configuration of the editor.
//             plugins: [ Mention ],
//            mention: {
//                feeds: [
//                    {
//                        marker: '@',
//                        feed: glossary
//                    }
//                ]
//            }
          },
          componentKey: 0
      };
  },
  computed: {
    glossary () {
      return this.$store.state.glossary.glossary
    },
    created () {
  //    this.loading = true
      this.$store.dispatch('glossary/fetchGlossary')
        .then(glossary => {
  //        this.loading = false
          this.componentKey += 1;
        })
    }
  }
}
</script>
<style scoped>
.hidden { visibility: hidden; }
.unhidden { visibility: visible; }
</style>

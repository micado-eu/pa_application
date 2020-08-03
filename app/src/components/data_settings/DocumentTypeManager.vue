  <template>
  <div :id="$options.name" class="q-pa-md">
    <router-link :to="'#'+$options.name">
      <h5 @click="onClickTitle()">{{$options.name}}</h5>
    </router-link>
    <div style="padding-top:37px; padding-bottom:37px">
      <div class="q-gutter-md justify-center" style="text-align:center">
        <q-btn
          size="lg"
          unelevated
          rounded
          color="accent"
          style="width:750px;border-radius:2px"
          :label="$t('button.add_document')"
          to="/adddocument"
        />
      </div>
    </div>
    <div style="text-align:center">
      <div style=" display: inline-block">
        <q-list>
          <ListItem
            v-for="document_type in document_types"
            :key="document_type.id"
            :Title="document_type.translations.filter(filterTranslationModel(activeLanguage))[0].document"
            :Text="document_type.translations.filter(filterTranslationModel(activeLanguage))[0].description"
            :Image="document_type.icon"
            :Link="document_type.id"
            :theDocumentType="document_type"
            @remove="deleteDocument"
          ></ListItem>
        </q-list>
      </div>
    </div>
  </div>
</template>


<script>
import ListItem from "./ListItem";

export default {
  name: "DocumentTypeManager",
  props: {
    msg: String
  },
  components: {
    ListItem
  },
  data() {
    return {
      activeLanguage: this.$i18n.locale
    };
  },

  computed: {
    document_types() {
      return this.$store.state.document_type.document_type;
    }
  },
  methods: {
    onClickTitle: function() {
      this.$emit("scroll", "#" + this.$options.name);
    },
    deleteDocument(value) {
      var filteredDocuments = this.document_types.filter(filt => {
        console.log("in fil");
        console.log(filt);
        return filt.id == value;
      });
      this.$store.dispatch(
        "document_type/deleteDocumentType",
        filteredDocuments[0].id
      );
    },
     filterTranslationModel (currentLang) {
      return function (element) {
        return element.lang == currentLang;
      }
  }
  },
  created() {
    this.loading = true;
    console.log(this.$store);
    this.$store
      .dispatch("document_type/fetchDocumentType")
      .then(document_types => {
        this.loading = false;
              });
  }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  margin-left: -300px;
  background-color: blue;
}
a {
  text-decoration: none;
  color: #000000;
}
</style>

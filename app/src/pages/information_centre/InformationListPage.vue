<template>
  <div>
    <span v-if="loading">Loading...</span>
    <list-search-tags
      v-if="!loading"
      :elements="informationElems"
      new_url="information/new"
      :edit_url_fn="getEditRoute"
      :delete_fn="deleteItem"
      icon_name="document"
      add_label="Add Event"
      title="Information centre"
      publish_mode
      :update_publish_fn="updatePublishInformationItem"
      categories_enabled
      categories_url="/information/categories"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ListSearchTags from "components/ListSearchTags";
export default {
  data() {
    return {
      loading: true,
      informationElems: []
    };
  },
  components: {
    "list-search-tags": ListSearchTags
  },
  computed: {
    ...mapGetters("information", ["information"]),
    ...mapGetters("information_category", ["informationCategories"]),
  },
  methods: {
    ...mapActions("information", [
      "fetchInformation",
      "deleteInformationItem",
      "updatePublishInformationItem"
    ]),
    ...mapActions("information_category", [
      "fetchInformationCategory",
    ]),
    getEditRoute(id) {
      return "information/" + id + "/edit";
    },
    deleteItem(item) {
      this.loading = true;
      this.deleteInformationItem(item)
        .then(this.fetchInformation)
        .then(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.loading = true;
    this.fetchInformation().then(() => {
      this.fetchInformationCategory().then(() => {
        this.informationElems = JSON.parse(JSON.stringify(this.information))
        let informationCategoryElems = [...this.informationCategories]
        for (let category of informationCategoryElems) {
          for (let translation of category.translations) {
            translation.category = translation["eventCategory"]
            delete translation.eventCategory
          }
        }
        for (let elem of this.informationElems) {
          let idxCat = elem.category
          let idxCategoryObject = informationCategoryElems.findIndex(ic => ic.id === idxCat)
          elem.category = informationCategoryElems[idxCategoryObject]
        }
        this.loading = false;
      })
    });
  }
};
</script>

<style></style>

<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-element
      v-if="!loading"
      :elem="elem"
      :save_item_fn="saveInformationItem"
      :tags="tags"
      :pagetitle="pagetitle"
      tags_enabled
      :categories=informationCategories
      categories_enabled
    />
  </div>
</template>

<script>
import EditElement from "components/EditElement";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditInformationElement",
  components: {
    "edit-element": EditElement
  },
  data() {
    return {
      loading: true,
    }
  },
  props: {
    elem: {
      type: Object
    },
    tags: {
      type: Array
    },
    pagetitle: {
      type: String
    }
  },
  methods: {
    ...mapActions("information_category", ["fetchInformationCategory"]),
    saveInformationItem(title, desc, lang, category, tags) {
      // TODO: Reenable tags
      this.$emit("save", { title, description: desc, lang, category });
    }
  },
  computed: {
    ...mapGetters("information_category", ["informationCategories"]),
  },
  created() {
    this.loading = true
    this.fetchInformationCategory().then(() => {
      this.loading = false
    })
  }
};
</script>

<style lang="scss" scoped></style>

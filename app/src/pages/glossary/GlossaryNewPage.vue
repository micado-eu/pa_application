<template>
  <edit-glossary
    pagetitle="glossary.add_new"
    v-on:save="saveNewGlossaryItemAndReturn($event)"
  />
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    "edit-glossary": require("components/glossary/EditGlossaryElement.vue")
      .default
  },
  methods: {
    ...mapActions("glossary", [
      "saveNewGlossaryItem",
      "addNewGlossaryItemTranslation",
      "deleteGlossaryItem"
    ]),
    saveNewGlossaryItemAndReturn(translationData) {
      let router = this.$router;
      let id = -1;
      let glossaryData = {
        published: true,
        publicationDate: new Date().toISOString()
      };
      this.saveNewGlossaryItem(glossaryData)
        .then(newData => {
          id = newData.id;
          let dataWithId = Object.assign(translationData, { id });
          return this.addNewGlossaryItemTranslation(dataWithId);
        })
        .then(() => {
          router.push({ path: "/glossary" });
        })
        .catch(() => {
          if (id !== -1) {
            this.deleteGlossaryItem({ id });
          }
        });
    }
  }
};
</script>

<style></style>

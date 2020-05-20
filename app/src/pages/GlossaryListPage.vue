<template>
  <div class="q-pa-md">
    <q-input
      color="accent"
      v-model="search"
      debounce="500"
      filled
      outlined
      label="Search"
      label-color="accent"
      class="q-mb-md"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-toolbar class="bg-accent text-white shadow-2">
      <q-avatar>
        <q-icon name="sort_by_alpha"/>
      </q-avatar>
      <q-toolbar-title>Glossary</q-toolbar-title>
      <q-btn flat round dense label="New" to="glossary/new" />
    </q-toolbar>
    <span v-if="loading">Loading...</span>
    <q-list
      bordered
      v-if="!loading"
    >
      <q-item
        v-for="glossaryItem in filteredGlossary"
        :key="glossaryItem.id"
        clickable
        @mouseover="editButtonToShow=glossaryItem.id"
        @mouseleave="editButtonToShow=-1"
      >
        <q-item-section>
          <q-item-label>{{ glossaryItem.title }}</q-item-label>
        </q-item-section>
        <q-item-section
          side
          v-if="editButtonToShow===glossaryItem.id"
        >
          <q-btn
            label="Edit"
            color="accent"
            :to="getEditRoute(glossaryItem.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Fuse from 'fuse.js'
export default {
  data () {
    return {
      loading: false,
      editButtonToShow: -1,
      filteredGlossary: [],
      searchText: ""
    }
  },
  computed: {
    ...mapGetters("glossary", ["glossary"]),
    search: {
      get () {
        return this.searchText
      },
      set (newSearch) {
        if (newSearch) {
          const fuse = new Fuse(this.glossary, {
            keys: ['title', 'description'],
          })
          this.filteredGlossary = fuse.search(newSearch).map(i => i.item)
          this.searchText = newSearch
        } else {
          this.filteredGlossary = this.glossary
          this.searchText = ""
        }
      }
    }
  },
  methods: {
    ...mapActions("glossary", ["fetchGlossary"]),
    getEditRoute(id) {
      return "glossary/" + id + "/edit"
    }
  },
  created () {
    this.loading = true
    this.fetchGlossary().then(() => {
      this.filteredGlossary = this.glossary
      this.loading = false
    })
  }
}
</script>

<style>
</style>
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
        <q-icon name="sort_by_alpha" />
      </q-avatar>
      <q-toolbar-title>{{title}}</q-toolbar-title>
      <q-btn
        flat
        round
        dense
        label="New"
        :to="new_url"
      />
    </q-toolbar>
    <q-list
      bordered
    >
      <q-item
        v-for="item in filteredElements"
        :key="item.id"
        clickable
        @mouseover="editButtonToShow=item.id"
        @mouseleave="editButtonToShow=-1"
      >
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
        <q-item-section
          side
          v-if="editButtonToShow===item.id"
        >
          <q-btn
            label="Edit"
            color="accent"
            :to="edit_url_fn(item.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
export default {
  name: "ListSearchTags",
  props: ["elements", "new_url", "edit_url_fn", "title"],
  data () {
    return {
      editButtonToShow: -1,
      filteredElements: this.elements,
      searchText: ""
    }
  },
  computed: {
    search: {
      get () {
        return this.searchText
      },
      set (newSearch) {
        if (newSearch) {
          const fuse = new Fuse(elements, {
            keys: ['title', 'description'],
          })
          this.filteredElements = fuse.search(newSearch).map(i => i.item)
          this.searchText = newSearch
        } else {
          this.filteredElements = elements
          this.searchText = ""
        }
      }
    }
  },
}
</script>

<style>
</style>
<template>

  <q-item
    style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px"
  >
    <div>
      <div class="row">
        <div class=" q-pa-md col" style="width:1000px">
          <div style="font-size:20px">{{ this.Title }}</div>
        </div>
      <div class=" q-pa-md  col" style="width:1000px">
        <q-chip v-for="tag in Tag_1" :label="tag" :key="tag"></q-chip>
        <q-chip v-for="tag in Tag_2" :label="tag" :key="tag"></q-chip>
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm row">
      <q-btn color="accent" label="Edit" :to="this.Path +'/edit/' + this.Link" />
      <q-btn color="accent" label="Delete" />
      <q-btn color="accent" label="Manage steps" :to="'processmanager/edit/' + this.Link + '/steps'" />
    </div>
    </div>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title",  "Tag_1", "Tag_2", "Link", "Path"], 
  data() {
    return {};
  }
};
</script>
<style scoped>
div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}
</style>
<template>

  <q-item
  style="padding-top:0px; padding-bottom:0px"
  >
    <div>
      <div >
        <div class=" q-pa-md col" style="width:750px; padding-bottom:0px; padding-left:0px">
          <div style="font-size:20px; text-align:left; font-size:18px">{{ this.Title }}</div>
        </div>
     
    </div>
    <div class=" row" style="width:750px">
       <div class=" q-pa-md  col" style="text-align:left; padding-top:0px;padding-bottom:0px;padding-left:0px">
        <q-chip v-for="tag in Tag_1" :label="tag" :key="tag"></q-chip>
        <q-chip v-for="tag in Tag_2" :label="tag" :key="tag"></q-chip>
      </div>
      <div class="q-pa-md q-gutter-sm  col" style="padding-top:0px; padding-bottom:0px; text-align:right">
      <q-btn size="11px" no-caps style="width:70px;" rounded color="info" label="Edit" :to="this.Path +'/edit/' + this.Link" />
      <q-btn size="11px" no-caps style="width:70px" rounded color="secondary" label="Manage" :to="'processmanager/edit/' + this.Link + '/steps'" />
      <q-btn size="11px" no-caps style="width:70px" rounded color="accent" label="Delete" />
      
      </div>
    </div>
    <hr style="margin:0px">
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
/*div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}*/
</style>
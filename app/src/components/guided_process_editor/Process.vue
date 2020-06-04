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
        <q-chip dense v-for="tag in Tag_1" :label="tag.label" :key="tag.value"></q-chip>
        <q-chip dense v-for="tag in Tag_2" :label="tag.label" :key="tag.value"></q-chip>
      </div>
      <div class="q-pa-md q-gutter-sm  col" style="padding-top:0px; padding-bottom:0px; text-align:right">
      <q-btn size="11px" no-caps style="width:70px;border-radius:2px; margin-bottom:5px" unelevated rounded color="info" label="Edit" :to="this.Path +'/edit/' + this.Link" />
      <q-btn size="11px" no-caps style="width:70px;border-radius:2px; margin-bottom:5px" unelevated rounded color="secondary" label="Manage" :to="'guided_process_editor/edit/' + this.Link + '/steps'" />
      <q-btn size="11px" no-caps style="width:70px;border-radius:2px; margin-bottom:5px" unelevated rounded color="negative" label="Delete" @click="remove_process($event)" />
      
      </div>
    </div>
    <hr style="margin:0px">
    </div>
  </q-item>
</template>

<script>
export default {
  name: 'Process',
  props: ["Title",  "Tag_1", "Tag_2", "Link", "Path"], 
  data() {
    return {};
  },

  methods: {
  remove_process(event){
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('remove', this.Link)

    }
  }
}
</script>
<style scoped>
/*div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}*/
</style>
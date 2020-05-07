<template>

  <q-item
    style="padding-top:0px; padding-bottom:0px; padding-left:0px"
  >
    <div>
    <div class="row">
    <div class="col" style="width:750px; padding-bottom:0px; padding-left:0px; padding-top:0px">
     <div style="font-size:20px; text-align:left; font-size:18px">{{ this.Title }}</div>
    </div>
    
     <div class="q-pa-md q-gutter-sm  col" style="padding-top:0px; padding-bottom:0px; text-align:right">
      <q-btn size="11px" no-caps style="width:70px;" rounded color="info" label="Edit" :to="'/edit_step/' + this.Link" />
      <q-btn size="11px" no-caps style="width:70px" rounded color="accent" label="Delete" @click="remove_step($event)" />
    </div>
    
    </div>
    <hr style="margin:5px">
    </div>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title",  "Tag_1", "Tag_2", "Link"], 
  data() {
    return {};
  }, 
  methods:{
    remove_step(event){
      let target = event.currentTarget.id
      console.log(typeof(this.Link))
      this.$emit('remove', this.Link)

    }
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
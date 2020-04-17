<template>

  <q-item
    style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px"
  >
  <q-item-section class="col-2" style="max-width:30%">
        <img style="max-width:150px" :src="this.Image">
      </q-item-section>
 
    
    <div class="col-8">
    <div class="row">
    <q-item style="border-radius: 2.00rem; max-width : 100%">
      <q-item-section class="col" style="font-size:30px">{{ this.Title }}</q-item-section>
    </q-item>
    </div>
    <div class="row">
    <q-item style="border-radius: 2.00rem;">
      <q-item-section class="col" >{{ this.Text }}</q-item-section>
    </q-item>
    </div>
    </div>
    <div class="q-pa-md col-2">
    <div class=" q-pa-md row">
      <q-btn color="accent" label="Edit" style="width:100px" to="/placeholder"/>
    </div>
    <div class=" q-pa-md row">
      <q-btn color="red" label="Delete" style="width:100px" to="/placeholder"/>
    </div>
    </div>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title", "Text", "Image", "Tag_1", "Tag_2", "Bool", "Link"],
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
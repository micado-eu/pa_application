<template>
<div style=" padding-bottom:20px">
  <q-item
    style="width: 750px;padding-top:0px"
  >
    <q-item-section
    class="col-2"
    style="width:96px;height:64px">
        <img 
        style="width:64px;height:64px;margin-top:20px" 
        :src="this.Image">
    </q-item-section>
 
    
    <div
    class="col-9"
    style="height:64px">
      <div 
      class="row" 
      style="height:32px;vertical-align:text-top">
        <q-item style="padding-top:0px;">
          <q-item-section 
          class="col" 
          style="font-size:15px; font-weight:600;">
          {{ this.Title }}
          </q-item-section>
        </q-item>
    </div>
    <div 
    class="row" 
    style="height:32px; text-align:left">
      <q-item 
      style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;line-height: 22px;max-height: 42px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;font-size:13px;padding-top:0px;">
        <q-item-section 
        class="col">
        {{ this.Text }}
        </q-item-section>
      </q-item>
    </div>
    </div>
    <div
    class="col-2" style="text-align:center;">
      <div 
      class="row" 
      style="padding-bottom:3.5px; display: inline-block">
        <q-btn
        class="q-px-md q-py-s"
        color="accent"
        style="font-size:13px;font-weight:600;width:70px;"
        unelevated
        rounded 
        label="Edit"
        no-caps
        :to="'adddocument/' + this.Link"/>
      </div>
      <div 
      class="row" 
      style="padding-top:3.5px;  display: inline-block">
        <q-btn
        class="q-px-md q-py-s"
        color="info"
        style="font-size:13px;font-weight:600;width:70px;"
        unelevated
        rounded
        @click="remove_doc($event)"
        label="Delete"
        no-caps
        />
      </div>
     
    </div>
    
  </q-item>
  <hr style="margin:0px">
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ["Title", "Text", "Image", "Tag_1", "Tag_2", "Bool", "Link", "ID"],
  data() {
    return {};
  }, 
  methods: {
    remove_doc(event){
      let target = event.currentTarget.id
      console.log(this.Link)
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
.button{
  font-size:26px;
  font-weight:600;
}
</style>
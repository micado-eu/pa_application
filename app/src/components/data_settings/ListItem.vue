<template>
<div class="div-1">
  <q-item id="item-1">
    <q-item-section class="col-2 section-1">
        <img 
        id="image"
        :src="this.Image">
    </q-item-section>
    <div class="col-9 div-2">
      <div class="row div-3" >
        <q-item id="item-2" >
          <q-item-section class="col section-2" >
          {{ this.Title }}
          </q-item-section>
        </q-item>
    </div>
    <div class="row div-4" >
      <q-item id="item-3">
        <q-item-section class="col">
        {{ this.Text }}
        </q-item-section>
      </q-item>
    </div>
    </div>
    <div class="col-2 div-5">
      <div class="row div-6">
        <q-btn
        class="q-px-md q-py-s button"
        color="info"
        unelevated
        rounded 
        :label="$t('button.edit')"
        no-caps
        @click="editDocumentType()"/>
      </div>
      <div class="row div-7">
        <q-btn
        class="q-px-md q-py-s button"
        color="negative"
        unelevated
        rounded
        @click="remove_doc($event)"
        :label="$t('button.delete')"
        no-caps
        />
      </div>
    </div>
  </q-item>
  <hr id="hr">
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ["Title", "Text", "Image", "Tag_1", "Tag_2", "Bool", "Link", "ID", "theDocumentType"],
  data() {
    return {};
  }, 
  methods: {
    remove_doc(event){
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('remove', this.Link)

    },
    editDocumentType () {
      console.log("prima di mandare i process")
      console.log(this.theDocumentType)
      this.$router.push({ name: 'editdocumenttype', params: { thedocumenttypeid: this.theDocumentType.id } })
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
  font-size:13px;
  font-weight:600;
  width:70px;
  border-radius:2px
}
.div-1{
  padding-bottom:20px
}
#item-1{
  width: 750px;
  padding-top:0px
}
.section-1{
  width:96px;
  height:64px
}
#image{
  width:64px;
  height:64px;
  margin-top:20px
}
.div-2{
  height:64px
}
.div-3{
  height:32px;
  vertical-align:text-top
}
#item-2{
  padding-top:0px;
}
.section-2{
  font-size:15px; 
  font-weight:600;
}
.div-4{
  height:32px; 
  text-align:left
}
#item-3{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 22px;
  max-height: 42px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size:13px;
  padding-top:0px;
}
.div-5{
  text-align:center;
}
.div-6{
  padding-bottom:3.5px;
  display: inline-block
}
.div-7{
  padding-top:3.5px; 
  display: inline-block
}
#hr{
  margin:0px
}
</style>
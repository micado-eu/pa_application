<template>
  <div>
    <q-item
    class="item"
    >
   <q-item-section class="col-2 section">
        <img 
        class="image"
        :src="this.Image">
    </q-item-section>
      <div class="col-10 div-1">
      <div class="row div-2">
          <q-item-section class="col section-2">
          {{ this.Title }}
          </q-item-section>
    </div>
    <div>
    <!--<q-icon class="icon" name="img:statics/icons/Edit.png" size="md" @click.stop="editing" />
    <q-icon class="icon" name="img:statics/icons/Send.png" size="md" />
    <q-icon :id="this.Link" name="img:statics/icons/Icon - Delete.svg" @click.stop="deleteDocument($event)" size="md" />-->
    </div>
    </div>
    </q-item>
    <hr class="hr">
    </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["Title", "Image", "Link", "theDocument"],
  data () {
    return {}
  },
  methods:{
  /*  editing(){
      console.log("prima di mandare i process")
      console.log(this.theDocument)
      this.$router.push({ name: 'editdocument', params: { thedocid: this.Link} })
    },
    deleteDocument(){
      console.log("in delete document event")
      this.$emit('delete', event.currentTarget.id)
    },
    viewDoc(){
      this.$router.push({ name: 'viewdocument', params: { thedocid: this.Link } })
    }*/
  }
}
</script>
<style scoped>
#title {
   font-size: 16pt;
   font-weight: bold;
}
.item{
  padding-top:0px;
  padding-right:0px
}
.section{
  width:96px;
  height:64px
}
.image{
  width:64px;
  height:64px;
  margin-top:20px
}
.div-1{
  height:64px
}
.div-2{
  height:32px;
  vertical-align:text-top
}
.section-2{
  font-size:15px; 
  font-weight:600;
}
.icon{
  margin-right:10px;
}
.hr{
  border: 1px solid #E8E8E8
}
</style>
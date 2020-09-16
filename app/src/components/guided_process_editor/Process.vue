<template>

  <q-item class="item">
    <div class="width">
      <div class="row">
          <div class="col-8 flex flex-left title" >{{ this.Title }}</div>
            <q-item-section class="col-1.3 flex flex-center margin">
              <q-icon  name="img:statics/icons/Edit.png" size="md" @click.stop="editProcess()" />
            </q-item-section>
            <q-item-section class="col-1.3 flex flex-center" >
              <q-icon name="img:statics/icons/Icon - manage (guided processes).png"  @click.stop="manageProcess()" size="md" />
            </q-item-section>
            <q-item-section class="col-1.3 flex flex-center" >
              <q-icon name="img:statics/icons/Icon - Delete.svg"  @click.stop="remove_process($event)" size="md" />
            </q-item-section>
      </div>
      <hr class="hr">
    </div>
  </q-item>
</template>

<script>
export default {
  name: 'Process',
  props: ["Title", "Tag_1", "Tag_2", "Link", "Path", "theProcess"],
  data () {
    return {};
  },
  methods: {
    remove_process (event) {
      let target = event.currentTarget.id
      console.log(this.Link)
      this.$emit('remove', this.Link)
    },
    editProcess () {
      console.log("prima di mandare i process")
      console.log(this.theProcess)
      this.$router.push({ name: 'editprocess', params: { theprocessid: this.theProcess.id } })
    },
    manageProcess () {
      console.log("prima di editare gli step")
      console.log(this.theProcess.id)
      console.log(this.theProcess)
      this.$router.push({ name: 'editstep', params: { processId: this.theProcess.id } })
    }
  }
}
</script>
<style scoped>
.item{
  padding-top:0px; 
  padding-bottom:20px;
}
.width{
  width:100%
}
.title{
  text-align:left; 
  font-size:18px
}
.margin{
  margin-left:30px
}
.hr{
  margin:0px;
  border: 0.999px solid #EFEFEF
}
</style>
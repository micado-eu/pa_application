<template>

  <q-item style="padding-top:0px; padding-bottom:20px; ">
    <div style="width:100%">
      <div class="row">
        
          <div class="col-8 flex flex-left" style=" text-align:left; font-size:18px">{{ this.Title }}</div>
        

     <!-- </div>
      <div
        class=" row"
        style="width:750px"
      >-->
      <!--  <div
          class=" q-pa-md  col"
          style="text-align:left; padding-top:0px;padding-bottom:0px;padding-left:0px"
        >
          <q-chip
            dense
            v-for="tag in Tag_1"
            :label="tag.label"
            :key="tag.value"
          ></q-chip>
          <q-chip
            dense
            v-for="tag in Tag_2"
            :label="tag.label"
            :key="tag.value"
          ></q-chip>
        </div>-->
        
         <q-item-section class="col-1.3 flex flex-center" style="margin-left:30px">
          <q-icon  name="img:statics/icons/Edit.png" size="md" @click.stop="editProcess()" />
          </q-item-section>
          <q-item-section class="col-1.3 flex flex-center" >
         <q-icon style="marign-left:30px" name="img:statics/icons/Icon - manage (guided processes).png"  @click.stop="manageProcess()" size="md" />
        </q-item-section>
          <q-item-section class="col-1.3 flex flex-center" >
         <q-icon style="marign-left:30px" name="img:statics/icons/Icon - Delete.svg"  @click.stop="remove_process($event)" size="md" />
        </q-item-section>
        
         <!-- <q-btn
            size="11px"
            no-caps
            style="width:70px;border-radius:2px; margin-bottom:5px"
            unelevated
            rounded
            color="info"
            :label="$t('button.edit')"
            @click="editProcess()"
          />
          <q-btn
            size="11px"
            no-caps
            style="width:70px;border-radius:2px; margin-bottom:5px"
            unelevated
            rounded
            color="secondary"
            :label="$t('button.manage')"
            @click="manageProcess()"
          />
          <q-btn
            size="11px"
            no-caps
            style="width:70px;border-radius:2px; margin-bottom:5px"
            unelevated
            rounded
            color="negative"
            :label="$t('button.delete')"
            @click="remove_process($event)"
          />-->

        
      </div>
      <hr style="margin:0px;border: 0.999px solid #EFEFEF">
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
      this.$router.push({ name: 'editprocess', params: { theprocess: this.theProcess } })
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
/*div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}*/
</style>
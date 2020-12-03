<template>

  <q-item class="item">
    
    <div class="width">
      <div class="row">
          <div class="col-7 flex flex-left title" >{{ this.Title }}</div>
            <q-item-section class="col-1 flex flex-center">
            <q-toggle
            v-model="theProcess.published"
            color="orange"
            disable
            @input="isPublished($event, theProcess.id)"
          />            
          </q-item-section>
            <q-item-section class="col-1 flex flex-center margin">
              <IconWithTooltip :icon="'img:statics/icons/Edit.png'" :tooltip="$t('help.edit_process')" @click.native="editProcess()" :data-cy="'editprocess'.concat(theProcess.id )"/>
            </q-item-section>
            <q-item-section class="col-1 flex flex-center top" >
              <IconWithTooltip :icon="'img:statics/icons/Icon - manage (guided processes).png'" :tooltip="$t('help.manage_process')" @click.native="manageProcess()" :data-cy="'manageprocess'.concat(theProcess.id )"/>
            </q-item-section>
            <q-item-section class="col-1 flex flex-center top" >
              <IconWithTooltip :icon="'img:statics/icons/Icon - Delete.svg'" :tooltip="$t('help.delete_process')" @click.native="remove_process($event)" :data-cy="'deleteprocess'.concat(theProcess.id )"/>
            </q-item-section>
      </div>
       <div class="row pad">
            <img
                class="image"
                v-for="tag in Topics"
                :src="processTopics.filter(topic => topic.id == tag.idTopic)[0].icon"
                :key="'topic'.concat(tag.idTopic)">
              </img>
               <q-img
                class="image"
                v-for="tag in Users"
                :src="processUsers.filter(user => user.id == tag.idUserTypes)[0].icon"
                :key="'user'.concat(tag.idUserTypes)"
              >
              </q-img>  
            </div>
      <hr class="hr">
    </div>
  </q-item>
</template>

<script>
import IconWithTooltip from '../IconWithTooltip'
export default {
  name: 'Process',
  props: ["Title", "Topics", "Users", "Link", "Path", "theProcess", "processTopics", "processUsers"],
  data () {
    return {};
  },
  components:{IconWithTooltip},
  methods: {
    isPublished(event, value){
      console.log(event)
      console.log(value)
      this.$emit('publish', {isPublished: event, process_id: value})
    },
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
  margin-left:30px;
  margin-top:10px
}
.top{
  margin-top:10px
}
.hr{
  margin:0px;
  border: 0.999px solid #EFEFEF
}
.image{
  height: 25px; 
  max-width: 25px;
  margin-right:5px
}
.pad{
  padding-bottom:5px
}
</style>
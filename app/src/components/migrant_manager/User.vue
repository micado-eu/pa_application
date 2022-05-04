<template>
  <div>
    <div
      class="item"
      style="margin-right:0px"
    >
      <div class="row">
        <div class="col-8 username ">
          {{ this.Username }}
        </div>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            v-if="features.includes('FEAT_TASKS')"
            style="float:right"
            :icon="'img:statics/icons/Icon - Integration.svg'"
            :tooltip="$t('help.integration')"
            @click.native="interventionPlan()"
            :data-cy="'interventionplan'.concat(theUser.id)"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            style="float:right"
            :icon="'img:statics/icons/Icon - Data.svg'"
            :tooltip="$t('help.migrant_data')"
            @click.native="migrantData()"
            :data-cy="'userdata'.concat(theUser.id)"
          />
        </q-item-section>
        <q-item-section class="col-1 flex flex-center top">
          <IconWithTooltip
            style="float:right"
            :icon="'img:statics/icons/Icon - Delete.svg'"
            :tooltip="$t('help.delete_user')"
            @click.native="remove_user($event)"
            :data-cy="'deleteuser'.concat(theUser.id)"
          />
        </q-item-section>
      </div>
      <div class="row width">
        <div class=" q-pa-md  col-8 container">
          <span class="span">{{ this.theUser.firstName }}</span>
          <span class="span">|</span>
          <span class="span">{{ this.theUser.lastName }}</span>
          <span class="span">|</span>
          <span class="span">{{ this.theUser.email }}</span>
        </div>
      </div>
    </div>
    <hr class="hr">
  </div>
</template>

<script>
import IconWithTooltip from '../IconWithTooltip'
import storeMappingMixin from '../../mixin/storeMappingMixin'

export default {
  name: 'Process',
  props: ["Username",  "Age", "Nationality", "Gender", "Path", "theUser"], 
  data() {
    return {}
  },
  mixins: [
    storeMappingMixin({
      getters: {
        features: "features/featureFlags"
      },
      actions: {
      }
    })],
  components:{
    IconWithTooltip
  },
  computed: {
      /*dateOfBirth () {
      var dob=""
      var dob_arr =  this.theUser.attributes.filter((attr)=>{
        return attr.umAttrName == "dateOfBirth"
      })
      if(dob_arr.length>0){
        dob = dob_arr[0].umAttrValue 
      }
      return dob
    },
    nationality () {
      var country = ""
      var country_arr = this.theUser.attributes.filter((attr)=>{
        return attr.umAttrName == "country"
      })
      if(country_arr.length>0){
        country = country_arr[0].umAttrValue 
      }
      return country
    },
    gender () {
      var gender =""
      var gender_arr =  this.theUser.attributes.filter((attr)=>{
        return attr.umAttrName == "gender"
      })
      if(gender_arr.length>0){
        gender = gender_arr[0].umAttrValue 
      }
      return gender
    }*/
  },
  methods: {
    remove_user(event){
       let target = event.currentTarget.id
      console.log(this.Path)
      this.$emit('remove', this.Path)

    },
      interventionPlan(){
      console.log(this.theUser)
      this.$router.push({ name: 'interventionplan', params: { theuserid: this.theUser.id } })
    },
    migrantData(){
      this.$router.push({ name: 'migrantdata', params: { theuserid: this.theUser.id, theusername: this.Username } })
    }
  
  }
}
</script>
<style scoped>
.item{
  padding-top:16px;
  padding-bottom:0px;
  width:100%
}
.username{
 font-size:20px; 
 text-align:left; 
 font-weight: 600;
 font-size:18px;
 padding-bottom:0px; 
 padding-left:0px
}
.width{
  width:100%
}
.container{
  text-align:left; 
  padding-top:0px;
  padding-bottom:0px;
  padding-left:0px
}
.span{
  padding-right:5px;
  font-size: 15px;
}
.button-container{
  padding-top:0px; 
  padding-right:0px;
  padding-bottom:0px; 
  text-align:center;
}
.button{
  width:70px;
  margin-bottom:5px;
  border-radius:2px
}
.hr{
  margin:0px
}
</style>
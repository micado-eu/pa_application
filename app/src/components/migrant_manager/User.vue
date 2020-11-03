<template>
<div>
<div class="item">
        
        
    <div class="col-12 username ">{{ this.Username }}</div>
        
    <div class="row width">
       <div class=" q-pa-md  col-8 container" >
        <span class="span">{{this.Age}}</span>
        <span class="span">|</span>
        <span class="span">{{this.Nationality}}</span>
        <span class="span">|</span>
        <span class="span">{{this.Gender}}</span>
      </div>
      <div class="q-pa-md q-gutter-sm  col-4 button-container">
        <div class="row">
          <div class="col-4">
      <q-icon name="img:statics/icons/Icon - Integration.svg" size="md" :data-cy="'interventionplan'.concat(theUser.umId)" @click="interventionPlan()"  />
          </div>
          <div class="col-4">
            <q-icon name="img:statics/icons/Icon - Data.svg" size="md" :data-cy="'userdata'.concat(theUser.umId)"  @click="migrantData()"  />
          </div>
          <div class="col-4">
            <q-icon name="img:statics/icons/Icon - Delete.svg" size="md" :data-cy="'deleteuser'.concat(theUser.umId)"  @click="remove_user($event)" />
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
  <hr class="hr">
</div>
</template>

<script>
export default {
  name: 'Process',
  props: ["Username",  "Age", "Nationality", "Gender", "Path", "theUser"], 
  data() {
    return {};
  },

  methods: {
    remove_user(event){
       let target = event.currentTarget.id
      console.log(this.Path)
      this.$emit('remove', this.Path)

    },
      interventionPlan(){
      console.log(this.theUser)
      this.$router.push({ name: 'interventionplan', params: { theuserid: this.theUser.umId } })
    },
    migrantData(){
      this.$router.push({ name: 'migrantdata', params: { theuserid: this.theUser.umId } })
    }
  
  }
}
</script>
<style scoped>
.item{
  padding-top:16px;
  padding-bottom:0px;
  width:98%
}
.username{
 font-size:20px; 
 text-align:left; 
 font-size:18px;
 width:100%; 
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
  padding-right:5px
}
.button-container{
  padding-top:0px; 
  padding-bottom:0px; 
  text-align:right;
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
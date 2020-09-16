<template>
<q-item class="item">
        <div>
        
          <div class="username">{{ this.Username }}</div>
        
    <div class="row width">
       <div class=" q-pa-md  col container" >
        <span class="span">{{this.Age}}</span>
        <span class="span">|</span>
        <span class="span">{{this.Nationality}}</span>
        <span class="span">|</span>
        <span class="span">{{this.Gender}}</span>
      </div>
      <div class="q-pa-md q-gutter-sm  col button-container">
      <q-btn size="11px" no-caps class="button" unelevated rounded color="secondary" :label="$t('button.integration')" @click="interventionPlan()"  />
      <q-btn size="11px" no-caps class="button" unelevated rounded color="negative" :label="$t('button.delete')" @click="remove_user($event)" />
      
      </div>
    </div>
    <hr class="hr">
    </div>
  </q-item>
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
    }
  
  }
}
</script>
<style scoped>
.item{
  padding-top:16px;
  padding-bottom:0px
}
.username{
 font-size:20px; 
 text-align:left; 
 font-size:18px;
 width:750px; 
 padding-bottom:0px; 
 padding-left:0px
}
.width{
  width:750px
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
  text-align:right
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
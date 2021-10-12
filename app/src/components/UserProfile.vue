<template>
<div>
   <div class="row container">
     <div class="col">
     <div class="header">{{this.umUserName}}</div>
    <span class="span-1">{{$t('profile.username')}}: </span><span class="span-2">{{this.umUserName}}</span> <br>
      <span class="span-1">{{$t('profile.legal_name')}}: </span><span class="span-2">{{this.fullname}}</span><br>
      <span class="span-1">{{$t('profile.age')}}: </span><span class="span-2">{{this.dateOfBirth}}</span><br>
      <span class="span-1">{{$t('profile.nationality')}}: </span><span class="span-2">{{this.nationality}}</span><br>
      <span class="span-1">{{$t('profile.gender')}}: </span><span class="span-2">{{this.gender}}</span><br>
     </div>
     <div class="col image-container">
       <img
          v-if="userPicture == null"
          class="col-6 image"
          src="~assets/UserProfile.png"
        />
        <img
          v-else
          
          class="col-6 image"
          :src="userPicture"
        />
     </div>
    <!--<q-card class="my-card" flat >
      <q-card-section horizontal>
        <q-card-section class="section">
         <div>
      <span class="span-1">{{$t('profile.username')}}: </span><span class="span-2">{{this.umUserName}}</span>
  </div>
  <div>
      <span class="span-1">{{$t('profile.legal_name')}}: </span><span class="span-2">{{this.fullname}}</span>
  </div>
  <div>
      <span class="span-1">{{$t('profile.age')}}: </span><span class="span-2">{{this.dateOfBirth}}</span>
  </div>
  <div>
      <span class="span-1">{{$t('profile.nationality')}}: </span><span class="span-2">{{this.nationality}}</span>
  </div>
  <div>
      <span class="span-1">{{$t('profile.gender')}}: </span><span class="span-2">{{this.gender}}</span>
  </div>
        </q-card-section >
<div class="image-container">
        <img
          v-if="userPicture == null"
          width="250px"
          height="250px"
          class="col-6 image"
          src="~assets/UserProfile.png"
        />
        <img
          v-else
          width="250px"
          height="250px"
          class="col-6 image"
          :src="userPicture"
        />
    </div>
      </q-card-section>
    </q-card>-->
   </div>
   </div>
</template>

<script>
export default {
  name: "UserProfile",
  props:["umUserName", "fullname","dateOfBirth", "nationality", "gender", "userPicture"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    addInterventionPlan(){
       console.log(this.user)
      this.$router.push({ name: 'addinterventionplan', params: { theuser: this.user, theuserid: this.user.umId } })
    }
  }
}
</script>

<style scoped>
.container{
  width:100%
}
.header{
  margin-bottom:30px;
  padding-left:0px;
  width:65%; 
font-size: 33px;
line-height: 45px;
font-weight: 600;
}
.top-span{
  text-align:right; 
  width:35%;
  display: inline-block; 
  vertical-align:middle
}
.add-button{
  width:250px; 
  margin-top:37px; 
  margin-bottom:30px;
  margin-left:5px; 
  border-radius:2px
}
.my-card{
width:100%; 
margin-left:10px
}
.section{
width:100%;
padding-left:2px
}
.span-1{
text-align:left;
font-size:20pt;
}
.span-2{
font-size:20pt
}
.image-container{
  text-align: right;
  width:50%;
}
.image{
border-radius:10px;
width: 50%;
max-width: 200px;
height: auto;
}
</style>

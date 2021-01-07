<template>
<div>
   <div class="row container">
     <h3 class="header">{{this.umUserName}}</h3>
     
    <q-card class="my-card" flat >
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
          width="250px"
          height="250px"
          class="col-6 image"
          src="~assets/UserProfile.png"
        />
    </div>
      </q-card-section>
    </q-card>
   </div>
   </div>
</template>

<script>
export default {
  name: "UserProfile",
  props:["umUserName", "fullname","dateOfBirth", "nationality", "gender"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    addInterventionPlan(){
       console.log(this.user)
      this.$router.push({ name: 'addinterventionplan', params: { theuser: this.user, theuserid: this.user.umId } })
    }
  }
};
</script>

<style scoped>
.container{
  width:100%
}
.header{
  margin-bottom:30px;
  padding-left:12px;
  width:65%; 
  font-size:25pt; 
  font-weight:600
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
border-radius:10px
}
</style>

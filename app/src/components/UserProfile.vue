<template>
<div>
   <div class="row items-start q-gutter-md">
     <h3 style="margin-bottom:0px">{{user.username}}</h3>
    <q-card class="my-card" style="width:800px" flat bordered>
      <q-card-section horizontal>
        <q-card-section style="width:50%">
         <div>
      <span style="text-align:left;font-size:20px">Username: </span><span style="font-size:20px">{{user.username}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20px">Legal name: </span><span style="font-size:20px">{{user.username}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20px">Age: </span><span style="font-size:20px">{{user.age}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20px">Nationality: </span><span style="font-size:20px">{{user.nationality}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20px">Gender: </span><span style="font-size:20px">{{user.gender}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20px">Status: </span><span style="font-size:20px">{{user.user_type}}</span>
  </div>
        </q-card-section >
<div style="text-align: right; width:50%">
        <img
          width="200px"
          height="200px"
          class="col-6"
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
  props:["user"],
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.intro span{

}
</style>

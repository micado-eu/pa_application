<template>
<div>
   <div class="row " style="width:750px">
     <h3 style="margin-bottom:30px;padding-left:12px;width:70%">{{user.username}}</h3>
     <span style="text-align:right; width:30%;display: inline-block; vertical-align:middle">
     <q-btn style="width:120px; margin-top:55px; border-radius:2px" color="accent" rounded label="Add Plan" no-caps size="15px" :to="user.id + '/add'" />
     </span >
    <q-card class="my-card" style="width:750px; margin-left:10px" flat >
      <q-card-section horizontal>
        <q-card-section style="width:50%;padding-left:2px">
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

</style>

<template>
<div>
   <div class="row " style="width:750px">
     <h3 style="margin-bottom:30px;padding-left:12px;width:65%; font-size:25pt; font-weight:600">{{user.umUserName}}</h3>
     <span style="text-align:right; width:35%;display: inline-block; vertical-align:middle">
     <q-btn style="width:250px; margin-top:37px; margin-bottom:30px;margin-left:5px; border-radius:2px" unelevated color="accent" rounded :label="$t('button.add_plan')" no-caps size="15px" :to="user.id + '/add'" />
     </span >
    <q-card class="my-card" style="width:750px; margin-left:10px" flat >
      <q-card-section horizontal>
        <q-card-section style="width:100%;padding-left:2px">
         <div>
      <span style="text-align:left;font-size:20pt;">Username: </span><span style="font-size:20pt">{{user.umUserName}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20pt">Legal name: </span><span style="font-size:20pt">{{user.username}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20pt">Age: </span><span style="font-size:20pt">{{user.age}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20pt">Nationality: </span><span style="font-size:20pt">{{user.nationality}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20pt">Gender: </span><span style="font-size:20pt">{{user.gender}}</span>
  </div>
  <div>
      <span style="text-align:left;font-size:20pt">Status: </span><span style="font-size:20pt">{{user.user_type}}</span>
  </div>
        </q-card-section >
<div style="text-align: right; width:50%">
        <img
          width="250px"
          height="250px"
          class="col-6"
          src="~assets/UserProfile.png"
          style="border-radius:10px"
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

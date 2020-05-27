<template>
  <div>
    <router-link v-for="(d,i) in data" :key="i" :to="d.link">
      <h6>{{d.title}}</h6>
    </router-link>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "MigrationSituation",
  data: function() {
    return {
      data: [
        { title: "EU", link: "/situation/eu" },
        { title: "Country", link: "/situation/country" },
        { title: "City", link: "/situation/city" },
        { title: "edit", link: "/situation/editor" }
      ]
    };
  }
};
</script>
<style>
  
</style>

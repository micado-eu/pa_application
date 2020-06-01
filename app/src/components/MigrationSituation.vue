<template>
  <div>
    <div id="nav" class="bg-accent">
      <q-item
        clickable
        active
        active-class="nav-active"
        class="col"
        v-for="(d,i) in data"
        :key="i"
        :to="d.link"
      >
        <h6>{{d.title}}</h6>
      </q-item>
    </div>
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
<style scoped>
#nav {
  display: flex;
}
.col {
  flex: 1;
  justify-content: center;
  text-decoration: none;
}
.nav-active {
  background-color: white;
  color: black;
}
h6 {
  margin: 0;
}

</style>

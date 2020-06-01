<template>
  <div>
    <div id="nav">
      <router-link v-for="(d,i) in categories" :key="i" :to="'#'+d.category" class="col">
        <div class="anchor" @click="onClickNav(d.category)">
          <p>
            <q-icon :name="d.icon" />
          </p>
          <p>{{d.category}}</p>
        </div>
      </router-link>
    </div>
    <ChartGroup v-for="(c,i) in categories" :key="i" :category="c.category" />
  </div>
</template>

<script>
import ChartGroup from "./ChartGroup";

export default {
  name: "MigrationSituation",
  components: {
    ChartGroup
  },
  data: function() {
    return {
      graph_data: [],
      anchor: [
        { title: "incoming", link: "", icon: "directions_run" },
        { title: "accommodation", link: "", icon: "local_hotel" },
        { title: "integration", link: "", icon: "how_to_reg" },
        { title: "return", link: "", icon: "airplanemode_active" }
      ]
    };
  },
  computed: {
    city_graphs: function() {
      return JSON.parse(
        JSON.stringify(this.$store.state.statistics.city_graphs)
      );
    },
    categories: function() {
      return this.$store.state.statistics.categories;
    }
  },
  methods: {
    /**
     * jump to the corresponding chartGroup when clicked
     */
    onClickNav: function(category) {
      location.href = this.$route.path + "#" + category;
    }
  },
  mounted: function() {
    this.graph_data = [];
    for (let i = 0; i < this.city_graphs.length; i++) {
      const graphObj = { ...this.city_graphs[i] };
      graphObj.content.forEach(item => {
        item[graphObj.x] = new Date(item[graphObj.x][0]).getTime() / 1000;
        item[graphObj.y] = parseInt(item[graphObj.y][0]);
      });
      if (graphObj.xIsTime) {
        graphObj.content = graphObj.content.sort(
          (a, b) => b[graphObj.x] - a[graphObj.x]
        );
      }
      this.graph_data.push(graphObj);
    }
  }
};
</script>

<style scoped>
h6 {
  display: inline-block;
}
#nav {
  display: flex;
  position: sticky;
  top: 50px;
  background-color: rgba(255, 255, 255, 0.75);
}
.col {
  flex: 1;
  text-decoration: none;
  color:black;
  display: flex;
  justify-content: center;
}
.anchor {
  width: max-content;
  text-align: center;
  padding: 20px;
}
.anchor:hover {
  color: #ff7c44;
}
.row {
  width: 90%;
  margin: auto;
}
p {
  margin: 0;
}
.q-icon {
  font-size: 24px;
}
</style>

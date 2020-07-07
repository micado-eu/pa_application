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
    <ChartGroup v-for="(c,i) in categories" :key="board+'_'+i" :category="c.category" :board="board" />
  </div>
</template>

<script>
import ChartGroup from "./ChartGroup";

export default {
  name: "Board",
  components: {
    ChartGroup
  },
  computed: {
    categories: function() {
      return this.$store.state.statistics.categories.filter(
        c => c.board === this.board
      );
    },
    board: function() {
      return this.$route.params.board;
    }
  },
  methods: {
    /**
     * jump to the corresponding chartGroup when clicked
     */
    onClickNav: function(category) {
      location.href = this.$route.path + "#" + category;
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
  color: black;
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

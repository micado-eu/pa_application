<template>
  <div class="overview">
    <div class="row table-header tabletext">
      <div class="col-1 flex flex-center">
        {{ $t("input_labels.id") }}
      </div>
      <div class="col-3 flex flex-center">
        {{ $t("input_labels.name") }}
      </div>
      <div class="col-1 flex flex-center">
        {{ $t("input_labels.data_format") }}
      </div>
      <div class="col-2 flex flex-center">
        {{ $t("input_labels.board") }}
      </div>
      <div class="col-2 flex flex-center">
        {{ $t("input_labels.category") }}
      </div>
      <div class="col-1 flex flex-center">
        {{ $t("input_labels.chart_type") }}
      </div>
      <div class="col-1 flex flex-center">
        {{ $t("input_labels.delete") }}
      </div>
    </div>
    <q-list bordered separator class="separator">
      <q-item clickable v-ripple v-for="(chart, i) in charts" :key="i"  class = "row q-pa-none tabletext">
        <q-item-section class="col-1 flex flex-center">
          {{ chart.dbid }}
        </q-item-section>
        <q-item-section class="col-3 flex flex-center">
          {{ chart.title }}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          {{ chart.format }}
        </q-item-section>
        <q-item-section class="col-2 flex flex-center">
          {{ chart.board }}
        </q-item-section>
        <q-item-section class="col-2 flex flex-center">
          {{ chart.category }}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          {{ chart.type }}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          <q-icon
            name="img:statics/icons/Icon - Delete.svg"
            @click.stop="showDialog(chart)"
            size="md"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Ooops</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Delete function is currently deactivated :)
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="black"
            v-close-popup
            @click="deleteDialog = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="q-pt-md">
          {{ $t("input_labels.delete_confirm")}} {{ selectedChart.title }}? {{ $t("input_labels.delete_irreversible")}}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="black"
            v-close-popup
            @click="deleteChart(selectedChart)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import storeMappingMixin from "../../../mixin/storeMappingMixin";

export default {
  name: "MigrationMonitorManageList",
  mixins: [
    storeMappingMixin({
      actions: {
        dispatchDeleteChart: "statistics/deleteChart",
      },
    }),
  ],
  data() {
    return {
      deleteDialog: false,
      selectedChart: {},
    };
  },
  computed: {
  charts() {
      return this.$store.state.statistics.charts
    }
    // charts() {
    //   console.log(
    //     this.$store.state.statistics.charts.filter((c) => c.format != "API")
    //   );
    //   return this.$store.state.statistics.charts.filter(
    //     (c) => c.format != "API"
    //   );
    // },
  },
  methods: {
    deleteChart(chart) {
      this.dispatchDeleteChart(chart.dbid);
      this.deleteDialog = false;
    },
    showCategoryLabel(index) {
      return index;
    },
    showDialog(chart) {
      this.selectedChart = chart;
      this.deleteDialog = true;
    },
  },
};
</script>
<style scoped>
.table-header {
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.tabletext > .flex {
  text-align: center;
  overflow: hidden;
  margin: 0;
}

.overview {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.separator {
  border-top: var(--q-color-dark) solid 1pt;
}
</style>

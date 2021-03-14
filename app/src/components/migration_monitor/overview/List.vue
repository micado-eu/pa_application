<template>
  <div>
    <div class="row table-header">
      <div class="col-9 flex flex-left">
        {{ $t("input_labels.name") }}
      </div>
      <div class="col-1 flex flex-center">
        {{ $t("input_labels.board") }}
      </div>
      <div class="col-1 flex flex-center">
        {{ $t("input_labels.category") }}
      </div>
      <div class="col-1 flex flex-center">
        {{ $t("input_labels.delete") }}
      </div>
    </div>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="(chart, i) in charts" :key="i">
        <q-item-section class="col-9 flex flex-left div-3">
          {{ chart.title }}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          {{ chart.board }}
        </q-item-section>
        <q-item-section class="col-1 flex flex-center">
          {{ chart.category }}
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
    <q-dialog v-model="deleteDialog">
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
    </q-dialog>
    <!-- <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Are you sure?</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Do you want to delete chart {{ selectedChart.title }}? Please be
          reminded that this is process is irreversible.
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
    </q-dialog> -->
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
      console.log(
        this.$store.state.statistics.charts.filter((c) => c.format != "API")
      );
      return this.$store.state.statistics.charts.filter(
        (c) => c.format != "API"
      );
    },
  },
  methods: {
    deleteChart(chart) {
      this.dispatchDeleteChart(chart.id);
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
  padding-bottom: 30px;
  font-size: 18px;
}
</style>
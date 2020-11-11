<template>
  <div>
    <q-btn-toggle
      v-model="statsIndex"
      toggle-color="secondary"
      :options="[
        {label: $t('stats.today'), value: 'today'},
        {label: $t('stats.7days'), value: '7days'},
        {label: $t('stats.30days'), value: '30days'}
      ]"
    />

    <q-card class="stat-element" v-if="selectedStats">
      <q-card-section>
        <div>{{selectedStats.period}}</div>
      </q-card-section>

      <q-card-section class="row q-gutter-md">
        <StatElement
          :data="selectedStats.dashboard.total_sessions"
          :title="$t('stats.total_sessions')"
        />
        <StatElement
          :data="selectedStats.dashboard.total_users"
          :title="$t('stats.total_users')"
        />
        <StatElement
          :data="selectedStats.dashboard.new_users"
          :title="$t('stats.new_users')"
        />
        <StatElement
          :data="selectedStats.dashboard.total_time"
          :title="$t('stats.time_spent')"
        />
        <StatElement
          :data="selectedStats.dashboard.avg_time"
          :title="$t('stats.avg_time')"
        />
        <StatElement
          :data="selectedStats.dashboard.avg_requests"
          :title="$t('stats.avg_requests')"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import StatElement from '../components/StatElement'

export default {
  name: 'StatsBoard',
  props: ["stats"],

  components: {
    StatElement
  },
  data () {
    return {
      statsIndex: '7days' // The index to use in the stats, so we can switch between today,7days,30days.
    }
  },
  computed: {
    selectedStats () {
      return this.stats[this.statsIndex]
    }
  }
}
</script>

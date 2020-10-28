<template>
  <div>
    <q-card class="stat-element">
      <q-card-section>
        <div>{{stats['7days'].period}}</div>
      </q-card-section>
      <q-card-section class="row q-gutter-md">
        <StatElement
          :data="stats['7days'].dashboard.avg_requests"
          :title="$t('stats.avg_requests')"
        />
        <StatElement
          :data="stats['7days'].dashboard.avg_time"
          :title="$t('stats.avg_time')"
        />
        <StatElement
          :data="stats['7days'].dashboard.new_users"
          :title="$t('stats.new_users')"
        />
        <StatElement
          :data="stats['7days'].dashboard.total_users"
          :title="$t('stats.total_users')"
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
    return {}
  }
}
</script>

<template>
  <q-page padding>
    <StatsBoard :stats="allStats" />
  </q-page>
</template>

<script>
import countlyClient from 'api-countly-client'
import StatsBoard from '../components/StatsBoard'

export default {
  // name: 'PageName',
  components: {
    StatsBoard
  },
  data () {
    return {
      allStats: ''
    }
  },
  created () {
    countlyClient.getDashboard()
      .then((stats) => {
        console.log(stats)
        this.allStats = stats
      })
  }
}
</script>

<template>
  <div>
    <div class="row">
    <q-card-section class="col">
      <div class="title">{{$t("consent.title")}}</div>
    </q-card-section>
    <div class="q-pa-lg col" style="text-align:right">
    {{formattedConsentTimestamp}}
    </div>
    </div>
    <q-card-section>
      <q-list style="width:100%; margin:0 auto">
        <ConsentElement
          v-for="consent in receiptArray"
          :title="consent.piiCategoryDisplayName"
          :validation="consent.validity"
          :key="consent.piiCategoryId"
        />
      </q-list>
    </q-card-section>
  </div>

</template>

<script>
import ConsentElement from '../components/ConsentElement'

export default {
  name: 'ConsentPanel',
  props: ['receipt'],

  data () {
    return {}
  },
  components: {
    ConsentElement
  },
  computed: {
    receiptArray () {
      if (this.receipt == null) {
        return []
      }
      console.log('else')
      console.log(this.receipt)
      console.log(this.receipt.services[0].purposes[0].piiCategory)
      return this.receipt.services[0].purposes[0].piiCategory
    },
    formattedConsentTimestamp () {
      if (this.receipt == null) {
        return ''
      }
      return new Date(this.receipt.consentTimestamp).toUTCString()
    }
  }
}
</script>
<style scoped>
.title{
font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 30px;
line-height: 41px;
}
</style>

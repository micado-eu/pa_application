<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{$t("consent.title")}}</div>
    </q-card-section>
    {{formattedConsentTimestamp}}
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
  </q-card>

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

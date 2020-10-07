<template>
  <div>
    <q-toggle
      v-model="feature.enabled"
      :label="showFeaturesLabel()"
    />
  </div>
</template>

<script>
import editEntityMixin from '../../mixin/editEntityMixin'

export default {
  name: 'FeatureElement',
  props: ['feature'],
  mixins: [editEntityMixin],
  data () {
    return {}
  },
  methods: {
    showFeaturesLabel () {
      return this.feature.translations === undefined ? '' : this.feature.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].feature
    }
  }
}
</script>

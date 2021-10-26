<template>
  <div>
    <q-toggle
      v-model="feature.enabled"
      :label="showFeaturesLabel()"
      color="secondary"
      v-on:input="emitInput"
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
    },
    emitInput () {
      console.log('emitting input')
      this.$emit('input', this.feature)
    }
  }
}
</script>

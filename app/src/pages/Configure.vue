<template>
  <q-page class="flex flex-center">
    <q-option-group
      v-model="group"
      :options="options"
      color="yellow"
      type="toggle"
    />
    {{group}}
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      group: [ 'FEATURE1' ],
      options: [
        {
          label: 'Feature1',
          value: 'FEATURE1'
        },
        {
        label: 'Feature2',
        value: 'FEATURE2'
        },
        {
        label: 'Feature3',
        value: 'FEATURE3'
        }
      ]
    }
  }
}
</script>

<template>
  <div>{{title}} {{formattedValidation}}</div>
</template>

<script>
export default {
  name: 'ConsentElement',
  props: ['title', 'validation'],

  data () {
    return {}
  },
  computed: {
    formattedValidation () {
      if (this.validation === 'VALID_UNTIL:INDEFINITE') {
        console.log('transform the ugly string')
        return 'permanently approved'
      }
      console.log('todo better case management')
      return 'bho'
    }
  }
}
</script>

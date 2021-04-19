<template>
  <div class="row">
    <q-item
      class="col"
      clickable
      @click="editing"
    >
      {{this.theSurvey.title}}
    </q-item>
    <div class="col">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurveyElement',
  props: ["theSurvey"],
  data () {
    return {}
  },
  components: {

  },

  methods: {
    editing () {
      console.log(this.theSurvey.id)
      this.$emit('editSurvey', this.theSurvey.id)
    },
    remove_survey (event) {
      let target = event.currentTarget.id
      console.log(this.Path)
      this.$emit('remove', this.Path)

    }

  }
}
</script>
<style scoped>
.item {
  padding-top: 16px;
  padding-bottom: 0px;
  width: 100%;
}
.username {
  font-size: 20px;
  text-align: left;
  font-size: 18px;
  width: 100%;
  padding-bottom: 0px;
  padding-left: 0px;
}
.width {
  width: 100%;
}
.container {
  text-align: left;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
.span {
  padding-right: 5px;
}
.button-container {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  text-align: center;
}
.button {
  width: 70px;
  margin-bottom: 5px;
  border-radius: 2px;
}
.hr {
  margin: 0px;
}
</style>
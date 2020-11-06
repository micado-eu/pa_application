<template>
<div class="comments">
     <h5 class="header"> {{ $t('input_labels.comments') }} </h5>
      <div
      style="padding-top:10px"
      v-for="comment in selected_process_comments"
      :key="comment.id"
      >
      {{comment.translations.filter(filterTranslationModel(activeLanguage))[0].comment}}<br>
      - {{comment.tenant.name}}
      
      </div>
    </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'


export default {
  // name: 'ComponentName',
  props: ['selected_process_comments'],
  mixins:[editEntityMixin],
  
  data () {
    return {}
  },
  computed: {
    
  }
}
</script>
<style scoped>
.comments{
  margin-top:20px;
  padding-left:20px
}
.header{
  margin-top:10px;
  margin-bottom:10px;
}
</style>
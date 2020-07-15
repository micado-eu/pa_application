<template>
  <div class="row">
    <div class="col">
      {{doc_label}}
    </div>
    <div class="col">
      {{this.stepdoc.cost}}
    </div>
    <div>
      <q-btn
        class="q-px-md q-py-s"
        color="negative"
        style="font-size:13px;font-weight:600;width:70px;border-radius:2px"
        unelevated
        rounded
        @click="deleteDoc($event,stepdoc.idDocument)"
        label="Delete"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      t_docs: [],
    }
  },
  computed: {
    doc_label () {
      return this.docs_type.filter(dt => { return dt.value == this.stepdoc.idDocument })[0].label
    }
  },
  props: ["stepdoc", "docs_type"],

  created () {
    console.log(this.stepdoc)
  },
  methods: {
    deleteDoc (event, id) {
      console.log("the delete event")
      console.log(event)
      console.log(id)
      this.$emit('deleteDoc', id)
    }
  }
}
</script>

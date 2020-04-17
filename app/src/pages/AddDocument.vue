<template>
<div>
  <div class=" q-pa-lg" style=" border-width:3px; border-color:#0f3a5d; border-radius: 1.95rem;border-style: solid; margin-bottom: 1px">
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document type </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document type description </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document icon </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-file rounded standout outlined v-model="model">
          <template v-slot:append>
            <q-icon name="attachment" />
          </template>
        </q-file>
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document Issuer </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Validable </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-checkbox color="accent" v-model="checked" clickable @click="this.checked=!this.checked"/>
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Valididty duration </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-input rounded standout outlined v-model="text"  />
      </div>
    </div>
    <div class=" q-pa-xsm row" style="text-align:center">
      <div class=" q-pa-xsm col-4">
        <h5 style="text-align:left"> Document model </h5>
      </div>
      <div class="col-8" style="margin: auto;display: block;">
        <q-file rounded standout outlined v-model="model">
          <template v-slot:append>
            <q-icon name="attachment" />
          </template>
        </q-file>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="q-pa-md col-6" style="text-align:right">
    <q-btn color="red" label="Save" style="width:100px" to="/placeholder"/>
    </div>
    <div class=" q-pa-md col-6" style="text-align:left">
    <q-btn color="red" label="Back" style="width:100px" to="/document_type"/>
    </div>
    </div>
</div>
</template>

<script>


export default {
  name: 'PageIndex',
  components: {
    
  },

  data (){
    return {
      checked: true

    }
  }
 
}
</script>
<style scoped>

</style>

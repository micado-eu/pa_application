<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-close-container">
          <span class="modal-close" @click="$emit('close')">&times;</span>
        </div>
        <div class="modal-content">
          <p>
            <strong>{{$t('migration_monitor.chart_title')}}</strong>
            {{graphData.title}}
          </p>
          <p>
            <strong>{{$t('migration_monitor.chart_description')}}</strong>
            {{graphData.description}}
          </p>
          <p>
            <strong>{{$t('migration_monitor.chart_data_provider')}}</strong>
            {{graphData.provider}}
          </p>
          <p>
            <strong>{{$t('migration_monitor.updated_time')}}</strong>
            {{updateTransformed}}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: ["graphData"],
  computed: {
    updateTransformed: function(){
      if (this.graphData.updated){
            let updateTime = new Date(this.graphData.updated)
            if (updateTime instanceof Date && !isNaN(updateTime.valueOf())){
              console.warn(updateTime)
              let update_transformed = new Date(updateTime.getTime()-updateTime.getTimezoneOffset()*60000)
              return update_transformed.toISOString().split('T')[0]
            } else {
              return this.graphData.updated
            }
      } else {
        return "";
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 3000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-container {
  background-color: #fefefe;
  margin: 5% auto;
  /* 15% from the top and centered */
  padding: 20px;
  width: 80%;
  /* Could be more or less, depending on screen size */
  border-radius: 6px;
  font-size: 1.25rem;
}

.modal-close-container {
  display: flex;
  justify-content: flex-end;
}

.modal-close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  align-self: flex-end;
}

.modal-close:hover,
.modal-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

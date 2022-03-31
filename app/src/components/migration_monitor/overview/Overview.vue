<template>
  <div>
      <div
      class="banner row"
      >
        <div class="headeritem">
        <p class="title">
        {{$t("migration_monitor.manage_charts")}}
        </p>
        </div>
      <!-- <div class="settings row justify-between">
              </div> -->
              <!-- <q-space /> -->
        <div class="headeritem">
   
        <q-btn
          color="accent"
          no-caps
          size="md"
          :label="$t('button.add_new_chart')"
          to="/situation/editor"
        />     
        </div>

              <!-- <q-space /> -->

        <div class="headeritem">
        
        <q-btn
          :label="$t('button.go_back')"
          color="white"
          outline
          text-color="accent"
          size="md"
          to="/situation/main"
          :title="$t('button.return_main')"
        />
        </div>

        </div>
    <hr style="border: 1px solid #0F3A5D">
      <List style="padding-top: 2em"/>
    </div>
</template>

<script>
import List from "./List"

export default {
  name: "MigrationMonitorManage",
  components: {
    List
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.title {
  font-weight: bold;
  font-size: 30px;
  padding: 0;
}

.q-btn {
  text-transform: none;
  font-weight: bold;
}
.banner {
  font-style: normal;
  min-height: 72px;
  text-align: center;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 10px;
  font-weight: bold;
  font-size: 40px;
  line-height: 41px;
  color: var(--q-color-accent);
  background-image: url("/statics/BG Pattern.svg");
  align-items: center;
  align-content: center;
}

.headeritem {
  flex: 1;
  display: flex;
  justify-content: center;
}

.headeritem:first-child > span { 
  margin-right: auto; 
  }
.headeritem:first-child {
  justify-content: left;
}

.headeritem:last-child  > span { 
  justify-content: left;
  margin-left: auto;  
  }

.headeritem:last-child {
  justify-content: right;
}

.settings {
  align-items: center;
}

</style>
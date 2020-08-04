<template>
  <q-item style="padding-top:0px; padding-bottom:0px">
    <div>
      <div>
        <div class="q-pa-md col" style="width:750px; padding-bottom:0px; padding-left:0px">
          <div style="font-size:20px; text-align:left; font-size:18px">{{ this.name }}</div>
        </div>
      </div>
      <div class="row" style="width:750px">
        <div
          class="q-pa-md col"
          style="text-align:left; padding-top:0px;padding-bottom:0px;padding-left:0px"
        >
          <span style="padding-right:5px">{{this.type}}</span>
          <!-- <span style="padding-right:5px">|</span>
          <span style="padding-right:5px">{{this.Nationality}}</span>
          <span style="padding-right:5px">|</span>
          <span style="padding-right:5px">{{this.Gender}}</span> -->
        </div>
        <div
          class="q-pa-md q-gutter-sm col"
          style="padding-top:0px; padding-bottom:0px; text-align:right"
        >
          <q-btn
            size="11px"
            no-caps
            style="width:70px;margin-bottom:5px;border-radius:2px"
            unelevated
            rounded
            color="secondary"
            :label="$t('button.view')"
            :to="'#'"
          />
          <q-btn
            size="11px"
            no-caps
            style="width:70px;margin-bottom:5px;border-radius:2px"
            unelevated
            rounded
            color="negative"
            :label="$t('button.delete')"
            @click="remove_user($event)"
          />
        </div>
      </div>
      <hr style="margin:0px" />
    </div>
  </q-item>
</template>

<script>
export default {
  name: "Process",
  props: ["name", "type", "theUser"],
  data() {
    return {};
  },

  methods: {
    remove_user(event) {
      let target = event.currentTarget.id;
      console.log(this.Path);
      this.$emit("remove", this.Path);
    },
  
  }
};
</script>
<style scoped>
/*div >>> .q-item {
  border-radius: 2rem;

  &:hover {
    color: blue;
  }
}*/
</style>
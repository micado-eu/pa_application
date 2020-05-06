<template>
  <div class="q-pa-md">
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="a_topic in topic" :key="a_topic.id">
        <q-item-section>
          <q-img :src="a_topic.icon" spinner-color="white" style="height: 40px; max-width: 40px"/>
        </q-item-section>
        <q-item-section class="col-5 flex flex-left">{{a_topic.topic}}</q-item-section>
        <q-item-section class="col-5 flex flex-center">
          <q-btn color="negative" label="Delete" size="xs" @click="deleteTopic(a_topic.id)"/>
          <q-btn color="secondary" label="Edit" size="xs" @click="editTopic(a_topic)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card">
      <q-card-section>
        <q-btn color="secondary" label="Add" @click="newTopic()" :disable="hideAdd"/>
      </q-card-section>
      <q-card-section :hidden="hideForm">
        <q-input v-model="int_topic_shell.topic" label="Topic"/>
        <q-btn color="secondary" label="Save" @click="saveTopic()"/>
        <q-btn color="secondary" label="Cancel" @click="cancelTopic()"/>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      int_topic_shell: { id: -1, topic: "", icon: "" },
      hideForm: true,
      hideAdd: false,
      isNew: false
    };
  },
  computed: {
    topic() {
      return this.$store.state.topic.topic;
    }
  },
  methods: {
    deleteTopic(index) {
      console.log(index);
      this.$store.dispatch("topic/deleteTopic", index);
    },
    saveTopic() {
      if (this.isNew) {
        // we are adding a new instance
        this.$store
          .dispatch("topic/saveTopic", this.int_topic_shell)
          .then(int_cat => {
            console.log("saved");
          });
      } else {
        // we are updating the exsisting
        this.$store
          .dispatch("topic/editTopic", this.int_topic_shell)
          .then(int_cat => {
            console.log("updated");
          });
      }
      this.hideForm = true;
      this.int_topic_shell = { id: -1, title: "" };
    },
    newTopic() {
      this.isNew = true;
      this.hideForm = false;
      this.hideAdd = true;
    },
    cancelTopic() {
      this.isNew = false;
      this.hideForm = true;
      this.hideAdd = false;
    },
    editTopic(topic) {
      this.isNew = false;
      this.hideForm = false;
      this.int_topic_shell = JSON.parse(JSON.stringify(topic));
    }
  },
  //store.commit('increment', 10)
  created() {
    this.loading = true;
    console.log(this.$store);
    this.$store.dispatch("topic/fetchTopic").then(processes => {
      this.loading = false;
    });
  }
};
</script>
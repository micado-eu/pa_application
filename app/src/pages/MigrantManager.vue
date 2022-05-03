<template>
  <div class="">
    <div id="content">
      <div
        class=" q-pa-md image"
        style="text-align:center"
      >
        <div
          class=" top-div"
          style=""
        >
          {{ $t('input_labels.migrant_manager') }}
          <q-icon
            name="img:statics/MICADO APP - Graphics -migrant account management.svg"
            class="top-icon"
          />
        </div>
      </div>
      <hr style="border: 1px solid #0F3A5D">
      <div class="center">
        <div
          class=" q-pa-md col div-1"
          style="padding-top:30px"
        >
          <q-input
            class="input"
            dense
            items-center
            filled
            v-model="search"
            :label="$t('input_labels.search')"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon name="search" />
              </q-avatar>
            </template>
          </q-input>
        </div>
      </div>
      <div>
        <q-item class="row labels container-labels">
          <q-item-section class="col-8 flex flex-left">
          &nbsp;
          <!--{{$t('input_labels.name')}}-->
          </q-item-section>

          <q-item-section class="col-1 flex flex-center top">
            <p
              v-if="features.includes('FEAT_TASKS')"
              style="margin-bottom:0px"
            >
              {{ $t('button.integration') }}
            </p>
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            {{ $t('button.migrant_data') }}
          </q-item-section>
          <q-item-section class="col-1 flex flex-center top">
            {{ $t('input_labels.delete') }}
          </q-item-section>
        </q-item>
      </div>
      <hr id="hr">
    </div>
    <div class="center container">
      <q-list id="list">
        <User
          v-for="user in filteredUsers"
          :key="user.id"
          :username="user.username"
          :the-user="user"
          :path="user.id"
          @remove="deleteUser"
        />
      </q-list>
    </div>
  </div>
</template>


<script>
import User from 'components/migrant_manager/User'
import storeMappingMixin from '../mixin/storeMappingMixin'


export default {
  name: 'MigrantManager',
  components: {
    User
  },
  data () {
    return {
      search: ' '
    }
  },
  mixins: [
    storeMappingMixin({
      getters: {
        users: 'user/keycloakMigrantUser',
        features: "features/featureFlags"
      },
      actions: {
        fetchUser: 'user/fetchKeycloakMigrantUser'
      }
    })],
  computed: {
    filteredUsers () {
      //if none of the fields is filled in it will give the full list of processes
      if (this.search == "") {
        return this.users
      }
      else {
        return this.users.filter((filt) => {
          //Splits the search field and puts the words in an array
          var searchArray = this.search.split(" ")
          if (searchArray.every(string => filt.username.toLowerCase().includes(string))) {
            return true
          }
        })
      }
    }
    
  },
  methods: {
    deleteUser (value) {
      console.log("deleting")
      var deletedUser = this.users.filter((filt) => {
        console.log("in fil")
        console.log(filt)
        console.log(filt.id == value)
        return filt.id == value
      })
      this.$store.commit('user/deleteUser', deletedUser[0].id)
    }
  },



  created () {
    this.loading = true
    console.log(this.$store)
    this.fetchUser()
      .then(users => {
        console.log(users)
        this.loading = false
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-top: 00px;
  padding-right: 80px;
  padding-bottom: 00px;
  padding-left: 80px;
}
.center {
  text-align: center;
}
.div-1 {
  display: inline-block;
  padding-right: 20px;
  padding-left: 20px;
  width: 90%;
  padding-bottom: 40px;
}
.input {
  border-radius: 10px;

  font-size: 18px;
}
#list {
  padding-top: 0px;
  display: inline-block;
  width: 100%;
}
.labels {
  width: 100%;
  margin: 0 auto;
}
.button-container {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  text-align: right;
}
#content {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: white;       
  }
  
.top-div{
  font-style: normal;
  padding-top:15px;
  padding-left:30px;
  font-weight: bold;
  font-size: 40px;
  line-height: 54px;
  color:#0F3A5D; 
}
.container-labels {
  padding-top: 0px;
  padding-right: 96px;
  padding-bottom: 0px;
  padding-left: 96px;
}
#hr{
  margin-left:50px;
  margin-right:50px;
  border: 0.999px solid #424244;
}
.top-icon{
width:360px;
  height:100%
}
.image{
  background-image: url("../statics/BG Pattern.svg");
}
</style>

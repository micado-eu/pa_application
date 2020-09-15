  <template>
  <div class="container">

    <div class="center">
      <div
        id="div-1"
        class="col"
      >
        <q-input
          id="input"
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

    <div class="center" >
      <q-list id="list">
        <User
          v-for="user in filteredUsers"
          :key="user.id"
          :Username="user.umUserName"
          :theUser="user"
          :Path="user.id"
          @remove="deleteUser"
        >
        </User>
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
      users: 'user/users',
    }, actions: {
      fetchUser: 'user/fetchUser'
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
          if (searchArray.every(string => filt.umUserName.toLowerCase().includes(string))) {
            return true;
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
    console.log(this.$store);
    this.fetchUser(this.$migrant_tenant)
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
  padding-top: 50px;
  padding-right: 80px;
  padding-bottom: 50px;
  padding-left: 80px;
}
.center{
  text-align:center;
}
#div-1{
  display:inline-block;
  padding-right:20px;
  padding-left:20px
}
#input{
  border-radius:10px; 
  width:590px;
  font-size:18px
}
#list{
  display:inline-block;
  width:750px
}
</style>

  <template>
  <div class="container">
    <div class="center">
      <div
        class="col"
        id="div-1"
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

    <q-card :hidden="hideData">
      <div class="row">
        <div class="col">
          <q-input
            v-model="new_admin_name"
            :label="$t('ngo.adminName')"
          />
        </div>
        <div class="col">
          <q-input
            v-model="new_admin_name"
            :label="$t('ngo.adminSurname')"
          />
        </div>
        <div class="col">
          <q-input
            v-model="new_admin_surname"
            :label="$t('ngo.adminMail')"
          />
        </div>
        <div class="col">
          <q-input
            v-model="new_admin_pwd"
            :label="$t('ngo.adminPwd')"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-input
            v-model="new_ngo_address"
            :label="$t('ngo.address')"
          />
        </div>
        <div class="col">
          <q-input
            v-model="new_ngo_contact_mail"
            :label="$t('ngo.contactMail')"
          />
        </div>
        <div class="col">
          <q-input
            v-model="new_ngo_tenant"
            :label="$t('ngo.tenant')"
          />
        </div>
        <div class="col">
        </div>
      </div>
    </q-card>

    <div class="center">
      <q-list id="list">
        <User
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          :wso2User="getWso2Tenant(user.id)"
          @remove="deleteUser"
        ></User>
      </q-list>
    </div>
  </div>
</template>


<script>
import User from "components/ngo_manager/User"
import storeMappingMixin from '../mixin/storeMappingMixin'
import identityClient from 'api-identity-client'


export default {
  name: "NgoManager",
  mixins: [
    storeMappingMixin({
      getters: {
        tenants: 'tenant/tenants'
      }, actions: {
        fetchTenant: 'tenant/fetchTenants'
      }
    })
  ],
  components: {
    User
  },
  data () {
    return {
      search: " ",
      hideData: false,
      new_admin_email: "",
      new_admin_name: "",
      new_admin_surname: "",
      new_admin_pwd: "",
      new_ngo_address: "",
      new_ngo_contact_mail: "",
      new_ngo_tenant: "",
      wso2Tenants: [],
      wso2TenantsDetails: []
    }
  },
  computed: {
    filteredUsers () {
      //if none of the fields is filled in it will give the full list of processes
      if (this.search == "") {
        return this.tenants
      } else {
        return this.tenants.filter(filt => {
          //Splits the search field and puts the words in an array
          var searchArray = this.search.split(" ")
          if (
            searchArray.every(string =>
              filt.name.toLowerCase().includes(string)
            )
          ) {
            return true
          }
        })
      }
    },
    getWso2Tenant () {
      return (id) => {
        return this.wso2TenantsDetails.filter(aTenant => { return aTenant.tenantId == id })[0]
      }
    }
  },
  methods: {
    deleteUser (value) {
      var deletedUser = this.users.filter(filt => {
        return filt.id == value
      })
      this.$store.commit("ngo_user/deleteUser", deletedUser[0].id)
    }

  },

  //  async created () {

  // },
  created () {
    this.loading = true
    console.log(this.$store)

    this.fetchTenant()
      .then(users => {
        console.log("i got tenants from API")
        console.log(users)
        this.loading = false
        return identityClient.getTenant()
      })
      .then(wso2_tenants => {
        console.log("i got wso2_tenants from API")
        console.log(wso2_tenants)
        this.wso2Tenants = wso2_tenants.retrieveTenantsResponse.return
        this.wso2Tenants.forEach(element => {
          identityClient.getTenantDetail(element.tenantDomain)
            .then(res => {
              console.log(res)
              this.wso2TenantsDetails.push(res.getTenantResponse.return)
            })
        })
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
.center {
  text-align: center;
}
#div-1 {
  display: inline-block;
  padding-right: 20px;
  padding-left: 20px;
}
#input {
  border-radius: 10px;
  width: 590px;
  font-size: 18px;
}
#list {
  display: inline-block;
  width: 750px;
}
</style>

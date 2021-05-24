  <template>
  <div class="container">
    <div class="center">
      <div
        class="col-10"
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
      <div class="col-2" style="display:inline-block">
        <q-btn
        id="button"
          :label="$t('ngo.addNgo')"
          color="secondary"
          no-caps
          @click="hideData=false"
        />
      </div>
    </div>

    <q-card :hidden="hideData">
      <q-card-section>
        <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-gutter-md"
        >

          <div class="row">
            <div class=" input-field col-4">
              <q-input
                ref="new_ngo_name"
                :rules="[val => !!val || 'Field is required']"
                v-model="new_ngo_name"
                :label="$t('ngo.ngoName')"
              />
            </div>
            <div class="input-field col-4">
              <q-input
                ref="new_admin_name"
                :rules="[val => !!val || 'Field is required']"
                v-model="new_admin_name"
                :label="$t('ngo.adminName')"
              />
            </div>
            <div class="input-field col-4">
              <q-input
                ref="new_admin_surname"
                :rules="[val => !!val || '* Required']"
                v-model="new_admin_surname"
                :label="$t('ngo.adminSurname')"
              />
            </div>
            
          </div>
          <div class="row">
            <div class="input-field col-4">
              <q-input
                ref="new_admin_email"
                :rules="[val => !!val || '* Required']"
                v-model="new_admin_email"
                type="email"
                :label="$t('ngo.adminMail')"
              />
            </div>
            <div class="input-field col-4">
              <q-input
                ref="new_admin_pwd"
                :rules="[val => !!val || '* Required']"
                v-model="new_admin_pwd"
                :type="isPwd ? 'password' : 'text'"
                :label="$t('ngo.adminPwd')"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="input-field col-4">
              <q-input
                ref="new_ngo_address"
                :rules="[val => !!val || '* Required']"
                v-model="new_ngo_address"
                :label="$t('ngo.address')"
              />
          </div>
          <div class="row">
            
            </div>
            <div class="input-field col-4">
              <q-input
                ref="new_ngo_contact_mail"
                :rules="[val => !!val || '* Required']"
                v-model="new_ngo_contact_mail"
                type="email"
                :label="$t('ngo.contactMail')"
              />
            </div>
            <div class="input-field col-4">
              <q-input
                ref="new_ngo_tenant"
                :rules="[val => !!val || '* Required']"
                v-model="new_ngo_tenant"
                :label="$t('ngo.tenant')"
              />
            </div>
            <div class="input-field col-4">
              <q-input
                ref="new_ngo_link"
                :rules="[val => !!val || '* Required']"
                v-model="new_ngo_link"
                :label="$t('ngo.link')"
              />
            </div>
            <div class="col-4">
            </div>
          </div>
          <div class="q-pa-md q-gutter-md" style="text-align:center">
            <q-btn
              no-caps
              :label="$t('button.cancel')"
              class="delete-button"
              @click="onReset();hideData=true"
              flat
              
            />
            <q-btn
              no-caps
              :label="$t('button.reset')"
              type="reset"
              flat
              class="delete-button"

            />

            <q-btn
              no-caps
              class="save-button"
              :label="$t('button.save')"
              type="submit"
              color="accent"
            />
          </div>

        </form>
      </q-card-section>
    </q-card>

    <div>
      <q-list id="list">
    <q-item class="no-pad">
    <q-item-section class="col-9 flex flex-left" >
      &nbsp;
    </q-item-section>
    <q-item-section class="col-1 flex flex-center top">
    {{$t('button.view')}}
    </q-item-section> 
    <q-item-section class="col-1 flex flex-center top">
      {{$t('input_labels.delete')}}
    </q-item-section>
        </q-item>
        <hr style="border: 0.999px solid #424244;">
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
        fetchTenants: 'tenant/fetchTenants',
        saveTenants: 'tenant/saveTenants'
      }
    })
  ],
  components: {
    User
  },
  data () {
    return {
      search: " ",
      isPwd: true,
      hideData: true,
      new_admin_email: "",
      new_admin_name: "",
      new_admin_surname: "",
      new_admin_pwd: "",
      new_ngo_address: "",
      new_ngo_contact_mail: "",
      new_ngo_tenant: "",
      new_ngo_name: "",
      new_ngo_link: "",
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
    },
    onSubmit () {
      this.$refs.new_admin_name.validate()
      this.$refs.new_admin_surname.validate()
      this.$refs.new_admin_email.validate()
      this.$refs.new_admin_pwd.validate()
      this.$refs.new_ngo_address.validate()
      this.$refs.new_ngo_contact_mail.validate()
      this.$refs.new_ngo_tenant.validate()
      this.$refs.new_ngo_name.validate()
      this.$refs.new_ngo_link.validate()

      if (this.$refs.new_admin_name.hasError || this.$refs.new_admin_surname.hasError || this.$refs.new_admin_email.hasError || this.$refs.new_admin_pwd.hasError || this.$refs.new_ngo_address.hasError || this.$refs.new_ngo_contact_mail.hasError || this.$refs.new_ngo_tenant.hasError || this.$refs.new_ngo_name.hasError || this.$refs.new_ngo_link.hasError) {
        this.formHasError = true
        return false
      }
      // here we need to call the API for create the tenant
      identityClient.addTenant(this.new_ngo_tenant, this.new_admin_pwd, this.new_admin_email, this.new_admin_name, this.new_admin_surname, this.new_ngo_name, this.new_ngo_link, this.new_ngo_address, this.new_ngo_contact_mail)
        .then((newTenant) => {
          console.log(newTenant)
          //now we can add the data in the DB with the rest of information

          this.saveTenants(newTenant)
        })


    },

    onReset () {
      this.new_admin_name = null
      this.new_admin_surname = null
      this.new_admin_email = null
      this.new_admin_pwd = null
      this.new_ngo_address = null
      this.new_ngo_contact_mail = null
      this.new_ngo_tenant = null
      this.new_ngo_name = null
      this.new_ngo_link = null

      this.$refs.new_admin_name.resetValidation()
      this.$refs.new_admin_surname.resetValidation()
      this.$refs.new_admin_email.resetValidation()
      this.$refs.new_admin_pwd.resetValidation()
      this.$refs.new_ngo_address.resetValidation()
      this.$refs.new_ngo_contact_mail.resetValidation()
      this.$refs.new_ngo_tenant.resetValidation()
      this.$refs.new_ngo_name.resetValidation()
      this.$refs.new_ngo_link.resetValidation()
    }


  },

  //  async created () {

  // },
  created () {
    this.loading = true
    console.log(this.$store)

    this.fetchTenants()
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
#input {
  border-radius:10px;
  width:100%;
  font-size:18px
}
#list {
  margin:0 auto;
}
#button{
    width:150px; 
  margin-bottom:15px;
  border-radius:2px
}#div-1{
  display:inline-block;
  width:80%;
  padding-right:30px;
  padding-left:0px
}
.no-pad{
  padding-left:0px;
  padding-right: 0px;
}
.input-field{
  padding-left:50px;
  padding-right: 50px;
}
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width: 150px;
  border-radius: 2px;
}
.save-button{
    width: 150px;
  border-radius: 2px;
}
</style>

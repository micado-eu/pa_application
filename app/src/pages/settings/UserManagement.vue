<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-6">
        <h5>{{ $t("data_settings.usermgmt") }}</h5>
      </div>
      <div class="col-6 div-1">
        <q-btn
          color="info"
          no-caps
          :data-cy="'adduser'"
          :label="$t('button.add_user')"
          @click="newUser()"
          :disable="hideAdd"
          class="add-button"
        />
      </div>
    </div>
    <q-card
      class="q-pa-xl div-2"
      :hidden="hideForm"
    >
      <q-card-section>
        <!--<div class="text-h6">Migrant application configuration</div>-->
      </q-card-section>
      <q-card-section>
        <form
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class=""
        >
          <div
            class="q-pa-xsm"
            id="div-2"
          >
            <HelpLabel
              :field-label="$t('new_pa_user.username')"
              :help-label="$t('help.pa_username')"
              class="div-3"
            />
            <q-input
              :readonly="!is_new"
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="username"
              :hint="$t('input_labels.required')"
              outlined
              maxlength="50"
              counter
              :rules="[
                (val) => val.length <= 50 || 'Please use maximum 50 characters',
                (val) => !!val || 'Field is required',
              ]"
              v-model="new_user.username"
            />
          </div>
          <div
            class="q-pa-xsm"
            id="div-2"
            v-show="is_new"
          >
            <HelpLabel
              :field-label="$t('new_pa_user.password')"
              :help-label="$t('help.pa_password')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              :type="isPwd ? 'password' : 'text'"
              ref="password"
              :hint="$t('input_labels.required')"
              outlined
              maxlength="50"
              counter
              :rules="[
                (val) => val.length <= 50 || 'Please use maximum 50 characters',
                (val) => !!val || 'Field is required',
              ]"
              v-model="new_user.password"
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
          <div
            class="q-pa-xsm"
            id="div-2"
          >
            <HelpLabel
              :field-label="$t('new_pa_user.name')"
              :help-label="$t('help.pa_name')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="givenName"
              :hint="$t('input_labels.required')"
              outlined
              maxlength="50"
              counter
              :rules="[
                (val) => val.length <= 50 || 'Please use maximum 50 characters',
                (val) => !!val || 'Field is required',
              ]"
              v-model="new_user.givenName"
            />
          </div>
          <div
            class="q-pa-xsm"
            id="div-2"
          >
            <HelpLabel
              :field-label="$t('new_pa_user.surname')"
              :help-label="$t('help.pa_surname')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              outlined
              maxlength="50"
              counter
              :rules="[
                (val) => val.length <= 50 || 'Please use maximum 50 characters',
                (val) => !!val || 'Field is required',
              ]"
              v-model="new_user.familyName"
            />
          </div>
          <div
            class="q-pa-xsm"
            id="div-2"
          >
            <HelpLabel
              :field-label="$t('new_pa_user.email')"
              :help-label="$t('help.pa_email')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="familyName"
              :hint="$t('input_labels.required')"
              outlined
              maxlength="50"
              counter
              :rules="[
                (val) => val.length <= 50 || 'Please use maximum 50 characters',
                (val) => !!val || 'Field is required',
              ]"
              v-model="new_user.email"
            />
          </div>
          <div
            class="q-pa-xsm"
            id="div-2"
          >
            <HelpLabel
              :field-label="$t('new_pa_user.external_id')"
              :help-label="$t('help.pa_external_id')"
              class="div-3"
            />
            <q-input
              dense
              data-cy="title_input"
              bg-color="grey-3"
              standout
              ref="external_id"
              outlined
              counter
              v-model="new_user.external_id"
            />
          </div>
          <div class="row">
            <div class="col-3">
              <div class="q-gutter-sm row">
                <HelpLabel
                  :field-label="$t('new_pa_user.admin')"
                  :help-label="$t('help.pa_admin')"
                  class="col-1.5 field"
                  style="padding-top: 10px"
                />
                <q-checkbox
                  class="col-1 div-3"
                  color="accent"
                  style="padding-top: 10px"
                  v-model="new_user.admin"
                />
              </div>
            </div>
            <div class="q-gutter-sm row">
              <HelpLabel
                :field-label="$t('new_pa_user.mig_tenant')"
                :help-label="$t('help.pa_mig_tenant')"
                class="col-1.5 field"
                style="padding-top: 10px"
              />
              <q-checkbox
                class="col-1 div-3"
                color="accent"
                style="padding-top: 10px"
                v-model="new_user.migrant_tenant"
              />
            </div>
          </div>
          <hr id="hr">
          <q-btn
            no-caps
            class="delete-button"
            :data-cy="'canceldoc'"
            unelevated
            rounded
            :label="$t('button.cancel')"
            type="reset"
            @click="cancelUser()"
          />
          <q-btn
            no-caps
            :data-cy="'savedoc'"
            color="accent"
            unelevated
            rounded
            :label="$t('button.save')"
            class="button"
            type="submit"
          />
        </form>
      </q-card-section>
    </q-card>
    <q-list
      bordered
      separator
    >
      <PaUser
        v-for="user in completepausers"
        :key="user.id"
        :the-user="user"
        @edit="editPAUser"
      />
    </q-list>
  </div>
</template>

<script>
import storeMappingMixin from "../../mixin/storeMappingMixin"
import PaUser from "../../components/pa_user_management/PaUser"
import HelpLabel from "components/HelpLabel"

export default {
  name: "UserManagement",
  data() {
    return {
      group: ["FEAT_SERVICES"],
      hideAdd: false,
      isPwd: true,
      hideForm: true,
      new_user: {
        userid: null,
        username: "",
        password: "",
        givenName: "",
        familyName: "",
        email: "",
        external_id: "",
        admin: false,
        migrant_tenant: false,
        roles: []
      },
      is_new: true,
      workingFeatures: []
    }
  },
  mixins: [
    storeMappingMixin({
      getters: {
        pausers: "user/pausers",
        token: "auth/token"
      },
      actions: {
        fetchPAUser: "user/fetchPAUser",
        savePAUser: "user/savePAUser",
        fetchUserGroup: "user/fetchUserGroup",
        editUserDataWithRoles: "user/editUserDataWithRoles"
      }
    })
  ],
  components: {
    PaUser,
    HelpLabel
  },
  computed: {
    completepausers() {
      return this.pausers.filter((user)=>{
        return user.id != this.$store.state.auth.user.sub
      })
    }
  },
  methods: {
    findAttribute(user_mask, editing_user, umAttribute, userAttribute) {
      console.log(umAttribute)
      var arr = editing_user.attributes.filter((attr) => {
        return attr.umAttrName == String(umAttribute)
      })
      if (arr.length > 0) {
        console.log("inside if")
        user_mask[userAttribute] = arr[0].umAttrValue
        console.log(user_mask[userAttribute])
      }
    },
    editPAUser(value) {
      this.is_new = false
      var editing_user = this.pausers.filter((user) => {
        return user.id == value
      })[0]
      console.log(editing_user)
      this.new_user.username = editing_user.username
      this.new_user.userid = editing_user.id

      this.new_user.email = editing_user.email

      this.new_user.givenName = editing_user.firstName
      this.new_user.familyName = editing_user.lastName
      this.fetchUserGroup(value).then((roles) => {
        console.log(roles)
        
        if (roles.length > 0) {
          this.new_user.roles = roles

          this.new_user.roles.forEach((role) => {
            if (role.name == "Application/micado_admin") {
              this.new_user.admin = true
            }
            if (role.name == "Application/micado_migrant_manager") {
              this.new_user.migrant_tenant = true
            }
          })
        }
        this.new_user.roles = []
        this.hideAdd = true
        this.hideForm = false
      })
    },
    onSubmit() {
      if (this.is_new) {
        this.$refs.username.validate()
        this.$refs.password.validate()
        this.$refs.givenName.validate()
        this.$refs.familyName.validate()

        if (
          this.$refs.username.hasError ||
          this.$refs.password.hasError ||
          this.$refs.familyName.hasError ||
          this.$refs.givenName.hasError
        ) {
          this.formHasError = true
          this.$q.notify({
            color: "negative",
            message: "You need to fill in the required fields first"
          })
          return false
        } else {
          console.log("in else of submit")
          console.log(this.new_user)
          this.saveUser()
          this.onReset()
        }
      } else {
        this.$refs.username.validate()
        this.$refs.givenName.validate()
        this.$refs.familyName.validate()

        if (
          this.$refs.username.hasError ||
          this.$refs.familyName.hasError ||
          this.$refs.givenName.hasError
        ) {
          this.formHasError = true
          this.$q.notify({
            color: "negative",
            message: "You need to fill in the required fields first"
          })
          return false
        } else {
          console.log("in else of submit")
          console.log(this.new_user)
          this.saveUser()
          this.onReset()
        }
      }
    },
    onReset() {
      console.log(this.$refs)
      this.hideForm = true
      this.hideAdd = false
      this.$refs.username.resetValidation()
      this.$refs.password.resetValidation()
      this.$refs.givenName.resetValidation()
      this.$refs.familyName.resetValidation()
      this.new_user = {
        username: "",
        password: "",
        givenName: "",
        familyName: "",
        email: "",
        external_id: "",
        admin: false,
        migrant_tenant: false,
        roles: []
      }
    },
    newUser() {
      this.$refs.username.resetValidation()
      this.$refs.password.resetValidation()
      this.$refs.givenName.resetValidation()
      this.$refs.familyName.resetValidation()

      this.is_new = true
      this.hideAdd = true
      this.hideForm = false
    },
    saveUser() {
      console.log(this.new_user)
      
      if (this.new_user.admin == true) {
        this.new_user.roles.push("Application/micado_admin")
      }
      if (this.new_user.migrant_tenant == true) {
        this.new_user.roles.push("Application/micado_migrant_manager")
      }
      console.log(this.new_user)
      var roles_to_delete = JSON.stringify(["Application/micado_admin", "Application/micado_migrant_manager"])
      var working_roles = JSON.stringify(this.new_user.roles)

      if (this.is_new) {
        var working_user = JSON.parse(
          JSON.stringify(this.new_user, [
            "username",
            "password",
            "givenName",
            "familyName",
            "email"
          ])
        )
        this.savePAUser({
          user: working_user,
          roles: working_roles
        })
      } else {
        var working_user = JSON.parse(
          JSON.stringify(this.new_user, [
            "userid",
            "givenName",
            "familyName",
            "email"
          ])
        )
        console.log(working_user)
        this.editUserDataWithRoles({
          user:working_user,
          roles_to_add: working_roles, 
          roles_to_delete: roles_to_delete
        })
      }

      this.hideForm = true
      this.hideAdd = false
    },
    cancelUser() {
      //    this.isNew = false
      //   this.int_doc_shell.validators = []
      //    this.uploaded_images = []
      //     this.icon = null
      //     this.the_model = null
      //   this.order = 0
    },
    saveFeatures() {
      console.log(this.workingFeatures)
      this.updateAllFeatures(this.workingFeatures)
      console.log("posted")
      this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    }
  },
  async created() {
    console.log("created")
    await this.fetchPAUser()
    console.log(this.pausers)
    //    this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    /*
    this.fetchFeatures()
      .then(features => {
        //        this.loading = false
        console.log("got features")
        console.log(this.features)
      });
      */
  }
}
</script>
<style scoped>
h5 {
  font-weight: bold;
}
.add-button {
  width: 200px;
}
</style>
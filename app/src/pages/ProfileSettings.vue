<template>
  <q-page padding>
    <div v-if="this.loading">
      {{ $t('input_labels.loading') }}
    </div>
    <div v-else>
      <div
        class="q-pa-md header"
        style="padding-top:40px"
      >
        {{ $t('pa_profile.personal_profile') }}
      </div>

      <q-card class="q-pa-md">
        <div style="text-align:center">
          <img 
            v-if="this.the_user.picture == null"
            alt="User Profile"
            src="~assets/user-placeholder.png" 
            class="image"
          >
          <img
            v-else
            width="250px"
            height="250px"
            class="col-6 image"
            :src="this.the_user.picture"
          >
        </div>
        <div style="text-align:center; margin-bottom:20px; margin-top:20px">
          <q-btn
            class="button"
            unelevated
            color="info"
            no-caps
            rounded
            :label="$t('pa_profile.change_pic')"
            @click="picture_select = !picture_select; modifyPic()"
          />
        </div>
        <div
          v-if="picture_select"
          class=" q-px-lg center"
          style="padding-bottom:10px"
        >
          <div class="q-px-lg ">
            <q-file
              @input="getFilesPics($event)"
              bg-color="grey-3"
              dense
              :label="$t('input_labels.upload_doc_pics')"
              standout
              outlined
              accept=".jpg, image/*"
              @rejected="onRejected"
            />
          </div>
        </div>
        <div class=" row q-px-lg center">
          <div class="col q-px-lg  input-top">
            <q-input
              :readonly="!editing"
              label-color="black"
              dense
              :label="$t('pa_profile.username')"
              bg-color="grey-1"
              standout
              outlined
              v-model="the_user.username"
            />
          </div>
          <div class="col  q-px-lg input">
            <q-input
              dense
              :readonly="!editing"
              label-color="black"
              bg-color="grey-1"
              standout
              outlined
              :label="$t('pa_profile.phone_number')"
              v-model="the_user.phoneNumber"
            />
          </div>
        </div>
        <div class=" row q-px-lg ">
          <div class="col  q-px-lg input">
            <q-input
              dense
              :readonly="!editing"
              label-color="black"
              :label="$t('pa_profile.legal_name')"
              bg-color="grey-1"
              standout
              outlined
              v-model="the_user.legalname"
            />
          </div>

          <div class="col  q-px-lg input">
            <q-input
              dense
              :readonly="!editing"
              label-color="black"
              bg-color="grey-1"
              :label="$t('pa_profile.mail')"
              standout
              outlined
              v-model="the_user.email"
            />
          </div>
        </div>
        <div class=" q-pa-xsm ">
          <div
            v-if="!editing"
            class="col-8 input"
            style="text-align:center"
          >
            <q-btn
              class="button-edit"
              unelevated
              no-caps
              rounded
              text-color="black"
              :label="$t('button.edit')"
              @click="editing=true"
            />
          </div>
          <div
            v-else
            class="col-8 input"
            style="text-align:center"
          >
            <q-btn
              class="button-cancel"
              unelevated
              no-caps
              rounded
              text-color="black"
              :label="$t('button.cancel')"
              @click="cancelUser()"
            />
            <q-btn
              class="button"
              color="accent"
              unelevated
              no-caps
              rounded
              text-color="white"
              :label="$t('button.save')"
              @click="editUser()"
            />
          </div>
        </div>
      </q-card>
      <div
        class="q-pa-md header"
        style="padding-top:40px"
      >
        {{ $t('pa_profile.password') }}
      </div>
      <q-card>
        <div
          class="q-py-lg"
          style="text-align:center"
        >
          <q-btn
            class="button-edit"
            unelevated
            no-caps
            rounded
            text-color="black"
            :label="$t('button.change_pass')"
            @click="change_pass=true"
          />
        </div>
      </q-card>
      <q-dialog v-model="change_pass">
        <q-card
          class="q-pa-xl"
          style="width: 700px; max-width: 80vw;"
        >
          <div class=" q-pa-sm ">
            <q-input
              dense
              style=""
              outlined
              bg-color="grey-1"
              v-model="password.old_password"
              filled
              :type="isPwd0 ? 'password' : 'text'"
              :label="$t('pa_profile.old_pass')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd0? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd0 = !isPwd0"
                />
              </template>
            </q-input>
          </div>
    
          <div class="  q-pa-sm ">
            <q-input
              dense
              outlined
              bg-color="grey-1"
              v-model="password.new_password"
              filled
              :type="isPwd1 ? 'password' : 'text'"
              :label="$t('pa_profile.new_pass')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd1? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd1 = !isPwd1"
                />
              </template>
            </q-input>
          </div>
          <div class=" q-pa-sm ">
            <q-input
              dense
              outlined
              bg-color="grey-1"
              v-model="password.confirm_password"
              filled
              :type="isPwd2? 'password' : 'text'"
              :label="$t('pa_profile.confirm_pass')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>
          </div>
          <div style="text-align:center; padding-top:10px">
            <q-btn
              class="go_back"
              no-caps
              rounded
              text-color="black"
              :label="$t('button.cancel')"
              @click="cancelPass()"
            />
            <q-btn
              class="button"
              color="accent"
              unelevated
              no-caps
              rounded
              text-color="white"
              :label="$t('button.change_pass')"
              @click="editPass()"
            />
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import storeMappingMixin from '../mixin/storeMappingMixin'
export default {
  // name: 'PageName',
    mixins: [
    editEntityMixin,
    storeMappingMixin({
      getters: {
        user: 'user/paUserProfile',
        token: 'auth/token'
      }, actions: {
        fetchPAUseProfile: 'user/fetchPAUseProfile',
        saveUserPic:'user/saveUserPic',
        editUserPic:'user/editUserPic',
        editUserData:'user/editUserData',
        editUserPassword:'user/editUserPassword'
      }
    })

  ],
  data () {
    return {
      isPwd0:true,
      isPwd1:true,
      isPwd2:true,
      loading:true,
      editing:false,
      picture_select:false, 
      locale: this.$q.lang.isoName, 
      change_pass:false,
      password:{
        old_password:null,
        new_password:null,
        confirm_password:null
      },
      the_user:{
        userid:null,
        username:"",
        phoneNumber:"",
        legalname:'',
        firstName:"",
        lastName:"",
        date_of_birth:null,
        nationality:"",
        gender:"", 
        email:"",
        picture:null, 
        picture_id: null
      },
      the_user_orig:{
        userid:null,
        username:"",
        phoneNumber:"",
        legalname:"",
        firstName:"",
        lastName:"",
        date_of_birth:null,
        nationality:"",
        gender:"", 
        email:"",
        picture:null, 
        picture_id: null
      },
      user_picture:{
        id:-1,
        picture:null,
        tenantId:null,
        userId:null
      },
      user_pic_orig:null
    }
  },
  methods: {
    cancelPass(){
      this.change_pass = false
      this.password.old_password=null
      this.password.new_password=null
      this.password.confirm_password = null
    },
    editPass(){
      /*var user_admin = this.the_user.username + '@' + this.user.tenant.umDomainName
      console.log(user_admin)
      var user_pass = this.password.old_password
      console.log(user_pass)
      var pass_payload = JSON.stringify({password:this.password.new_password})
      console.log(pass_payload)
      var working_tenant= this.user.tenant.umDomainName
      console.log(working_tenant)*/
      if(this.password.new_password == this.password.confirm_password){
        console.log("saving new password")
        this.editUserPassword({userid:this.$store.state.auth.user.sub, password: this.password.new_password})
        this.cancelPass()
      }
      else{
        this.$q.notify({
        message: this.$t('warning.change_pass'),
        color: 'purple'
      })
      }
    },
    findAttribute(umAttribute,userAttribute){
      console.log(umAttribute)
      var arr = this.user.attributes.filter((attr)=>{
        return attr.umAttrName == String(umAttribute)
      })
      if(arr.length>0){
        console.log("inside if")
        this.the_user[userAttribute] = arr[0].umAttrValue 
        console.log(this.the_user[userAttribute])
      }
    },
    editUser(){
      var idx = this.the_user.legalname.trim().indexOf(" ")
      console.log(idx) 
      this.the_user.firstName = this.the_user.legalname.substr(0, idx)
      this.the_user.lastName = this.the_user.legalname.substr(idx +1)
      console.log(this.the_user)
      this.the_user_orig=JSON.parse(JSON.stringify( this.the_user ))
      var working_user = JSON.parse(JSON.stringify(this.the_user, [ 'userid', 'firstName', 'lastName', 'email', 'phoneNumber']))
      console.log(working_user)
      //var working_tenant= this.user.tenant.umDomainName
      //console.log( working_tenant)
      //var working_token = this.token.token.access_token
      //console.log(working_token)
      this.editUserData(working_user)
      .then(()=>{
        var userId = this.$store.state.auth.user.sub
        console.log(userId)
        this.fetchPAUseProfile(userId)
      })
      this.editing = false
    },
    cancelUser(){
      console.log("in cancel")
      console.log(this.the_user_orig)
      console.log(this.the_user)
      this.the_user=JSON.parse(JSON.stringify(this.the_user_orig))
      this.editing = false
    },
    modifyPic(){
      if(this.user_pic_orig != this.the_user.picture){
           this.$q.notify({
        type: 'warning',
        message: this.$t('warning.change_pic'),
        actions: [
          { label: 'Yes', color: 'red', handler: () => {
            if(this.user_pic_orig == null){
              //save the picture
              this.saveUserPic(this.user_picture)
              this.user_pic_orig = this.the_user.picture
              console.log(this.user_pic_orig == this.the_user.picture)
            }
            else{
              //edit the picture
              this.editUserPic({picture:this.user_picture.picture,id:this.the_user.picture_id })
              this.user_pic_orig = this.the_user.picture
              console.log(this.user_pic_orig == this.the_user.picture)
            }
            } },
          { label: 'No', color: 'accent', handler: () => { 
            this.the_user.picture = this.user_pic_orig
            } }
        ]
      })
      }
    },
   setLocale (locale) {   // set the Vue-i18n locale
     this.$i18n.locale = locale
     // load the Quasar language pack dynamically
     import(`quasar/lang/${locale}`).then(({ default: messages }) => {
       this.$q.lang.set(messages)
     })
   },
   onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
   },
       getFilesPics (files) {
      console.log(files)
      console.log(this)
      console.log(self)
      console.log(this.user)
      const reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(files)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: files.name,
          type: files.type,
          size: `${Math.round(files.size / 1000)} kB`,
          base64: reader.result,
          file: files
        }
       // this.uploaded_images.push(fileInfo.base64)
        //console.log(this.uploaded_images)
        this.user_picture = {
          id: -1,
          picture: fileInfo.base64,
          userId:this.user.id,
          tenantId:this.user.umTenantId
        }
        console.log(this.user_picture)
        this.the_user.picture = this.user_picture.picture
      }
    }
  },
  mounted () {
    this.$forceUpdate()
  },
  created () {
     
    var userId = this.$store.state.auth.user.sub
    console.log(userId)

   this.fetchPAUseProfile(userId).then((user)=>{
     console.log("user arrived")
     console.log(user)
          this.the_user.userid = this.$store.state.auth.user.sub
     this.the_user.username = this.$store.state.auth.user.preferred_username
     this.the_user.legalname = this.$store.state.auth.user.name
     this.the_user.email = this.$store.state.auth.user.email
     this.the_user.phoneNumber = this.$store.state.auth.user["phone number"]
      if(user.userPicture){
        this.the_user.picture= this.user.userPicture.picture
        this.the_user.picture_id= this.user.userPicture.id
        this.user_pic_orig =  this.user.userPicture.picture
      }
      else{
        this.the_user.picture= null
      }
      this.the_user_orig=JSON.parse(JSON.stringify( this.the_user ))
            this.loading=false
      console.log("after loading")
      console.log(this.the_user)
   })
   /* console.log(user1)
*/

  }
}
</script>
<style scoped>
.center{
  text-align:center
}
.input{
  margin: auto;
  display: block;
  margin-bottom:0px;
  padding-bottom:10px
}
.div-1{
  text-align:center; 
  padding-top:14px
}
.div-2{
display:inline-block;
margin-bottom: 1px; 
width:300px
}
.div-3{
  margin:0 auto
}
.image{
  width:150px; 
  height:150px
}
.button{
  width:150px;
  border-radius: 5px;
}
.button-edit{
  width:150px;
  border: 1px solid #FF7C44;
box-sizing: border-box;
border-radius: 5px;
}
.button-cancel{
  width:150px;
  border: 1px solid #C71F40;
box-sizing: border-box;
border-radius: 5px;
margin-right: 10px;
}
.go_back{
    width:150px;
margin-right: 10px;
  border: 1px solid #C71F40;
box-sizing: border-box;
border-radius: 5px;
}
.pad{
  margin-bottom:10px; 
  padding-top:10px
}
.uploader{
  max-width: 300px;
  display:inline-block
}
.header{
  padding-top: 0px;
  text-align:left; 
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 41px;
  color: #000000;
}
.input-top{
  margin: auto;
  display: block;
  margin-bottom:0px;
  margin-top:0px; 
  padding-bottom:10px
}
.icon{
  padding-top:5px; 
  padding-left:5px
}
.div-4{
  margin:0 auto;
  width:300px 
}
.my-card{
width:300px; 
display:inline-block
}
.pad-top{
  padding-top:10px
}
</style>
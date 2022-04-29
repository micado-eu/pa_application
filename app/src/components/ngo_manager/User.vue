<template>
  <div>
    <q-item class="item">
      <q-item-section class="col-9 flex flex-left ">
        {{ this.user.name }}
      </q-item-section>
        
      <q-item-section class="col-1 flex flex-center top">
        <q-icon
          
          name="img:statics/icons/Icon - open up.svg"
          size="md"
          @click="showData()"
        />
      </q-item-section>
      <q-item-section class="col-1 flex flex-center top">
        <q-icon
          
          name="img:statics/icons/Icon - Delete.svg"
          @click="remove_user($event)"
          size="md"
        />
      </q-item-section>

      <!-- <div>

      <div class="row width">
        <div class="col h6 right">{{ this.user.name }}</div>
        <div class="q-pa-md q-gutter-sm col button-container">
          <q-btn
            size="11px"
            no-caps
            class="button"
            unelevated
            rounded
            color="secondary"
            :label="showLabel"
            @click="showData()"
          />
          <q-btn
            size="11px"
            no-caps
            class="button"
            unelevated
            rounded
            color="negative"
            :label="$t('button.delete')"
            @click="remove_user($event)"
          />
        </div>
      </div>
      <q-card :hidden="hideData">
        <div class="row q-gutter-sm">
          <q-field
            :label="$t('ngo.fulluser')"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ wso2FullUser}}</div>
            </template>
          </q-field>
          <q-field
            :label="$t('ngo.adminMail')"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ wso2Email }}</div>
            </template>
          </q-field>
          <q-field
            :label="$t('ngo.contactMail')"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ user.email}}</div>
            </template>
          </q-field>
          <q-field
            :label="$t('ngo.address')"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ user.address}}</div>
            </template>
          </q-field>
        </div>
      </q-card>
      <hr class="hr" />
    </div>-->
    </q-item>
    <q-item
      v-if="!hideData"
      style="padding-left:0px"
    >
      <div class=" q-gutter-sm">
        <!--<div>
          <b>{{ $t('ngo.fulluser') }}:</b> {{ wso2FullUser }}
        </div>
        <div>
          <b>{{ $t('ngo.adminMail') }}:</b> {{ wso2Email }}
        </div>-->
        <div v-if="user.email!=null && user.email!=undefined">
          <b>{{ $t('ngo.contactMail') }}:</b> {{ user.email }}
        </div>
        <div v-if="user.address!=null && user.address!=undefined">
          <b>{{ $t('ngo.address') }}:</b> {{ user.address }}
        </div>
        <!--<q-field
            :label="$t('ngo.fulluser')"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ wso2FullUser}}</div>
            </template>
          </q-field>
          <q-field
            :label="$t('ngo.adminMail')"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ wso2Email }}</div>
            </template>
          </q-field>
          <q-field
            v-if="user.email!=null"
            :label="$t('ngo.contactMail')"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ user.email}}</div>
            </template>
          </q-field>
          <q-field
          v-if="user.address!=null"
            :label="$t('ngo.address')"
            stack-label
          >
            <template v-slot:control>
              <div
                
                class="self-center full-width no-outline"
                tabindex="0"
              >{{ user.address}}</div>
            </template>
          </q-field>-->
      </div>
    </q-item>
    <hr>
  </div>
</template>

<script>
export default {
  name: "User",
  props: ["user", "wso2User", "theUser"],
  data () {
    return {
      hideData: true,
      showLabel: this.$t('button.view')
    }
  },
  computed: {
    wso2Email () {
      return this.wso2User != undefined ? this.wso2User.email : ''
    },
    wso2FullUser () {
      return this.wso2User != undefined ? this.wso2User.firstname + ' ' + this.wso2User.lastname : ''
    }
  },
  methods: {
    remove_user (event) {
      let target = event.currentTarget.id
      console.log(this.Path)
      this.$emit("remove", this.Path)
    },
    showData () {
      console.log(this)
      if (this.hideData) {
        this.hideData = false
        this.showLabel = this.$t('button.hide')
      } else {
        this.hideData = true
        this.showLabel = this.$t('button.view')
      }
      //      this.hideData = false
      //      console.log(this.user)
      //      console.log(this.wso2User)
    }
  }
}
</script>
<style scoped>
.item {
  padding-top: 16px;
  padding-bottom: 0px;
  padding-left:0px; 
  padding-right:0px
}
.username {
  font-size: 20px;
  text-align: left;
  font-size: 18px;
  width: 750px;
  padding-bottom: 0px;
  padding-left: 0px;
}
.width {
  width: 750px;
}
.container {
  text-align: left;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
.span {
  padding-right: 5px;
}
.button-container {
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: right;
}
.button {
  width: 70px;
  margin-bottom: 5px;
  border-radius: 2px;
}
.hr {
  margin: 0px;
}
</style>
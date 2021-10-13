<template>
  <q-page v-if="!isLoggedIn" class="col center">
    <div class="col">
      <img
        alt="Micado logo"
        src="~assets/micado-logo.png"
      >
      <div>
        PA Application
      </div>
      <div class="h6">Build: {{buildDate}}</div>
    </div>

  </q-page>
  <q-page v-else>
    <div class="nav-container row" >
    <div
    v-for="nav in navs"
    :key="nav.label"
    class="navs"
    @click="selected_info = nav.label">
  <div style="text-align:center">
   <q-icon :name="nav.icon" class="top-icon"/>
   <p>{{$t(nav.label)}}</p>
  </div>
  <HelpDialog 
  :nav="nav"
  :selected_info="isOpen(nav.label)"
  @hiding="reset"/>
    </div>
    </div>
  </q-page>
</template>

<script>
import HelpDialog from 'components/HelpDialog'
export default {
  name: 'PageIndex',
  components:{
    HelpDialog
  },
  data () {
    return {
      buildDate: new Date(this.$envconfig.appBuildDate),
      navs: [
        {
          label: "menu.situation",
          icon: "img:statics/icons/Icon - Migration Situation Monitor.svg",
          description: "menu.situation_description"
        },
        {
          label: "menu.migrant",
          icon: "img:statics/icons/Icon - Migrant Management.svg",
          description: "menu.migrant_description"
        },
        {
          label: "menu.cso",
          icon: "img:statics/icons/Icon - CSO Admin Management.svg",
          description: "menu.cso_description"
        },
        {
          label: "menu.process",
          icon: "img:statics/icons/Icon - Integration step-bystep.svg",
          description: "menu.process_description"
        },
        {
          label: "menu.information_centre",
          icon: "img:statics/icons/Icon - Information Centre.svg",
          description: "menu.information_centre_description"
        },
        {
          label: "menu.events",
          icon: "img:statics/icons/Icon - Events (4th Iteration)_ (1).svg",
          description: "menu.events_description"
        }
        ,
        {
          label: "menu.usage",
          icon: "img:statics/icons/Icon - Micado Stats.svg",
          description: "menu.usage_description"
        }
        ,
        {
          label: "menu.glossary",
          icon: "img:statics/icons/Icon - Glossary.svg",
          description: "menu.glossary_description"
        }
        ,
        {
          label: "menu.setting",
          icon: "img:statics/icons/Icon - Settings.svg",
          description: "menu.setting_description"
        }

      ], selected_info:null
    }
  },
  computed:{
    isLoggedIn(){
      console.log(this.$auth.loggedIn())
      return this.$auth.loggedIn()
    }
  },
  methods: {
    toLogin () {
      this.$auth.login()
    },
    isOpen(value){
      return this.selected_info == value
    },
    reset(){
      this.selected_info = null
    }
  }
}
</script>
<style scoped>
.navs{
  width: 450px;
height: 250px;
margin-left: 30px;
margin-right:30px;
margin-bottom: 30px;
border: 1px solid #0F3A5D;
box-sizing: border-box;
border-radius: 10px;
}
.nav-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin-bottom: 25px;
  padding-top:70px;
}
.top-icon{
  width:54px;
  height:54px;
  margin-top:100px;
}

</style>
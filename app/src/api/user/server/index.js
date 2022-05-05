import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchUser (tenant) {
    console.log(tenant)
    return axiosInstance
      .get(`/users?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[include][2][relation]=tenant&filter[where][and][0][umUserName][neq]=admin&filter[where][and][1][umTenantId]=${tenant}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchKeycloakMigrantUser(){
      return axiosInstance
        .get(`/getMigrantUserList`)
        .then((response) => response.data)
        .catch(error_handler)
  },
  fetchPAUser () {
    return axiosInstance
      .get(`/getPaUserList`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchSpecificUser (tenant, id) {
    console.log(tenant)
    return axiosInstance
      .get(`/users/${id}?filter[include][0][relation]=interventionPlans&filter[include][1][relation]=tenant&filter[include][2][relation]=userPicture&filter[include][3][relation]=userConsent`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchSpecificUserMigrant (id) {
    return axiosInstance
      .get(`/users/${id}?filter[include][0][relation]=interventionPlans&filter[include][1][relation]=userPicture&filter[include][2][relation]=userConsent`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchSpecificKeycloakUserMigrant (id) {
    return axiosInstance
      .get('/getUser?id=' + id + '&realm=migrant')
      .then((response) => response.data)
      .catch(error_handler)
  },

  fetchUserLogin (username, tenant) {
    console.log(username, tenant)
    return axiosInstance
      .get('/users?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[where][and][0][umUserName][eq]=' + username + '&filter[where][and][1][umTenantId]=' + tenant )
      .then(response => { return response.data })
      .catch(error_handler)
  },
   saveUserPicture(picture){
    const workingPic= JSON.parse(JSON.stringify(picture, ['picture', 'userId', 'tenantId']))
    return axiosInstance
      .post('/user-pictures', workingPic)
      .then(response => { return response.data })
      .catch(error_handler)
  },
  editUserPicture(pic, id){
    return axiosInstance
      .patch('/user-pictures/' + id, {picture:pic})
      .then(response => { return response.data })
      .catch(error_handler)
  },
  editUserData(userid, firstName, lastName, email, phoneNumber){
    return axiosInstance
      .put('/updateUser?userid='+ userid + '&firstName=' + firstName + '&lastName=' + lastName + '&email=' + email +'&phone_number=' + phoneNumber +'&realm=pa')
      .then(response => { return response.data })
      .catch(error_handler)
  },
  editUserDataByAdmin(user, tenant, token){
    return axiosInstance
      .patch('/updateUser?payload=' +user + '&tenant=' + tenant +'&authType=Bearer&authToken=' + token + '&isAdmin=1')
      .then(response => { return response.data })
      .catch(error_handler)
  },
  editUserPassword(userid, password){
    return axiosInstance
      .put('/updateUserPassword?userid=' +userid + '&realm=pa&password=' + password)
      .then(response => { return response.data })
      .catch(error_handler)
  },
  fetchKeycloakPaUser(){
    return axiosInstance
      .get(`/getPaUserList`)
      .then((response) => response.data)
      .catch(error_handler)
},
  fetchPAUserProfile(id){
    return axiosInstance
    .get(`/users/${id}?filter[include][0][relation]=userPicture`)
    .then((response) => response.data)
    .catch(error_handler)
  },
  savePAUser(user, roles){
    return axiosInstance
      .post('createKeycloakUserWithRole?username=' + user.username + '&firstName=' + user.givenName + '&lastName=' + user.familyName + '&email=' + user.email + '&password=' + user.password + '&role=' + roles + '&realm=pa')
      .then(response => { return response.data })
      .catch(error_handler)
  },
  fetchUserGroup(user, token, tenant){
    return axiosInstance
    .get('/wso2UserRoles?user=' +user + '&tenant=' + tenant +'&authType=Bearer&authToken=' + token)
    .then((response) => response.data)
    .catch(error_handler)
  },
  fetchUserPic(id){
    return axiosInstance
    .get('/user-pictures?filter[where][and][0][userId]=' + id)
    .then((response) => response.data)
    .catch(error_handler)
  }
}

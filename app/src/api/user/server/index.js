import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchUser (tenant) {
    console.log(tenant)
    return axiosInstance
      .get(`/backend/1.0.0/users?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[include][2][relation]=tenant&filter[where][and][0][umUserName][neq]=admin&filter[where][and][1][umTenantId]=${tenant}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchPAUser (tenant) {
    console.log(tenant)
    return axiosInstance
      .get(`/backend/1.0.0/users?filter[include][0][relation]=attributes&filter[where][and][0][umUserName][neq]=admin&filter[where][and][1][umTenantId]=${tenant}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchSpecificUser (tenant, id) {
    console.log(tenant)
    return axiosInstance
      .get(`/backend/1.0.0/users/${id}?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[include][2][relation]=tenant&filter[include][3][relation]=userPicture`)
      .then((response) => response.data)
      .catch(error_handler)
  },

  fetchUserLogin (username, tenant) {
    console.log(username, tenant)
    return axiosInstance
      .get('/backend/1.0.0/users?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[where][and][0][umUserName][eq]=' + username + '&filter[where][and][1][umTenantId]=' + tenant + '&filter[fields]=umId')
      .then(response => { return response.data })
      .catch(error_handler)
  },
   saveUserPicture(picture){
    const workingPic= JSON.parse(JSON.stringify(picture, ['picture', 'userId', 'tenantId']))
    return axiosInstance
      .post('/backend/1.0.0/user-pictures', workingPic)
      .then(response => { return response.data })
      .catch(error_handler);
  },
  editUserPicture(pic, id){
    return axiosInstance
      .patch('/backend/1.0.0/user-pictures/' + id, {picture:pic})
      .then(response => { return response.data })
      .catch(error_handler);
  },
  editUserData(user, tenant, token){
    return axiosInstance
      .patch('/backend/1.0.0/updateUser?payload=' +user + '&tenant=' + tenant +'&authType=Bearer&authToken=' + token)
      .then(response => { return response.data })
      .catch(error_handler);
  },
  editUserPassword(admin, adminpwd, payload, tenant){
    return axiosInstance
      .patch('/backend/1.0.0/updateUser?payload=' +payload + '&tenant=' + tenant +'&admin=' + admin + '&adminpwd=' + adminpwd + '&isPswd=1')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  fetchPAUserProfile(id){
    return axiosInstance
    .get(`/backend/1.0.0/users/${id}?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans&filter[include][2][relation]=tenant&filter[include][3][relation]=userPicture`)
    .then((response) => response.data)
    .catch(error_handler)
  }
}

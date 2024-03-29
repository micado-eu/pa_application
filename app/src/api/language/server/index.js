import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchLanguages() {
    console.log("sono il client di languages")
    return axiosInstance
      .get('/languages', {
      })
      .then(
        response => response.data
      ).catch(function (error) {
        console.log("ERROR IN CALLING API MANAGER")
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },
  setLanguage(language) {
    console.log("test")
    let whereClause = {
      lang: language.lang
    }
    return axiosInstance
      .patch('/languages?where=' + JSON.stringify(whereClause), language)
      .then(response => {
        console.log(response)
        return response.data
      }).catch(function (error) {
        console.log("ERROR IN CALLING API MANAGER")
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },
  setLanguageDefault(language) {
    console.log("test")
    let whereClause = {
      lang: language.lang
    }
    return axiosInstance
      .patch('/languages?where=' + JSON.stringify(whereClause), language)
      .then(response => {
        console.log(response)
        return response.data
      }).catch(function (error) {
        console.log("ERROR IN CALLING API MANAGER")
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },
  saveLanguage(language){
    return axiosInstance
    .post('/languages', language)
    .then(response => { return response.data })
      .catch(error_handler)
  },
  updateLanguage(language){
    let whereClause = {
      lang: language.lang
    }
    console.log(language)
    return axiosInstance
      .patch('/languages?where=' + JSON.stringify(whereClause), language)
      .then(response => { return response.data })
      .catch(error_handler)
  }
}

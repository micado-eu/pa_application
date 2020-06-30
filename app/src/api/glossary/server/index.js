import { axiosInstance } from 'boot/axios'

export default {
  fetchGlossary() {
    return axiosInstance
      .get('/backend/1.0.0/glossaries', {
      })
      .then(
        response => response.data
      ).catch(function (error) {
        console.log("ERROR IN CALLING API MANAGER")
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
  saveNewGlossaryItem(glossaryItem) {
    let newGlossaryItem = Object.assign(glossaryItem, this.$q.lang.getLocale())
    return axiosInstance
      .post('/backend/1.0.0/glossaries', newGlossaryItem)
      .then(
        response => response.data
      ).catch(function (error) {
        console.log("ERROR IN CALLING API MANAGER")
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
  editGlossaryItem(newItem) {
    let newGlossaryItem = Object.assign(newItem, this.$q.lang.getLocale())
    return axiosInstance
      .patch('/backend/1.0.0/glossaries/' + newGlossaryItem.id, newGlossaryItem)
      .then(
        response => response.data
      ).catch(function (error) {
        console.log("ERROR IN CALLING API MANAGER")
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
  deleteGlossaryItem(item) {
    return axiosInstance
      .delete('/backend/1.0.0/glossaries/' + item.id)
      .then(
        response => response.data
      ).catch(function (error) {
        console.log("ERROR IN CALLING API MANAGER")
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
}

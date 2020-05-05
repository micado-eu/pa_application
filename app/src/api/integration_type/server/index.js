import axios from 'axios'

export default {
  fetchIntegrationType () {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.data)
  },
  updateIntegrationType(integration_category){

  }
}

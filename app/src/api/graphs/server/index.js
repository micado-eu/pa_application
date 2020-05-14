import axios from 'axios'

export default {
  fetchSteps () {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.data)
  }
}
 
import axios from 'axios'

export default {
    fetchLanguages() {
        return axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.data)
    },
    setLanguageActive(language, active) {
        return axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.data)
    }
}

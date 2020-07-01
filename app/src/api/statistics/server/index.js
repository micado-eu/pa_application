import timeseries from '../mock/data/timeseries'
import origin from '../mock/data/origin'
import migrants from '../mock/data/migrants'
import categories from '../mock/data/city/categories.json'

const myRequest = new Request('http://localhost:8082/todos', {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default',
});

const fetchLocal = (mockData, time = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData)
        }, time)
    })
}

export default {
    fetchStatistics() {
        return Promise.all([
            fetchLocal(timeseries, 1000),
            fetchLocal(origin, 1000),
            fetchLocal(migrants, 1000),
            fetch(myRequest),
            fetchLocal(categories, 1000)])

            .then(async (res) => {
                return {
                    timeseries: res[0],
                    origin: res[1],
                    migrants: res[2],
                    city_graphs: await res[3].json(),
                    categories: res[4],
                };
            })
            .catch(function (error) {
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
            });;
    }
}
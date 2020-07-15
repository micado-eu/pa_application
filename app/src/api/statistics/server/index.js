import timeseries from '../mock/data/timeseries'
import origin from '../mock/data/origin'
import migrants from '../mock/data/migrants'
import categories from '../mock/data/city/categories.json'
import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

// const charts_request = new Request('http://localhost:3000/charts', {
//     method: 'GET',
//     headers: new Headers(),
//     mode: 'cors',
//     cache: 'default',
// });

function fetchCharts() {
    return axiosInstance
        .get('/backend/1.0.0/charts')
        .then(response => response.data)
        .catch(error_handler);
}

const fetchLocal = (mockData, time = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData)
        }, time)
    })
}

function csvToJSON(csv) {
    const lines = csv.split("\n").filter(line => line),
        result = [],
        headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        let obj = {},
            currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result); //JSON
}

export default {
    fetchStatistics() {
        return Promise.all([
            fetchLocal(timeseries, 1000),
            fetchLocal(origin, 1000),
            fetchLocal(migrants, 1000),
            // fetch(charts_request),
            fetchCharts(),
            fetchLocal(categories, 1000)])
            .then(async (res) => {
                return {
                    timeseries: res[0],
                    origin: res[1],
                    migrants: res[2],
                    charts: res[3],
                    // charts: await res[3].json().then(data=>data),
                    categories: res[4],
                };
            })
            .catch(error_handler);
    },
    addChart(chart) {
        if (chart.content) {
            switch (chart.format) {
                case 'csv':
                    chart.content = csvToJSON(chart.content)
                    break
                case 'JSON':
                    chart.content = chart.content.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, '')
                    break
                case 'API':
                    break
            }
        }
        console.log('server chart: ', chart)
        return axiosInstance
            .post('/backend/1.0.0/charts', chart)
            .then(response => response.data)
            .catch(error_handler);
    },
}


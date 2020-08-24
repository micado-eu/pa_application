import axios from 'axios'
import { error_handler, isJSON } from '../../../helper/utility'

const charts_request = new Request('http://localhost:3000/charts', {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default',
});

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
        return fetch(charts_request)
            .then(async (res) => {
                return {
                    charts: await res.json(),
                };
            })
            .catch(error_handler);
    },
    addChart(chart) {

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
        if (isJSON(chart.content)) {
            return axios
                .post('http://localhost:3000/charts', chart, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.data)
                .catch(error_handler);
        } else {
            return Promise.reject('Error: your format is wrong')
        }
    }
}


import { axiosInstance } from 'boot/axios'
import { error_handler, isJSON } from '../../../helper/utility'

function fetchCharts() {
    return axiosInstance
        .get('/backend/1.0.0/charts')
        .then(response => response.data)
        .catch(error_handler);
}

function csvToJSON(csv) {
    const lines = csv.replace(/\r/g, "").split("\n").filter(line => line),
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
        return fetchCharts()
            .then((res) => {
                return {
                    charts: res
                };
            })
            .catch(error_handler);
    },
    addChart(chart) {
        switch (chart.format) {
            case 'csv':
                chart.content = csvToJSON(chart.content)
                // chart.content = csvToJSON(chart.content).replace(/\n|\r/g, "")
                break
            case 'JSON':
                chart.content = chart.content.replace(/(\r\n|\n|\r)/gm, "").replace(/\s/g, '')
                break
            case 'API':
                break
        }
        if (isJSON(chart.content)) {
            return axiosInstance
                .post('/backend/1.0.0/charts', chart)
                .then(response => response.data)
                .catch(error_handler);
        } else {
            return Promise.reject("Error: the file format/data formats is wrong")
        }
    }
}


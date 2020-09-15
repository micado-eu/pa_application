import { axiosInstance } from 'boot/axios'
import { error_handler, isJSON } from '../../../helper/utility'

const UNHCR_API = {
  Spain: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=190477&geo_id=729&sv_id=11&population_group=4797&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by sea'
    },
    land: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=190478&geo_id=729&sv_id=11&population_group=4798&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by land'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=190463&geo_id=729&sv_id=11&population_collection=28&limit=10&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  },
  Greece: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197455&geo_id=640&sv_id=11&population_group=4797&frequency=month&fromDate=1900-01-01',
      name: 'Arrival by sea'
    },
    land: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197456&geo_id=640&sv_id=11&population_group=4798&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by land'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=197446&geo_id=640&sv_id=11&population_group=4996&population_collection=28&limit=20&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  },
  Italy: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197479&geo_id=656&sv_id=11&population_group=4797&frequency=month&fromDate=1900-01-01',
      name: 'Arrival by sea'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=197472&geo_id=656&sv_id=11&population_collection=28&limit=200&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  }
}

function fetchLocalCharts() {
  return axiosInstance
    .get('/backend/1.0.0/charts')
    .then((response) => response.data)
    .catch(error_handler)
}

function parse_UNHCR_bar(data) {
  // add date
  for (let i = 0; i < data.data.timeseries.length; i++) {
    const d = data.data.timeseries[i]
    d.date = `${d.year}.${d.month}`
  }
  return {
    board: 'UNHCR',
    category: data.data.geoMasterId.name,
    content: JSON.stringify(data.data.timeseries),
    description: data.situation_view_description,
    format: null,
    title: data.title_language_en,
    type: 'BAR',
    x: 'date',
    y: 'individuals',
    xistime: false
  }
}

function parse_UNHCR_pie(data) {
  return {
    board: 'UNHCR',
    category: data.data[0].geomaster_name,
    content: JSON.stringify(data.data),
    description: data.situation_view_description,
    format: null,
    title: data.title_language_en,
    type: 'PIE',
    x: 'pop_origin_name',
    y: 'individuals',
    xistime: false
  }
}

function fetch_UNHCR(url) {
  return fetch(url)
    .then((response) => response.json())
}

function csvToJSON(csv) {
  const lines = csv.replace(/\r/g, '').split('\n').filter((line) => line)
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentline = lines[i].split(',')
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return JSON.stringify(result) // JSON
}

export default {
  fetchStatistics() {
    return Promise.all([
      fetchLocalCharts(),
      fetch_UNHCR(UNHCR_API.Spain.sea.link),
      fetch_UNHCR(UNHCR_API.Spain.land.link),
      fetch_UNHCR(UNHCR_API.Greece.sea.link),
      fetch_UNHCR(UNHCR_API.Greece.land.link),
      fetch_UNHCR(UNHCR_API.Italy.sea.link),
      fetch_UNHCR(UNHCR_API.Spain.nationalities.link),
      fetch_UNHCR(UNHCR_API.Greece.nationalities.link),
      fetch_UNHCR(UNHCR_API.Italy.nationalities.link)
    ]).then(([localCharts, Spain_sea, Spain_land, Greece_sea, Greece_land, Italy_sea, Spain_nat, Greece_nat, Italy_nat]) => {
      localCharts.push(parse_UNHCR_bar(Spain_sea))
      localCharts.push(parse_UNHCR_bar(Spain_land))
      localCharts.push(parse_UNHCR_bar(Greece_sea))
      localCharts.push(parse_UNHCR_bar(Greece_land))
      localCharts.push(parse_UNHCR_bar(Italy_sea))
      localCharts.push(parse_UNHCR_pie(Spain_nat))
      localCharts.push(parse_UNHCR_pie(Greece_nat))
      localCharts.push(parse_UNHCR_pie(Italy_nat))
      return {
        charts: localCharts
      }
    })
      .catch(error_handler)
  },
  addChart(chart) {
    switch (chart.format) {
      default:
        break
      case 'csv':
        chart.content = csvToJSON(chart.content)
        // chart.content = csvToJSON(chart.content).replace(/\n|\r/g, "")
        break
      case 'JSON':
        chart.content = chart.content.replace(/(\r\n|\n|\r)/gm, '').replace(/\s/g, '')
        break
      case 'API':
        break
    }
    if (isJSON(chart.content)) {
      return axiosInstance
        .post('/backend/1.0.0/charts', chart)
        .then((response) => response.data)
        .catch(error_handler)
    }
    return Promise.reject('Error: the file format/data formats is wrong')
  }
}

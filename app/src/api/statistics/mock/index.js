import timeseries from './data/timeseries'
import origin from './data/origin'
import migrants from './data/migrants'
import mapping from './data/mapping'
import influx_for_family_reunion from './data/city/influx_for_family_reunion'
import influx_hamburg from './data/city/influx_hamburg'




const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchStatistics() {
    return Promise.all([
      fetch(timeseries, 1000),
      fetch(origin, 1000),
      fetch(migrants, 1000),
      fetch(mapping, 1000),
      fetch(influx_hamburg, 1000),
      fetch(influx_for_family_reunion, 1000)])
      .then((res) => {
        return {
          timeseries: res[0],
          origin: res[1],
          migrants: res[2],
          mapping: res[3],
          influx_hamburg: res[4],

          influx_for_family_reunion: res[5]
        };
      });
  }
}
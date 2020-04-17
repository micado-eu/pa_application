import timeseries from './data/timeseries'
import origin from './data/origin'


const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchStatistics() {
    return Promise.all([fetch(timeseries, 1000), fetch(origin, 1000)])
      .then((res) => {
        return { timeseries: res[0], origin: res[1] };
      });
  }
}
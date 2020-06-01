import timeseries from './data/timeseries'
import origin from './data/origin'
import migrants from './data/migrants'
import city_graphs from './data/city/graphs.json'
import categories from './data/city/categories.json'




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
      fetch(city_graphs, 1000),
      fetch(categories, 1000)])

      .then((res) => {
        return {
          timeseries: res[0],
          origin: res[1],
          migrants: res[2],
          city_graphs: res[3],
          categories: res[4],
        };
      });
  }
}
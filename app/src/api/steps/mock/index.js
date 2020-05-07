import steps from './data/steps'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchSteps() {
    return fetch(steps, 0) // wait 1s before returning posts
  },
  updateSteps(steps) {
    console.log("fake call to update DB")
    console.log(steps)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(steps)
      }, 0)
    })
  },
  saveSteps(steps) {
    console.log("fake call to save to DB")
    console.log(steps)
    // create fake id here
    steps.id = 999
    steps.process_id = ["1"]
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(steps)
      }, 0)
    })
  },
  deleteSteps(steps) {
    console.log("fake call to save to DB")
    console.log(steps)
    // create fake id here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(steps)
      }, 0)
    })
  }
}

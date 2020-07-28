import intervention_plan from './data/intervention_plan'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchInterventionPlan() {
    return fetch(intervention_plan, 1000) // wait 1s before returning posts
  },
  updateInterventionPlan(intervention_plan) {
    console.log("fake call to update DB")
    console.log(intervention_plan)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(intervention_plan)
      }, 0)
    })
  },
  saveInterventionPlan(intervention_plan) {
    console.log("fake call to save to DB")
    console.log(intervention_plan)
    // create fake id here
    intervention_plan.id = 999
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(intervention_plan)
      }, 0)
    })
  },
  deleteInterventionPlan(intervention_plan) {
    console.log("fake call to save to DB")
    console.log(intervention_plan)
    // create fake id here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(intervention_plan)
      }, 0)
    })
  }
}

import glossary_category from './data/glossary_category'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchGlossaryCategory() {
    return fetch(glossary_category, 1000) // wait 1s before returning posts
  },
  updateGlossaryCategory(glossary_category) {
    console.log("fake call to update DB")
    console.log(glossary_category)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(glossary_category)
      }, 0)
    })
  },
  saveGlossaryCategory(glossary_category) {
    console.log("fake call to save to DB")
    console.log(glossary_category)
    // create fake id here
    glossary_category.id = 999
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(glossary_category)
      }, 0)
    })
  },
  deleteGlossaryCategory(glossary_category) {
    console.log("fake call to save to DB")
    console.log(glossary_category)
    // create fake id here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(glossary_category)
      }, 0)
    })
  }
}

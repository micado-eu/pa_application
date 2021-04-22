import client from 'api-survey-client'

/*
export function someAction (context) {
}
*/
export function fetchSurvey (state, data) {
  return client
    .fetchSurvey()
    .then(survey => state.commit('setSurvey', survey))
}

export function editSurvey (state, survey) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(survey)
  return client
    .updateSurvey(survey)
    .then(survey_return => state.commit('editSurvey', survey_return))
}

export function saveSurvey (state, survey) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(survey)
  return client
    .saveSurvey(survey)
    .then(survey_return => state.commit('saveSurvey', survey_return))
}

export function deleteSurvey (state, id) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  return client
    .deleteSurveyAnswers(id)
    .then(() =>{
      client.deleteSurvey(id).then(()=>{
        state.commit('deleteSurvey', id)

      })
    } 
      
     )
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */
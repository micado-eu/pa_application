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
export function fetchCSV (state, payload) {
  return client
    .fetchCSV(payload.surveyid, payload.app)
    .then(csv => {return csv})
}

export function editSurvey (state, survey) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  var working_survey = JSON.parse(JSON.stringify(survey, ['id','survey', 'active', 'activationDate', 'expiryDate', 'title', 'destinationApp']))
  console.log(survey)
  return client
    .updateSurvey(working_survey)
    .then(survey_return => {
      state.commit('editSurvey', working_survey)
  
  })
}

export function saveSurvey (state, survey) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  var working_survey = JSON.parse(JSON.stringify(survey, ['survey', 'active', 'activationDate', 'expiryDate', 'title', 'destinationApp']))
  console.log(survey)
  return client
    .saveSurvey(working_survey)
    .then(survey_return => {
      working_survey.id = survey_return.id

      state.commit('saveSurvey', working_survey)})
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
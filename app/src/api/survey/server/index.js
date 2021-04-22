import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchSurvey () {
    return axiosInstance
      .get('/backend/1.0.0/survey-with-answers-count')
      .then(response => { return response.data })
      .catch(error_handler)
  },
  saveSurvey(survey){
    return axiosInstance
      .post('/backend/1.0.0/surveys', survey)
      .then(response => response.data)
      .catch(error_handler);
  },
  updateSurvey(survey){
    return axiosInstance
      .patch('/backend/1.0.0/surveys/' + survey.id, survey)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteSurvey(id){
    return axiosInstance
      .delete('/backend/1.0.0/surveys/' + id)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteSurveyAnswers(id){
    return axiosInstance
      .delete('/backend/1.0.0/surveys/' + id + '/survey-answers')
      .then(response => response.data)
      .catch(error_handler);
  },
  fetchCSV (id_survey, destination_app) {
    return axiosInstance
      .get('/backend/1.0.0/getCsv?destinationApp='+destination_app + '&surveyid='+ id_survey)
      .then(response => { return response.data })
      .catch(error_handler)
  },

}

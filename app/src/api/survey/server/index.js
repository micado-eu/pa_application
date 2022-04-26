import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchSurvey () {
    return axiosInstance
      .get('/survey-with-answers-count')
      .then(response => { return response.data })
      .catch(error_handler)
  },
  saveSurvey(survey){
    return axiosInstance
      .post('/surveys', survey)
      .then(response => response.data)
      .catch(error_handler)
  },
  updateSurvey(survey){
    return axiosInstance
      .patch('/surveys/' + survey.id, survey)
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteSurvey(id){
    return axiosInstance
      .delete('/surveys/' + id)
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteSurveyAnswers(id){
    return axiosInstance
      .delete('/surveys/' + id + '/survey-answers')
      .then(response => response.data)
      .catch(error_handler)
  },
  fetchCSV (id_survey, destination_app) {
    return axiosInstance
      .get('/getCsv?destinationApp='+destination_app + '&surveyid='+ id_survey)
      .then(response => { return response.data })
      .catch(error_handler)
  },
  fetchPASurvey (id) {
    if(id == undefined){
      id = 0
    }
    return axiosInstance
      .get('/specific-survey?destinationApp=1&userid=' + id)
      .then(response => { return response.data })
      .catch(error_handler)
  },
  saveSurveyAnswer(surveyid, answer){
    return axiosInstance
      .post('/surveys/' + surveyid + '/survey-answers', answer)
      .then(response => response.data)
      .catch(error_handler)
  }

}

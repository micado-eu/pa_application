import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'
export default {
  fetchInterventionPlan (id) {
    console.log(id)
    console.log("CALLING API!!!!FETCH")
    
    return axiosInstance
      .get('/individual-intervention-plans?filter[include][0][relation]=interventions&filter[where][userId]=' + id)
      .then(response => response.data)
      .catch(error_handler)
    },
    deleteInterventionPlan (id) {
      console.log(id)
      console.log("CALLING API!!!!Delete")
      
      return axiosInstance
        .delete('/individual-intervention-plans/' + id)
        .then(response => response.data)
        .catch(error_handler)
      },
    saveIntervention (id, intervention) {
      console.log(id)
      console.log("CALLING API!!!! INTERVENTION")
      
      const savingIntervention = JSON.parse(JSON.stringify(intervention, [ 'listId','interventionType','title', 'description','validationDate', 'completed','validatingUserId','validatingUserTenant','assignmentDate', 'validationRequestDate']))
     
      return axiosInstance
        .post('/individual-intervention-plans/' + id + '/individual-intervention-plan-interventions', savingIntervention)
        .then(response => response.data)
        .catch(error_handler)
      },
      editIntervention (id_plan, intervention) {
        console.log(id_plan)
        const whereClause = {
          id: { eq: intervention.id }
        },
        
         editingIntervention = JSON.parse(JSON.stringify(intervention, [ 'id','listId','interventionType', 'title', 'description', 'completed']))
       
        return axiosInstance
          .patch('/individual-intervention-plans/' + id_plan + '/individual-intervention-plan-interventions?where=' + JSON.stringify(whereClause), editingIntervention)
          .then(response => response.data)
          .catch(error_handler)
        },
        deleteIntervention(intervention_id){
          return axiosInstance
          .delete('/individual-intervention-plan-interventions/' + intervention_id)
          .then(response => response.data)
          .catch(error_handler)
        },
        deleteInterventionByPlan(plan_id){
  
          return axiosInstance
          .delete('/individual-intervention-plans/' + plan_id + '/individual-intervention-plan-interventions?[where][listId]='+ plan_id)
          .then(response => response.data)
          .catch(error_handler)
        },

        saveInterventionPlan(intervention_plan) {
      
          console.log(intervention_plan)
          console.log("CALLING API!!!!PLAN")
             
          return axiosInstance
            .post('/individual-intervention-plans' , intervention_plan)
            .then(response => response.data)
            .catch(error_handler)
          
        },
    deleteIntegrationCategory(integration_category) {
      console.log("fake call to save to DB")
      console.log(integration_category)
      // create fake id here
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(integration_category)
        }, 0)
      })
    }
  }

import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
    getTenant (id) {
        return axiosInstance
            .get('/backend/1.0.0/getTenant')
            .then(response => { return response.data })
            .catch(error_handler)
    },
    getTenantDetail (id) {
        return axiosInstance
            .get('/backend/1.0.0/getTenant/' + id)
            .then(response => { return response.data })
            .catch(error_handler)
    }
}

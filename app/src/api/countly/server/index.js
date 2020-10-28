import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
    getDashboard (id) {
        return axiosInstance
            .get('/backend/1.0.0/getDashboard')
            .then(response => { return response.data })
            .catch(error_handler)
    }
}

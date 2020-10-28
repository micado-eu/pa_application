import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
    sendToTranslation (id) {
        return axiosInstance
            .get('/backend/1.0.0/sendtotranslation')
            .then(response => { return response.data })
            .catch(error_handler)
    }
}

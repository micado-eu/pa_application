import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
    sendToTranslation (id) {
        return axiosInstance
            .get('/sendtotranslation')
            .then(response => { return response.data })
            .catch(error_handler)
    }
}

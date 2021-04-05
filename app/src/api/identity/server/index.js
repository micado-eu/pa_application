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
    },
    addTenant (tenantDomain, password, email, firstname, lastname, tenantname, link, address, contactmail) {
        return axiosInstance
            .post('/backend/1.0.0/wso2TenantPlusDB?tenant=' + tenantDomain + '&password=' + password + '&email=' + email + '&firstname=' + firstname + '&lastname=' + lastname + '&tenantname=' + tenantname + '&link=' + link + '&address=' + address + '&contactmail=' + contactmail)
            .then(response => { return response.data })
            .catch(error_handler)
    }
}

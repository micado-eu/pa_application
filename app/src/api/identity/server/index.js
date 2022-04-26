import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
    getTenant (id) {
        return axiosInstance
            .get('/getTenant')
            .then(response => { return response.data })
            .catch(error_handler)
    },
    getTenantDetail (id) {
        return axiosInstance
            .get('/getTenant/' + id)
            .then(response => { return response.data })
            .catch(error_handler)
    },
    addTenant (tenantDomain, password, email, firstname, lastname, tenantname, link, address, contactmail) {
        return axiosInstance
            .post('/wso2TenantPlusDB?tenant=' + tenantDomain + '&password=' + password + '&email=' + email + '&firstname=' + firstname + '&lastname=' + lastname + '&tenantname=' + tenantname + '&link=' + link + '&address=' + address + '&contactmail=' + contactmail)
            .then(response => { return response.data })
            .catch(error_handler)
    }
}

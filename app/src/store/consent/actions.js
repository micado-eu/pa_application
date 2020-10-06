import client from 'api-consent-client'
/*
export function someAction (context) {
}
*/
export function fetchReceipt (state, data) {
    return client
        .fetchConsent(data.tenant, data.principal)
        .then((consent) => {
            console.log('the consent')
            console.log(consent)
            //           state.commit('setConsent', consent)

            return client.fetchReceipt(consent[0].consentReceiptID)

            //          return consent
        })
        .then((receipt) => {
            console.log('the receipt')
            console.log(receipt)
            return receipt
        })
}

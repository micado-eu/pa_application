import axios from 'axios'
import qs from 'qs'

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: 'https://api.micadoproject.eu',
  "headers": {
          "Prefer": "resolution=merge-duplicates",
          "apikey": "eyJ4NXQiOiJaalJtWVRNd05USmpPV1U1TW1Jek1qZ3pOREkzWTJJeU1tSXlZMkV6TWpkaFpqVmlNamMwWmc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiYWRtaW4iLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6Ik1pZ3JhbnRBcHAiLCJpZCI6MywidXVpZCI6IjM5Nzg1NzQ0LWM3NTQtNGE5ZC1hYjdjLTM5ZTFmMTdiZWZkNCJ9LCJ0aWVySW5mbyI6eyJHb2xkIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlBvc3RnUkVTVEFQSSIsImNvbnRleHQiOiJcL2RiXC92MDEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MDEiLCJzdWJzY3JpcHRpb25UaWVyIjoiR29sZCJ9XSwiaWF0IjoxNTg4OTQ3OTg1LCJqdGkiOiJlNWNlOWE4NC00M2QwLTQzMDItYWQ0Ni1kNjFmYmFmYWE0M2IifQ==.RYEm1hx5jMUQATARCRK5bLJa7f9CAY0mn7UHMBt-RxluryTMSMy11V0cMLS2toUtrFf9DmqhcZgdaYSTUfEhJhKWAjmSsbvPGiAGQFb78ZVumPilDSiieoBhs8-5wWjnQji3HZgBakv2Tdi6h11prSKC173ouOkXvi7-FOXqRWV7PdHEqfvGJ2xTTPjFXDXlcTijzKesAwXMOfJOkCFt8ISDKjjAtadA4ZFOtmodqAOjVShs5jBV4DXICldzlNSsWx1e3KLK3rORlB6_f6bBECI5ZJ1xmMNfpRuj5-ww3iL9jUGuE7WVVy8ibYPIW0J9RtvT_XeyPcLci7edlyMKRg=="
        }
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }

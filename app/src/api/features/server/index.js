import axios from 'axios'
import https from 'https';

export default {
  fetchFeatures () {
    console.log("sono il client di features")
    const agent = new https.Agent({
        rejectUnauthorized: false
      });
    return axios
      .get('https://api.micadoproject.eu/feature/v01', { httpsAgent: agent })
      .then(
        response => response.data
      ).catch(function (err) {

        // Run into big problems when I get an error
        console.log("Got an error calling API manager: ", err);
        console.log(this)
//        reject([])
//        return Promise.resolve([]]);
//        response => []
      })

  }
}

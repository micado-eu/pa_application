import axios from 'axios'

export default {
  fetchFeatures () {
    console.log("sono il client di features")
    return axios
      .get('https://api.micadoproject.eu/feature/v01')
      .then(
        response => response.data
      ).catch(function (err) {

        // Run into big problems when I get an error
        console.log("Got an error calling API manager: ", err);
      })

  }
}

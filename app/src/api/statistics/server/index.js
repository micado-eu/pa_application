import { axiosInstance } from 'boot/axios'
import { error_handler, isJSON } from '../../../helper/utility'
import * as xml2js from 'xml2js'

//set timeout in ms for api requests
const timeout = 15000


export default {
  fetchStatistics(){
    return fetchLocalCharts()
    .then((localCharts)=>{
      return {charts: localCharts}
      })
  },
  addChart(chart) {
    switch (chart.format) {
      default:
        break
      case 'file':
        console.log(chart.content)
        chart.content = chart.content
        break
      case 'csv':
        chart.content = csvToJSON(chart.content)
        // chart.content = csvToJSON(chart.content).replace(/\n|\r/g, "")
        break
      case 'JSON':
        chart.content = chart.content.replace(/(\r\n|\n|\r)/gm, '').replace(/\s/g, '')
        break
      case 'API':
        chart.content = chart.content
        break
    }
    if (isJSON(chart.content)) {
      return axiosInstance
        .post('/charts', chart)
        .then((response) => response.data)
        .catch(error_handler)
    }
    return Promise.reject('Error: the file format/data formats is wrong')
  },
  deleteChart(id) {
    return axiosInstance
      .delete('/charts/' + id)
      .then(response => response.data)
      .catch(error_handler)
  }
}

function fetchLocalCharts() {
  var charts = []
  var apicharts = []
  

  return axiosInstance
    .get('/charts')
    .then((response) => {
      var fetched = response.data
      return fetched.forEach(chartdata => {
         switch (chartdata.format) {
          case "file":
            chartdata["dbid"]=chartdata.id
            charts.push(
              chartdata
            )
              break

          case "csv":
            chartdata["dbid"]=chartdata.id
            charts.push(
              chartdata
          )
          break

          case "json":
            chartdata["dbid"]=chartdata.id
            charts.push(
              chartdata
          )
          break

          case "api":
            if (chartdata.function !== null) {
              apicharts.push(chartdata)
            }
          break
          default:
           break
        }
      })
    })
    .then(function() {
      var promises = []
      apicharts.forEach((chartdata)=>{
        switch(chartdata.function) {
          case "wfsHamburg":
            promises.push(wfsHamburg(chartdata))
            break
          case "apiUNHCR":
            promises.push(apiUNHCR(chartdata))
            break
          case "UNHCRukr":
            promises.push(UNHCRukr(chartdata))
            break
          default:
            break
        }
      })
      return Promise.all(promises).then((chartgroups)=>{
        if (chartgroups !== null) {
          chartgroups.forEach((chartgroup)=>{
            if (chartgroup !== null) {
            chartgroup.forEach((chart)=>{
              let id
              let dbid
              if (chart.localid === undefined) {
                id = chart.id
                dbid = chart.id
              } else {
                id = chart.localid
                dbid = chart.dbid
              }

              charts.push(
                {
                "id": id,
                "dbid": dbid,
                "title": chart.title,
                "content": chart.content,
                "description": chart.description,
                "category": chart.category,
                "format": "api",
                "type": chart.type,
                "xistime": true,
                "x": chart.x,
                "y": chart.y,
                "board": chart.board,
                "provider": chart.provider,
                "updated": chart.updated,
                "xistime":chart.xistime
            })
            })
            }
          })
        }
      })
    })
    .then(function() {
      return charts})
    .catch(error_handler)
}

function apiUNHCR(options){
  var output = []
  const controller = new AbortController()
  setTimeout(() => 
  controller.abort(), timeout)

  return fetch(options.link, { signal: controller.signal })
  .then((response => {
    if (response.ok) {
      return response.json()
    } else if(response.status === 404) {
      return Promise.reject('error 404')
    } else {
      return Promise.reject('some other error: ' + response.status)
    }
  }))
  .then(response => {
    switch(options.type){
      case "BAR":
        for (let i = 0; i < response.data.timeseries.length; i++) {
          const d = response.data.timeseries[i]
          d.date = `${d.year}.${d.month}`
        }
        output.push({
          board: options.board,
          id: options.id,
          category: response.data.geoMasterId.name,
          content: JSON.stringify(response.data.timeseries),
          description: response.situation_view_description,
          format: 'API',
          title: response.situation_view_name,
          type: 'BAR',
          x: 'date',
          y: 'individuals',
          xistime: true,
          provider: 'UNHCR'
        })
        break
      case "LINE":
        for (let i = 0; i < response.data.timeseries.length; i++) {
          const d = response.data.timeseries[i]
          d.date = `${d.year}.${d.month}`
        }
        output.push({
          board: options.board,
          id: options.id,
          category: response.data.geoMasterId.name,
          content: JSON.stringify(response.data.timeseries),
          description: response.situation_view_description,
          format: 'API',
          title: response.situation_view_name,
          type: 'LINE',
          x: 'date',
          y: 'individuals',
          xistime: true,
          provider: 'UNHCR'
        })
          break  
      case "PIE":
        output.push(
          {
            id: options.id,
            board: options.board,
            category: response.data[0].geomaster_name,
            content: JSON.stringify(response.data),
            description: response.situation_view_description,
            format: 'API',
            title: response.situation_view_name,
            type: 'PIE',
            provider: 'UNHCR',
            x: 'pop_origin_name',
            y: 'individuals',
            xistime: false
          }
        )
        break
    }
  })
  .then(function(){return output})
  .catch(function() {
    return null}
    )
}

function UNHCRukr(options){
  var output = []
  const controller = new AbortController()
  setTimeout(() => 
  controller.abort(), timeout)

  return fetch(options.link, { signal: controller.signal })
  .then((response => {
    if (response.status === 200) {
      return response.json()
    } 
    else 
    {
      return null
    }
  }))
  .then(response => {
    switch(options.type){
      case "BAR":
        switch(options.xistime){
          case false:
            output.push(
              {
                id: options.id,
                board: options.board,
                category: options.category,
                content: JSON.stringify(response.data).replaceAll("geomaster_name","country"),
                description: response.situation_view_description,
                format: 'API',
                title: options.title,
                type: 'BAR',
                provider: 'UNHCR',
                x: 'country',
                y: 'individuals',
                xistime: options.xistime
              }
            )
            break
          case true:
            for (let i = 0; i < response.data.timeseries.length; i++) {
              const d = response.data.timeseries[i]
              d.date = `${d.year}.${d.month}`
            }
            output.push(
              {
                id: options.id,
                board: options.board,
                category: options.category,
                content: JSON.stringify(response.data.timeseries),
                description: response.situation_view_description,
                format: 'API',
                title: options.title,
                type: 'BAR',
                provider: 'UNHCR',
                x: 'date',
                y: 'individuals',
                xistime: options.xistime
              }
            )
            break
        }

        break
      case "LINE":
        output.push({
          board: options.board,
          id: options.id,
          category: options.category,
          content: JSON.stringify(response.data.timeseries).replaceAll("data_date","Date"),
          description: response.situation_view_description,
          format: 'API',
          title: options.title,
          type: 'LINE',
          x: 'Date',
          y: 'individuals',
          xistime: true,
          provider: 'UNHCR'
        })
          break  
      case "PIE":
        output.push(
          {
            id: options.id,
            board: options.board,
            category: options.category,
            content: JSON.stringify(response.data),
            description: response.situation_view_description,
            format: 'API',
            title: options.title,
            type: 'PIE',
            provider: 'UNHCR',
            x: 'geomaster_name',
            y: 'individuals',
            xistime: options.xistime
          }
        )
        break
    }
  })
  .then(function(){
    return output})
  .catch(e => {return null})
}


function wfsHamburg(options) {
  var metadata = []
  var charts = {}
  var servicetitle
  var servicedescr
  options.typenames=[]
  var output = []
  var prefix = null

  return  GetCapabilities(options.link)
     .then(()=>DescrFeaturetpyes(options.link))
     .then(()=>GetFeature(options.link))
     .then(()=>{
      if (metadata.length>0){
        return GetMetadata(metadata)
      }
      })     
      .then(()=>PrepareData(charts))
     .then( function() {
        return output
      })
    .catch(function() {
      return null}
      )
  




  function GetCapabilities(baseurl) {
    return (fetch(baseurl+'?REQUEST=GetCapabilities&SERVICE=WFS')
    .then((response => {
    if (response.status === 200) {
        return response
    } 
    else 
    {
      output = null  
      return null
    }
    }))
    .then(response => response)
    .then(data => data.text())
    .then(data => {
    xml2js.parseStringPromise(data, {trim: true, explicitArray: false, mergeAttrs: true, explicitRoot: false})
    .then(data => {
        let featuretypelist = data.FeatureTypeList.FeatureType
        servicetitle = data["ows:ServiceIdentification"]["ows:Title"]
        servicedescr = data["ows:ServiceIdentification"]["ows:Abstract"]
        if (featuretypelist.length !== undefined){
          featuretypelist.forEach(feature => {
            options.typenames.push(feature.Title)
            if (feature.MetadataURL !== undefined) {
              metadata.push(feature.MetadataURL)
            }
            if (prefix === null) {
              prefix = feature.Title.split(":")[0]
            }
            })

        }
        else {
          options.typenames.push(featuretypelist.Title)
          if (featuretypelist.MetadataURL !== undefined) {
            metadata.push(featuretypelist.MetadataURL)
          }
          if (prefix === null) {
              prefix = featuretypelist.Title.split(":")[0]
          }        
        }
    })
        .catch(error_handler)

    }
    )
    )
  }

  function DescrFeaturetpyes (url){
    var descrfurl = url+'?REQUEST=DescribeFeatureType&SERVICE=WFS&VERSION=2.0.0&typename='+options.typenames.join(',')
    return (fetch(descrfurl)
    .then((response => {
    if (response.status === 200) {
        return response
    } 
    else 
    {
        return null
    }
    }))
    .then(response => response)
    .then(data => data.text())
    .then(data => {
    // xml2js.parseStringPromise(data, {mergeAttrs: true, ignoreAttrs: false, explicitRoot: true, explicitArray: false})
    xml2js.parseStringPromise(data, {mergeAttrs: true, ignoreAttrs: false, explicitRoot: true, explicitArray: false})
    .then(data => {

      var dat = data  
      data=data["schema"]

        //Type 1
        if (data["complexType"] !== undefined ){            
          let typenames_short = []
          let containerindexes = []
          let metadataindexes = []
          let chartindexes = []
          data["complexType"].forEach(types => {
            if (types.complexContent !== undefined){
              
              types.complexContent.extension.sequence.element.forEach(el => {
                if (el.type == "de.hh.up:complex"){
                  typenames_short.push(types.name)
                    chartindexes.push(el.name)
                }
              })
            }
            else if (types.name === "complex") {
              containerindexes.push(types.sequence.element[1].ref)
              metadataindexes.push(types.sequence.element[0].ref)
            }
          })
          
          //add Data to output
          chartindexes.forEach( index => {
            charts[index]={
              typename_short: typenames_short[chartindexes.indexOf(index)],
              containerindex: containerindexes[0],
              metadataindex: metadataindexes[0],
              category: servicetitle,
              descr: servicedescr,
              title: index,
              schema: 1
            }
          })
          //read out data for keyindex and valueindex
          let keyindexes = []
          let valueindexes = []
          let typenames = []
          let prefixes = []
          let valuelabelindexes = []
          typenames_short = []
          data["element"].forEach(elements => {
              if (elements.name === "values") {
                keyindexes.push(elements.complexType.sequence.element[0].name)
                valueindexes.push(elements.complexType.sequence.element[1].name)
              } else if (elements.name === "metadata") {
                valuelabelindexes.push(elements.complexType.sequence.element[2].name)
              }
              else if (options.typenames.includes(elements.type)) {
                typenames.push(elements.type)
                typenames_short.push(elements.name)
                prefixes.push(elements.type.split(":")[0])
              }

          })

          Object.keys(charts).forEach(key => {
            charts[key]["typename"]=typenames[typenames_short.indexOf(charts[key]["typename_short"])]
            charts[key]["keyindex"]=keyindexes[typenames_short.indexOf(charts[key]["typename_short"])]
            charts[key]["valueindex"]=valueindexes[typenames_short.indexOf(charts[key]["typename_short"])]
            charts[key]["prefix"]=prefixes[typenames_short.indexOf(charts[key]["typename_short"])]
            charts[key]["valuelabelindex"]=valuelabelindexes[typenames_short.indexOf(charts[key]["typename_short"])]
          })
        } 
        //Type 2
        else {
            let typenames_short = []
            let chartindexes = []
            let dataindexes = []
            let containerindexes = []
            let keyindexes = []
            let valueindexes= []
            let prefixes = []
            var schema = 2

          data["element"].forEach(element => {

            if (element.substitutionGroup == "gml:AbstractFeature" & element.abstract != "true" & schema == 2){
              typenames_short.push(element.name)
              element.complexType.complexContent.extension.sequence.element.forEach(chartdata => {
                if (Object.keys(chartdata).includes('complexType')) {
                  dataindexes.push(chartdata.complexType.sequence.element.ref)
                  chartindexes.push(chartdata.name)
                } else {
                  schema = 3
                }
              })
            }
          })

          if (schema == 2){
            dataindexes.forEach(element => {
              element = element.split(":")[1]
              data["element"].filter(obj => {return obj.name === element}).forEach(entry => {
                let containerindex = entry.complexType.sequence.element.ref
                prefixes.push(containerindex.split(":")[0])
                containerindexes.push(containerindex)
                data["element"].filter(obj => {return obj.name === containerindex.split(":")[1]}).forEach(contindex => {
                  keyindexes.push(contindex.complexType.sequence.element[0]["name"])
                  valueindexes.push(contindex.complexType.sequence.element[1]["name"])
                })
              })
          })
          chartindexes.forEach( index => {
            charts[index] = {
              typename_short: typenames_short[chartindexes.indexOf(index)],
              dataindex: dataindexes[chartindexes.indexOf(index)],
              containerindex: containerindexes[chartindexes.indexOf(index)],
              keyindex: keyindexes[chartindexes.indexOf(index)],
              valueindex: valueindexes[chartindexes.indexOf(index)],
              keylabel: keyindexes[chartindexes.indexOf(index)],
              valuelabel: valueindexes[chartindexes.indexOf(index)],
              title: index,
              category: servicetitle,
              descr: servicedescr,
              prefix: prefixes[chartindexes.indexOf(index)],
              schema: schema
            }
          })
        } else {
          data["element"].forEach(element => {
            typenames_short.push(element.name)
            charts[element.name] = {
              keyindex: element.complexType.complexContent.extension.sequence.element[0].name,
              valueindex: element.complexType.complexContent.extension.sequence.element[1].name,
              keylabel: element.complexType.complexContent.extension.sequence.element[0].name, //copied
              valuelabel: element.complexType.complexContent.extension.sequence.element[1].name, //copied
              title: element.name,
              category: servicetitle,
              descr: servicedescr,
              prefix: prefix,
              schema: 3,
              data: []
            }
          })
        }
        }
    })
    }
    )
    )    
  }  

  function GetFeature (url){
    function trimKey(input){
      return input.split(":")[1]
    }

    return (fetch(url+'?REQUEST=GetFeature&SERVICE=WFS&VERSION=2.0.0&typename='+options.typenames.join(','))
    .then((response => {
    if (response.status === 200) {
        return response
    } 
    else 
    {
        return null
    }
    }))
    .then(response => response)
    .then(data => data.text())
    .then(data => {
    xml2js.parseStringPromise(data, {mergeAttrs: false, ignoreAttrs: true, explicitRoot: false, explicitArray: true})
    .then(data => {
        data = data["wfs:member"]
        data.forEach(typename => {
          if (Object.keys(charts).includes(trimKey(Object.keys(typename)[0]))) {
            let chartdata = charts[trimKey(Object.keys(typename)[0])]
            let keyindex = chartdata['prefix']+':'+chartdata['keyindex']
            let valueindex = chartdata['prefix']+':'+chartdata['valueindex']
            charts[trimKey(Object.keys(typename)[0])].data.push({
              [charts[trimKey(Object.keys(typename)[0])]['keylabel']]:typename[Object.keys(typename)[0]][0][keyindex][0],
              [charts[trimKey(Object.keys(typename)[0])]['valuelabel']]:typename[Object.keys(typename)[0]][0][valueindex][0]
            })
          }

          Object.keys(typename).forEach(element => {
            typename[element].forEach(el => {
              Object.keys(el).forEach(chartindex => {


                  if (Object.keys(charts).includes(trimKey(chartindex))) {
                  let chartdata = charts[trimKey(chartindex)]

                  if (Object.keys(el).includes(chartdata.prefix+":information")) {
                      chartdata.title = el[chartdata.prefix+":information"][0]
                  }
                  let content = []
                  let databatch

                  if (chartdata.schema === 1) {
                    databatch = el[chartindex][0][charts[trimKey(chartindex)]["containerindex"]]
                    let metadata = el[chartindex][0][charts[trimKey(chartindex)]["metadataindex"]]
                    chartdata["valuelabel"]="Value"
                    chartdata["keylabel"]="Key"
                    chartdata["valuelabel"]=metadata[0][chartdata["prefix"]+":"+chartdata["valuelabelindex"]][0]

                  } else if (chartdata.schema === 2) {
                    databatch = el[chartindex][0][charts[trimKey(chartindex)]["dataindex"]][0][charts[trimKey(chartindex)]["containerindex"]]
                  }

                  databatch.forEach(dataset => {
                    if (Object.keys(dataset).length == 2) {
                      content.push({
                      [chartdata["keylabel"]]: dataset[chartdata["prefix"]+":"+chartdata["keyindex"]][0],
                      [chartdata["valuelabel"]]: dataset[chartdata["prefix"]+":"+chartdata["valueindex"]][0]
                    })

                    }

                  })

                  chartdata["data"]=content

                }
              })
            })
          })
        })

        Object.keys(charts).forEach(key => {
          if (typeof charts[key]["data"] === "undefined") {
            delete charts[key]
          }
        })
    })
    }
    )
    )
  }

  function GetMetadata(metad){
    metad=metad[0]["xlink:href"]
    metad=new URL(metad)

    if (metad.protocol !== "https:") {
      metad.protocol = "https:"
    }

    return (fetch(metad)
    .then((response => {
    if (response.status === 200) {
        return response
    } 
    else 
    {
        return null
    }
    }))
    .then(response => response)
    .then(data => data.text())
    .then(data => {

    xml2js.parseStringPromise(data, {mergeAttrs: true, ignoreAttrs: false, explicitRoot: false, explicitArray: false})
    .then(data => {
        data=data["gmd:MD_Metadata"]
        Object.keys(charts).forEach(chart => {
          //charts[chart]["updated"]=data["gmd:dateStamp"]["gco:Date"]
          charts[chart].provider=data["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]
          charts[chart].category=data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]
          charts[chart].descr=data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:abstract"]["gco:CharacterString"]
          charts[chart].board=options.board
          // let updated = data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceAndUpdateFrequency"]["gmd:MD_MaintenanceFrequencyCode"].codeListValue
          // console.warn(updated)
          if (data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceMaintenance"] !== undefined){
            charts[chart].updated = data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceAndUpdateFrequency"]["gmd:MD_MaintenanceFrequencyCode"].codeListValue
          } else {
            charts[chart].updated = 'k.A.'
          }
          // charts[chart].updated=data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceAndUpdateFrequency"]["gmd:MD_MaintenanceFrequencyCode"].codeListValue
          })
    })
    }
    )
    )    
  } 
  
  function PrepareData(input) {
    let counter = 0
    Object.keys(input).forEach(key=> {
      let chartdata = input[key]
      output.push({
        localid: "a"+options.id+counter,
        dbid: options.id,
        board: options.board,
        type: options.type,
        category: chartdata.category,
        content: JSON.stringify(chartdata.data),
        description: chartdata.descr,
        format: "API",
        x: chartdata.keylabel,
        y: chartdata.valuelabel,
        updated: chartdata.updated,
        provider: chartdata.provider,
        title: chartdata.title,
        xistime: true        
      })
      counter=counter+1
    })
  }

}


function csvToJSON(csv) {
  const lines = csv.replace(/\r/g, '').split('\n').filter((line) => line)
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentline = lines[i].split(',')
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return JSON.stringify(result) // JSON
}



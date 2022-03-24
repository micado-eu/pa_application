import { axiosInstance } from 'boot/axios'
import { error_handler, isJSON } from '../../../helper/utility'
import * as xml2js from 'xml2js'

//set timeout in ms for api requests
const timeout = 10000

const unhcrAPI = {
  Spain: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=190477&geo_id=729&sv_id=11&population_group=4797&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by sea'
    },
    land: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=190478&geo_id=729&sv_id=11&population_group=4798&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by land'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=190463&geo_id=729&sv_id=11&population_collection=28&limit=10&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  },
  Greece: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197455&geo_id=640&sv_id=11&population_group=4797&frequency=month&fromDate=1900-01-01',
      name: 'Arrival by sea'
    },
    land: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197456&geo_id=640&sv_id=11&population_group=4798&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by land'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=197446&geo_id=640&sv_id=11&population_group=4996&population_collection=28&limit=20&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  },
  Italy: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197479&geo_id=656&sv_id=11&population_group=4797&frequency=month&fromDate=1900-01-01',
      name: 'Arrival by sea'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=197472&geo_id=656&sv_id=11&population_collection=28&limit=200&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  }
}

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
      case 'csv':
        chart.content = csvToJSON(chart.content)
        // chart.content = csvToJSON(chart.content).replace(/\n|\r/g, "")
        break
      case 'JSON':
        chart.content = chart.content.replace(/(\r\n|\n|\r)/gm, '').replace(/\s/g, '')
        break
      case 'API':
        break
    }
    if (isJSON(chart.content)) {
      return axiosInstance
        .post('/backend/1.0.0/charts', chart)
        .then((response) => response.data)
        .catch(error_handler)
    }
    return Promise.reject('Error: the file format/data formats is wrong')
  },
  deleteChart(id) {
    return axiosInstance
      .delete('/backend/1.0.0/charts/' + id)
      .then(response => response.data)
      .catch(error_handler)
  }
}

function fetchLocalCharts() {
  var charts = []
  var apicharts = []
  

  return axiosInstance
    .get('/backend/1.0.0/charts')
    .then((response) => {
      var fetched = response.data
      return fetched.forEach(chartdata => {
         switch (chartdata.format) {
          case "csv":
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
              charts.push(
                {
                "id": chart.id,
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

  return  GetCapabilities(options.link)
     .then(()=>DescrFeaturetpyes(options.link))
     .then(()=>GetFeature(options.link))
     .then(()=>GetMetadata(metadata))
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
            metadata.push(feature.MetadataURL)
          })

        }
        else {
          options.typenames.push(featuretypelist.Title)
          metadata.push(featuretypelist.MetadataURL)
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

          data["element"].forEach(element => {

            if (element.substitutionGroup == "gml:AbstractFeature" & element.abstract != "true"){
              typenames_short.push(element.name)
              element.complexType.complexContent.extension.sequence.element.forEach(chartdata => {
                chartindexes.push(chartdata.name)
                dataindexes.push(chartdata.complexType.sequence.element.ref)
              })

            }
          })

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
              schema: 2
            }
          })
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
    var output={}
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

    xml2js.parseStringPromise(data, {mergeAttrs: true, ignoreAttrs: true, explicitRoot: false, explicitArray: false})
    .then(data => {
        data=data["gmd:MD_Metadata"]
        output.updated=data["gmd:dateStamp"]["gco:Date"]
        output.provider=data["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]
        output.title=data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]
        output.descr=data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:abstract"]["gco:CharacterString"]
        Object.keys(charts).forEach(chart => {
          charts[chart]["updated"]=data["gmd:dateStamp"]["gco:Date"]
          charts[chart].provider=data["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]
          charts[chart].category=data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]
          charts[chart].descr=data["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:abstract"]["gco:CharacterString"]
          charts[chart].board=options.board
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
        id: "a"+options.id+counter,
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

function parseUnhcrBar(data,title) {
  // add date
  for (let i = 0; i < data.data.timeseries.length; i++) {
    const d = data.data.timeseries[i]
    d.date = `${d.year}.${d.month}`
  }
  return {
    board: 'UNHCR',
    id: data.title_language_en,
    category: data.data.geoMasterId.name,
    content: JSON.stringify(data.data.timeseries),
    description: data.situation_view_description,
    format: 'API',
    title: title,
    type: 'BAR',
    x: 'date',
    y: 'individuals',
    xistime: true,
    provider: 'UNHCR'
  }
}

function parseUnhcrPie(data,title) {
  return {
    board: 'UNHCR',
    category: data.data[0].geomaster_name,
    content: JSON.stringify(data.data),
    description: data.situation_view_description,
    format: 'API',
    title: title,
    type: 'PIE',
    provider: 'UNHCR',
    x: 'pop_origin_name',
    y: 'individuals',
    xistime: false
  }
}

function parseHamburgFull(json){
  return json
}

function parseHamburg(json) {
  if (json !== null) {

    const board = 'Hamburg WFS'
    const category = Object.keys(json['wfs:FeatureCollection']['wfs:member'][0])[0]
    let data = json['wfs:FeatureCollection']['wfs:member'][0][category][0]
  
    const result = []
    Object.keys(data).forEach(key => {
      if (key != '$') {
        const content = data[key][0]['mic:zeitreihe'][0]['mic:zeitreihen-element']
        for (let [i, c] of content.entries()) {
          if (c["mic:datum"] != undefined && c["mic:wert"] != undefined) {
            c["mic:datum"] = c["mic:datum"][0]
            c["mic:wert"] = c["mic:wert"][0]
          } else {
            content.splice(i, 1)
          }
        }
        result.push({
          id: key,
          board,
          title: key.split(":")[1].replaceAll("_"," "),
          description: "",
          category: category.split(":")[1].replaceAll("_"," "),
          format: "API",
          provider: "Free and Hanseatic City of Hamburg",
          url: "",
          type: "BAR",
          xistime: true,
          x: "mic:datum",
          y: "mic:wert",
          content: JSON.stringify(content)
        })
      }
    })
    return result

  } else {
    return null
  }
}

// function parseHamburg2(json) {
//   const result = []
//   const board = 'Hamburg WFS'
//   let data = json['wfs:FeatureCollection']['gml:featureMember']
//   data.forEach((element, index) => {
//     let chartdata = element[Object.keys(element)][0]
//     let key = Object.keys(chartdata)[8]
//     let content = chartdata[key][0]['de.hh.up:values']
//     for (let [i, c] of content.entries()) {
//       if (c["de.hh.up:key"] != undefined && c["de.hh.up:value"] != undefined) {
//         c["de.hh.up:key"] = c["de.hh.up:key"][0]
//         c["de.hh.up:value"] = c["de.hh.up:value"][0]
//       } else {
//         content.splice(i, 1)
//       }
//     }
//     result.push({
//       id: index,
//       board,
//       title: chartdata['de.hh.up:information'][0],
//       description: '',
//       category: 'Anzahl Personen mit Leistungen nach Asylwerberleistungsgesetz',
//       format: 'API',
//       provider: "Free and Hanseatic City of Hamburg",
//       url: "",
//       type: "LINE",
//       xistime: true,
//       x: 'de.hh.up:key',
//       y: 'de.hh.up:value',
//       content: JSON.stringify(content)
//     })


//   })
//   return result

// }

function fetchJSON(url) {
  const controller = new AbortController()
  setTimeout(() => 
  controller.abort(), timeout)

  return fetch(url, { signal: controller.signal })
  .then((response => {
    if (response.status === 200) {
      return response.json()
    } 
    else 
    {
      return null
    }
  }))
  .catch(e => {return null})
}


function fetchXMLfull(url,type){
  const controller = new AbortController()
  setTimeout(() => 
  controller.abort(), timeout)
  let output = []
  let metadata = {
    valid: false,
    board: 'Hamburg',
    type: type,
    xistime: true,
    format: 'API',
    url: '',
    x: 'Datum',
    y: 'Wert'
  }

  return (fetch(url+ 'Getcapabilities', { signal: controller.signal })
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
    xml2js.parseStringPromise(data, {mergeAttrs: true, ignoreAttrs: true, explicitRoot: false, explicitArray: false, preserveChildrenOrder: true})
    .then(data=>{
      metadata.category = data["ows:ServiceIdentification"]["ows:Title"]
      metadata.description = data['ows:ServiceIdentification']['ows:Abstract']
      metadata.provider = data['ows:ServiceProvider']['ows:ProviderName']  
    })
    .then(
      function() {
        return fetch(url+ 'GetFeature', { signal: controller.signal })
        .then((response => {
          if (response.status === 200) {
            return response
          } 
          else 
          {
            return null
          }
        }))      
        .then(features => features.text())
        .then(features => {
          xml2js.parseStringPromise(features, {ignoreAttrs: true, explicitArray: false, explicitRoot: false})
          .then(features=>{
            let wfs_title = Object.keys(features['wfs:member'])[0]
            let data = features['wfs:member'][wfs_title]
            Object.keys(data).forEach(key => {
              let chartdata = {...metadata}
              chartdata.id=key
              chartdata.title=key.split(":")[1].replaceAll("_"," ")
              const content = (data[key]['mic:zeitreihe']['mic:zeitreihen-element'])
              for (let [i, c] of content.entries()) {
                  if (c["mic:datum"] != undefined && c["mic:wert"] != undefined) {
                    c[metadata.x] = c["mic:datum"]
                    c[metadata.y] = c["mic:wert"]
                  } else {
                    content.splice(i, 1)
                  }
              }
              chartdata.content=JSON.stringify(content)
              output.push(chartdata)

            })
          })  
        })
        .catch(e => {return null})
      }
      )
  })
  ).then(function() {
    return output})
    .catch(e => {return null})
}

function fetchXMLfull2(url,type){
  const controller = new AbortController()
  setTimeout(() => 
  controller.abort(), timeout)
  let output = []
  let metadata = {
    valid: false,
    board: 'Hamburg',
    type: type,
    xistime: true,
    format: 'API',
    url: '',
    x: 'Datum',
    y: 'Wert'
  }

  return (fetch(url+ 'Getcapabilities', { signal: controller.signal })
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
    xml2js.parseStringPromise(data, {mergeAttrs: true, ignoreAttrs: true, explicitRoot: false, explicitArray: false, preserveChildrenOrder: true})
    .then(data=>{
      metadata.category = data["ows:ServiceIdentification"]["ows:Title"]
      metadata.description = data['ows:ServiceIdentification']['ows:Abstract']
      metadata.provider = data['ows:ServiceProvider']['ows:ProviderName']
    })
    .then(
      function() {
        return fetch(url+ 'GetFeature', { signal: controller.signal })
        .then((response => {
          if (response.status === 200) {
            return response
          } 
          else 
          {
            return null
          }
        }))      
        .then(features => features.text())
        .then(features => {
          xml2js.parseStringPromise(features, {ignoreAttrs: true, explicitArray: false, explicitRoot: false})
          .then(features=>{
            features['gml:featureMember'].forEach((d) => {
              let dataset = d[Object.keys(d)[0]]
              let chartdata = {...metadata}
              chartdata.title = dataset['de.hh.up:information']
              Object.keys(dataset).forEach(key => {
                if (['de.hh.up:leistungen_gesamt_asylblg','de.hh.up:leistungen_p2_asylblg','de.hh.up:leistungen_p3_asylblg'].includes(key)) {
                  const content = dataset[key]['de.hh.up:values']
                  for (let [i,c] of content.entries()) {
                    if (c["de.hh.up:key"] != undefined && c["de.hh.up:value"] != undefined) {
                      c[metadata.x] = c["de.hh.up:key"]
                      c[metadata.y] = c["de.hh.up:value"]
                    } else {
                      content.splice(i, 1)
                    }
                  }
                  chartdata.content=JSON.stringify(content)
                  output.push(chartdata)
                }
              })
            })
          })  
        })
        .catch(e => {return null})
      }
      )
  })
  ).then(function() {
    return output})
    .catch(e => {return null})
}

function fetchXML(url) {
  let valid = false
  const controller = new AbortController()
  setTimeout(() => 
  controller.abort(), timeout)
  return fetch(url, { signal: controller.signal })
    .then(res2 => {
      if (res2.status === 200 ) {
        valid = true
        return res2
      } else {
        valid = false
        return null
      }
    })
    .then(
      res2 => {
        if (valid === true) {
          return res2.text()
        }
        else return null
      }
      )
    .then(res2 => {
      if (valid === true) {
        const parser = new xml2js.Parser()
        return parser.parseStringPromise(res2)
      }
      else {
        return null
      }
    })
    .catch(function (e) {return null})
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



const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidW1hbmc0IiwiYSI6ImNrM3cxdWI0azA4c2QzbW12eW5mc2pkaHYifQ.z9ZRcOaSu_4X-K1JqKZYBA'
  
     request({url: url, json: true},(error,{body})=>{
      if(error){
          callback('Unable to connecct to weather services', undefined)
      } else if(body.features.length==0) {
          callback('Unable to find location. find another search',undefined)
      } else{
          callback(undefined,{
              latitude: body.features[0].center[0],
              longitude: body.features[0].center[1],
              location: body.features[0].place_name
          })
      }
     })
  }
  module.exports = geocode
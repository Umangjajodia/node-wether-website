const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2341ef0e605581eff205f068291c774b&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + ''
    request({url , json:true},(error,{body})=>{
        if(error){
            console.log('Unable to connect to location',undefined)
        }else if(body.error){
            callback('permission denied',undefined)
        }else{
            callback(undefined, 'The weather description is ' + body.current.weather_descriptions[0] + ' . It is currently ' +body.current.temperature +' degrees out. It feels like '+ body.current.feelslike + ' degrees out and the humidity is '+ body.current.humidity)
        }
    })
}
module.exports= forecast


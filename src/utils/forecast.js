const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/10a0ad18d94e9142d9129e76d2887d56/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + ''
    request({url , json:true},(error,{body})=>{
        if(error){
            console.log('Unable to connect to location',undefined)
        }else if(body.error){
            callback('permission denied',undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' it is currently ' +body.currently.temperature+' degres out. There is a ' + body.currently.precipProbability + ' % chance of rain and the humidity is '+ body.daily.data[0].humidity)
        }
    })
}
module.exports= forecast
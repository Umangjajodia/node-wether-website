const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 
const port = process.env.PORT || 3000
//Define  paths or express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath ))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Umang Jajodia'
    })    //no need of extension'
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:  'About me',
        name: 'umang jajodia'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'This is some helpfull text',
        title: 'Help',
        name:' Umang Jajodia'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{ latitude,longitude,location }={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location ,
                address: req.query.address
            })
            
        })
    }) 
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Umang jajodia',
        errormessage: 'help page not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:' Umang',
        errormessage: 'page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port' + port)
}) 
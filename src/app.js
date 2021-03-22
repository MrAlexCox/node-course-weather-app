const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'MyNAme'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'TOMTOM'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpmessage: 'Help Im stuck'
    })
})


app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        }) 
    } else {

        const location = req.query.address;

        geocode(location, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            
            forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    
    })}})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        errorMessage: 'Please try a different page',
        name: 'Alex'
    })
})

app.get('*', (req, res) => {
    res.render('404',
        {
            title: '404 page not found',
            errorMessage: 'Please try a different page',
            name: 'Alex'
        })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
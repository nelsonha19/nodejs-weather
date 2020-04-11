const path = require('path')

const express = require('express');
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Heroku environment port
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'WeatherCheck',
        name: 'Nelson Ha'
    })
})

app.get('/docs', (req, res) => {
    res.render('docs', {
        title: 'Documentation',
        name: 'Nelson Ha',
        apis: "WeatherStack API, with MapBox API for geocoding",
        libraries: "Express for webserver. npm path for getting directory paths. npm hbs Handlebars for dynamic pages."
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Created as a test project with Node.js",
        title: "Help",
        name: 'Nelson Ha'
    })
})

// weather page
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must enter an address",
        })
    }


    geocode(req.query.address, (error, data) =>{
        if(error) {
            return res.send({ error })
        }

        console.log(data)

        forecast(data.longitude, data.latitude, (error, data) => {
            if (error){
                return res.send({ error })
            } 
            
            res.send({
                weather: data,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    // console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nelson Ha',
        message: 'Help article not found'
    })
})

// 404 page, must come last
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Nelson Ha'
    })
})



// Start server
app.listen(port, () => {
    console.log("Server is up on port "+ port)
})
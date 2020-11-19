//Modules 
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
// Files 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define Paths for Express Config
const publicPathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // VIEWS 
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handlebars enginge and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static diretory to serve 
app.use(express.static(publicPathDir))
//----------------- START OF VIEW FILES ---------------
app.get('',(req,res)=>{ // rendering handlebar for dynamic rendering
    res.render('index', {
        title:"Weather",
        name: "Johnson Kow"
    }) 
})

app.get('/help', (req,res) =>{
    res.render('help',{
        helpText:'This is an example of help page',
        title:'Help',
        name:'Johnson Kow'

    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name:"Johnson Kow"
    })
})
//----------------- END OF VIEW FILES ---------------

//----------------- START OF API FILES ---------------
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "No address provided"
        })
    }
    
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){return res.send({error: "Unable to find location. Try another search!"})}
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){return console.log(error)}
            res.send({
                forecast: forecastData.weather_descriptions[0],
                feelsLike: forecastData.feelslike,
                windSpeed: forecastData.wind_speed,
                address: req.query.address,
                temperature: forecastData.temperature,
                location
            })
        })
    })
})

app.get('/products',(req,res)=>{ // Example of req.query() usage 
    console.log(req.query) // /products?search=game   output: {search: game}

    if(!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title:"404",
        errorMessage: "Help article not found",
        name:"Johnson Kow"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        errorMessage:"Page Not Found",
        name:"Johnson Kow"
    })
})

app.listen(port, ()=>{
    console.log('Server is up on PORT '+ port)
})

//Challenge 
// Goal : Set up Two New Routes √
// 1. Set up an about Route and render a page title
// 2. Set up a weather Route and render a page title 
// 3. Test your work 

// Goal: Update Routes √
// 1. Setup about route to render a title with HTML
// 2. Setup a weather route to send back JSON
//      -- Object with forecast and location strings
// 3. Test Work by visiting both in the browser 

// Goal: Create Two More HTML Files √
// 1. Create an html page for about with "About" title 
// 2. Create an html page for help with "Help" title 
// 3. Remove the old route handlers for both
// 4. Vist both in the browser 

// Goal: Create a template for help page √
// 1. Set up a help template to render a help message to the screen
// 2. Set up the help route and render the templage with an example message 
// 3. Visit the route in the browser and see your help message print

// Goal: Create a partial for the footer √
// 1.Set up the template for the footer partial "Created by some name"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages

// Goal: Create and render a 404 page with handlebars √
// 1. Setup the template to render the header and the footer 
// 2. Setup the template to render an error message in a paragraph
// 3. Render the method for both 404 routes
//    - Page not found
//    - Help article not found
// 4. Test your work. Visit /what and /help/units

// Goal: Update weather endpoints to accept address√
// 1. No address? Send back and error message
// 2. Address? Send back the static JSON
// 3. Test/Weather and /weather?address=philadelphia

// Goal: Wire up /weather √
// 1. require geocod and forecast into app.js
// 2. use address to geocode
// 3. use the coordinates to get forecast 
// 4. send back the real forecast and location

//Notes
// How to access query from a path √
//    Additional information passed along to the query can be accessed by res.query()
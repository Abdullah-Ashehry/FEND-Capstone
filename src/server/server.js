// Setup empty JS object to act as endpoint for all routes

let temp = {};
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
    // Require Express to run server and routes

const express = require('express')

// Start up an instance of app
const app = express();





app.use(express.static('dist'))
    /* Middleware*/
    //Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance

app.use(cors());
app.use(express.static('website'));
const port = 8000;



// Setup Server

const server = app.listen(port, listening);


// Initialize the main project folder


function listening() {
    console.log('Server Running');
    console.log(`Runnung on local host ${port}`);
}

app.get('/all', function(request, response) {
    response.send(projectData);
});

app.post('/addTrip', (req, res) => {
    console.log(req.body)
    temp = {
        country: req.body.country,
        city: req.body.city,
        departingDate: req.body.date,
        weather: req.body.weather,
        picture: req.body.picture
    };
    console.log(temp);
    res.send(temp);
})
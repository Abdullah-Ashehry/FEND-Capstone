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


app.post('/userInput', (request, response) => {
    console.log('serverPostUserInput')

    let data = request.body;
    let entry = {
        city = data.city,
        departureDate = data.departureDate,
        returnDate = data.returnDate,
        tripLength = data.tripLength
    }
    temp = entry;
    console.log(entry);
})

app.get('/getGeo', (request, response) => {
    console.log('getGeo')
    username = 'abady301'
    const url = `http://api.geonames.org/searchJSON?q=${temp.city}&maxRows=1&username=${username}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log('Data From Geo[0]')
            console.log(res.data)
            temp.lat = res.data.geonames[0].lat;
            temp.lng = res.data.geonames[0].lng;

            response.send(true);
        })
        .catch(error => {
            res.send(JSON.stringify({ error: error }));
        })
})



app.get('/getWeatherBit', (request, response) => {
    console.log('getWeatherBit');
    let data = request.body;
    latitude = data[latitude];
    longitude = data[longitude];
    const weatherBitApiKey = "f0e0fd1fc3af481aac136783ebbb1894";
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${temp.lat}&lon=${temp.lng}&key=${weatherBitApiKey}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(response => {
            const data = response.data[temp.duration]
            console.log(data)

            temp.maxTemp = data.max_temp;
            temp.minTemp = data.min_temp;

            res.send({ maxTemp: temp.MaxTemp, minTemp: temp.MinTemp });
        })
        .catch(error => {
            res.send(JSON.stringify({ error: "An error occured" }));
        })
})

app.get('/getPixabay', (request, response) => {
    console.log('getPixabay')
    const pixabayApiKey = "17890716-25481aa580131a2d454b71ece";
    const pixabayLink = `https://pixabay.com/api/?key=${pixabayApiKey}&?q=${city}`;
    console.log(pixabayLink);
    fetch(pixabayLink)
        .then(response => response.json())
        .then(response => {

            console.log(res.data.hits[0].pageURL);
            temp.image = res.data.hits[0].pageURL;
            res.send({ image: temp.image });

        })
        .catch(error => {
            res.send(JSON.stringify({ error: "An error has occured" }));
        })
})


app.post('/addTrip', (req, res) => {
    console.log(req.body)
    temp = {
        // country: req.body.country,
        city: req.body.city,
        departureDate: req.body.departureDate,
        returnDate: req.body.returnDate,
        tripLength: req.body.tripLength,
        minTemp: req.body.minTemp,
        maxTemp: req.body.maxTemp,
        image: req.body.image,
    };
    console.log(temp);
    res.send(temp);
})

app.get('/allTripData', function(request, response) {
    response.send(temp);
});
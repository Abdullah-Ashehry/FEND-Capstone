// Setup empty JS object to act as endpoint for all routes

let temp = {};
let trip = [];
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
    // Require Express to run server and routes

const express = require('express')

// Start up an instance of app
const app = express();
const fetch = require('node-fetch');

// Setup Trip Class

class Trip {
    constructor(country, city, departureDate, returnDate, tripLength, temprature, weatherDescription, image, countryFullName, countryCapital, countryCurrencey) {
        this.country = country;
        this.city = city;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.tripLength = tripLength;
        this.temprature = temprature;
        this.weatherDescription = weatherDescription;
        this.image = image;
        this.countryFullName = countryFullName;
        this.countryCapital = countryCapital;
        this.countryCurrencey = countryCurrencey;
    }
}




app.use(express.static('dist'))
    /* Middleware*/
    //Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Cors for cross origin allowance

app.use(cors());
app.use(express.static('website'));
const port = 8000;



// Setup Server

// const server = app.listen(port, listening);

const server = app.listen(8000, function() {
    console.log("Port is 8000");
});
module.exports = server;



// Initialize the main project folder


function listening() {
    console.log('Server Running');
    console.log(`Runnung on local host ${port}`);
}


app.post('/userInput', (request, response) => {
    console.log('serverPostUserInput')

    let data = request.body;
    temp.city = data.city;

    response.send(true)
})


app.get('/getGeo', (req, res) => {
    console.log('GET georaphics')
    username = 'abady301'
    const url = `http://api.geonames.org/postalCodeSearchJSON?placename=${temp.city}&maxRows=10&username=${username}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(response => {

            console.log('Data From GeoServer')
            console.log(response.postalCodes[0]);
            temp.Long = response.postalCodes[0].lng;
            console.log(temp.Long);
            temp.Lat = response.postalCodes[0].lat;
            console.log(temp.Lat);
            temp.country = response.postalCodes[0].countryCode;
            console.log(temp.country)

            res.send({
                country: temp.country
            });
        })
        .catch(error => {
            res.send(JSON.stringify({
                error: error
            }));
        })
});


app.get('/getWeatherBit', (req, res) => {
    console.log('GET weather');
    const weatherBitApiKey = "f0e0fd1fc3af481aac136783ebbb1894";
    const url = `https://api.weatherbit.io/v2.0/current?lat=${temp.Lat}&lon=${temp.Long}&key=${weatherBitApiKey}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(response => {
            const data = response.data;
            console.log(data)

            temp.temprature = data['0'].temp;
            console.log(temp.temprature)
            temp.weatherDescription = data['0'].weather.description;
            console.log(temp.weatherDescription)

            res.send({
                temprature: temp.temprature,
                weatherDescription: temp.weatherDescription
            });
        })
        .catch(error => {
            res.send(JSON.stringify({
                error: "An error occured"
            }));
        })
})



app.get('/getPixabay', (req, res) => {
    console.log('GET Image')
    const pixabayApiKey = "17890716-25481aa580131a2d454b71ece";
    const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${temp.city}&image_type=photo`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(response => {

            const result = response.hits[0].webformatURL;
            console.log(`Image result: ${result}`)
            temp.image = result;
            res.send({
                image: result
            });

        })
        .catch(error => {
            res.send(JSON.stringify({
                error: "An error has occured"
            }));
        })
})


app.get('/getCountryInfo', (req, res) => {
    console.log('GET Country Info')
    let countryEntry = temp.country
    console.log(countryEntry);
    const url = `https://restcountries.eu/rest/v2/alpha/${countryEntry}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(response => {

            temp.coutryFullName = response.name;
            console.log(temp.coutryFullName)
            temp.countryCapital = response.capital;
            console.log(temp.countryCapital);
            temp.countryCurrencey = response.currencies['0'].code;
            console.log(temp.countryCurrencey);
            res.send({
                countryFullName: temp.coutryFullName,
                countryCapital: temp.countryCapital,
                countryCurrencey: temp.countryCurrencey
            });

        })
        .catch(error => {
            res.send(JSON.stringify({
                error: "An error has occured"
            }));
        })
})

app.post('/addTrip', (req, res) => {
    console.log(req.body);
    try {
        // let trip = {
        let country = req.body.country;
        let city = req.body.city;
        let departureDate = req.body.departureDate;
        let returnDate = req.body.returnDate;
        let tripLength = req.body.tripLength;
        let temprature = req.body.temprature;
        let weatherDescription = req.body.weatherDescription;
        let image = req.body.image;
        let countryFullName = req.body.countryFullName;
        let countryCapital = req.body.countryCapital;
        let countryCurrencey = req.body.countryCurrencey;
        // };
        mainTrip = new Trip(country, city, departureDate, returnDate, tripLength, temprature, weatherDescription, image, countryFullName, countryCapital, countryCurrencey);
        trip.push(mainTrip)
        console.log(mainTrip);
        console.log(trip.length);
        res.send(true);
        // localStorage.setItem('tripData', trip)
    } catch (error) {
        console.log(error.message.json)
    }
})

app.get('/allTripData', function(request, response) {
    response.send(trip);
});
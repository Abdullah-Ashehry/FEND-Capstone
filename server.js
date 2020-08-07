// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');
const app = express();

// Start up an instance of app



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));
const port = 8000;

// Setup Server

const server = app.listen(port, listening);

function listening() {
    console.log('Server Running');
    console.log(`Runnung on local host ${port}`);
}

app.get('/all', function(request, response) {
    response.send(projectData);
});

app.post('/add', (req, res) => {
    console.log(req.body)
    projectData = {
        temp: req.body.temperature,
        date: req.body.date,
        userInput: req.body.userInput
    };
    console.log(projectData);
    res.send(projectData);
})
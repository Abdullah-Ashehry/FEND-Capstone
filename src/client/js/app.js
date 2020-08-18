// Pixabay API Setup

// Weatherbit API Setup
// Create a new date instance dynamically with JS


document.getElementById("save_trip").addEventListener("click", performAction);

async function performAction(event) {
    event.preventDefault();
    console.log('In Perform Action');

    const newCity = document.getElementById("city").value;
    console.log(newCity);
    const departure = document.getElementById("departure_date").value;
    let departureD = new Date(departure);
    let departureDate = departureD.getDate() + "-" + (departureD.getMonth() + 1) + "-" + departureD.getFullYear();
    console.log(departureD);
    console.log(departureDate);
    const returnD = document.getElementById("return_date").value;
    let returnDay = new Date(returnD);
    let returnDate = returnDay.getDate() + "-" + (returnDay.getMonth() + 1) + "-" + returnDay.getFullYear();
    console.log(returnDate);
    const tripLength = returnDay.getTime() - departureD.getTime();
    const daysLength = tripLength / (1000 * 60 * 60 * 24);
    console.log(daysLength);

    await postUserInput('http://localhost:8000/userInput', {
        city: newCity,
        departureDate: departureDate,
        returnDate: returnDate,
        daysLength: daysLength
    });
    console.log('afterpostUserInput')

    let country = await getGeo('http://localhost:8000/getGeo');
    console.log('after getGEO');
    console.log(country);

    const weatherData = await getWeather("http://localhost:8000/getWeatherBit");

    let temprature = weatherData.temprature;
    let weatherDescription = weatherData.weatherDescription;
    console.log(temprature);
    console.log(weatherDescription);

    const imgData = await getImage(`http://localhost:8000/getPixabay`);
    console.log(imgData);

    const countryInfo = await getCountryInfo('http://localhost:8000/getCountryInfo');
    console.log(countryInfo);
    let countryFullName = countryInfo.countryFullName;
    let countryCapital = countryInfo.countryCapital;
    let countryCurrencey = countryInfo.countryCurrencey;


    console.log("Before of PostTrip");
    await postTrip('http://localhost:8000/addTrip', {
        city: newCity,
        country: country,
        departureDate: departureDate,
        returnDate: returnDate,
        tripLength: daysLength,
        temprature: temprature,
        weatherDescription: weatherDescription,
        image: imgData,
        countryFullName: countryFullName,
        countryCapital: countryCapital,
        countryCurrencey: countryCurrencey
    });
    console.log('Before Create Card');
    createCard(newCity, country, departureDate, returnDate, daysLength, temprature, weatherDescription, imgData, countryFullName, countryCapital, countryCurrencey);

};

// UserInput to the server.
async function postUserInput(url, userInput) {
    console.log('inPostUserInput')

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
    });
}



// Posting the trip

async function postTrip(url, tripData) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripData)
    });
    console.log('Exiting postTrip');
}

// GeoLocationAPI

const getGeo = async(url) => {
    console.log('in GetGEO getting country');
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    try {
        const data = await res.json();
        console.log(`country is: ${data}`);
        return data;

    } catch (e) {
        console.log(e);
    }
}

// WeatherBitAPI

const getWeather = async(url) => {
    console.log('in getWeather');
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json:charset=utf-8'
        }
    });
    try {
        const data = await res.json();
        console.log(`weather response: ${data}`)
        return data;

    } catch (e) {
        console.log(e);
    }
}

// PixabayAPI

const getImage = async(url) => {
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    try {
        console.log('GetImageInTry');
        const data = await res.json();
        console.log('InGetImage');
        return data;
    } catch (e) {
        console.log(e);
    }
    console.log('ExitingGetImage')
}

// Coutnries API

const getCountryInfo = async(url) => {
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    try {
        console.log('InGetCountryInfo');
        const data = await res.json();
        console.log(`country response : ${data}`);
        return data;
    } catch (e) {
        console.log(e);
    }
    console.log('ExitingGetCountryInfo');
}

// Updating the UI by adding a card with all the information.

function createCard(city, country, departureDate, returnDate, daysLength, temprature, weatherDescription, imageData, countryFullName, countryCapital, countryCurrencey) {

    console.log('in Create Card');
    let container = document.createElement('div');
    container.classList.add('container');

    let card = document.createElement('div');
    card.classList.add('card');

    let card_header = document.createElement('h4');
    card_header.setAttribute("id", "card_header");
    card_header.innerHTML = `Your trip to :${city}, ${country.country}`;

    let card_date = document.createElement('p');
    card_date.setAttribute("id", "card_date");
    card_date.innerHTML = `- From ${departureDate}, until ${returnDate } and the length of the trip is : ${daysLength} days`;

    let card_weather = document.createElement('p');
    card_weather.setAttribute("id", "card_weather");
    card_weather.innerHTML = `- The weather is : ${weatherDescription} and the temprature will be : ${temprature}`;

    let country_info = document.createElement('p');
    country_info.setAttribute("id", "country_info");
    country_info.innerHTML = `- The Country information is: ` + "<br />" + `The country's full name is: ${countryFullName}` + "<br />" + `The country's capital : ${countryCapital}` + "<br />" + `The country's currency is : ${countryCurrencey}`;


    let image = document.createElement('img');
    image.setAttribute("id", "pixabay_image");
    image.setAttribute('src', imageData.image);

    console.log('going to add to HTML: ', container);
    // Add all elements into the container
    card.appendChild(card_header);
    card.appendChild(card_date);
    card.appendChild(card_weather);
    card.appendChild(country_info);
    card.appendChild(image);

    container.appendChild(card)
        // empty out the container and add container to card.
        // document.querySelector(".card").remove();
    document.querySelector('.box').appendChild(container);
    console.log('end of create card');
}

// OnRipple Effect

const onClick = (event) => {
    const button = event.target;

    const appendRipple = document.createElement("div");
    appendRipple.classList.add("ripple");

    const size = button.offsetWidth * 2 + "px";
    appendRipple.style.height = appendRipple.style.width = size;

    const x = event.clientX - button.offsetLeft - button.offsetWidth;
    const y = event.clientY - button.offsetTop - button.offsetWidth;

    appendRipple.style.left = x + "px";
    appendRipple.style.top = y + "px";

    button.appendChild(appendRipple);

    setTimeout(() => {
        button.removeChild(appendRipple);
    }, 600);
};

document.querySelectorAll(".btn-ripple").forEach((button) => {
    button.addEventListener("click", onClick);
});

// Display, Hide the container for adding new trips

document.getElementById("add_trip").addEventListener("click", function(event) {
    let container = document.getElementById("add_trip_info");
    console.log(container.classList);
    if (container.classList.contains('hide_class')) {
        container.style.display == 'display:none';
        container.classList.remove('hide_class')
    } else {
        container.classList.add('hide_class');
    }
});

export {
    onClick,
    performAction,
    createCard
}
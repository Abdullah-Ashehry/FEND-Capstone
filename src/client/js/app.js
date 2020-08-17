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
    let departureDate = new Date(departure);
    console.log(departureDate);
    const returnD = document.getElementById("return_date").value;
    let returnDate = new Date(returnD);
    console.log(returnDate);
    const tripLength = returnDate.getTime() - departureDate.getTime();
    const daysLength = tripLength / (1000 * 60 * 60 * 24);
    console.log(daysLength);

    await postUserInput('userInput', {
        city: newCity,
        departureDate: departureDate,
        returnDate: returnDate,
        daysLength: daysLength
    });
    console.log('afterpostUserInput')

    let country = await getGeo('getGeo');
    console.log('after getGEO');
    console.log(country);

    const weatherData = await getWeather("getWeatherBit");
    // let minTemp = weatherData[minTemp];
    // console.log(minTemp);
    let temprature = weatherData.temprature;
    let weatherDescription = weatherData.weatherDescription;
    console.log(temprature);
    console.log(weatherDescription);

    const imgData = await getImage(`getPixabay`);
    console.log(imgData);
    let image = imgData;

    await postTrip('addTrip', {
        city: newCity,
        country: country,
        departureDate: departureDate,
        returnDate: returnDate,
        tripLength: daysLength,
        temprature: temprature,
        weatherDescription: weatherDescription,
        image: imgData
    });
    console.log('Before Create Card');
    createCard(newCity, country, departureDate, returnDate, daysLength, temprature, weatherDescription, image);

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
        const data = await res.json();
        console.log(`ImageData: ${data}`);
        return data;
    } catch (e) {
        console.log(e);
    }
}

// Updating the UI by adding a card with all the information.

function createCard(city, country, departureDate, returnDate, daysLength, temprature, weatherDescription, imageData) {
    console.log('in Create Card');
    let container = document.createElement('div');
    container.classList.add('container');

    let card = document.createElement('div');
    card.classList.add('card');

    let card_header = document.createElement('h4');
    card_header.setAttribute("id", "card_header");
    card_header.innerHTML = `${city}, ${country}`;

    let image = document.createElement('img');
    image.setAttribute("id", "pixabay_image");
    image.setAttribute('src', imageData);

    let card_title = document.createElement('h2');
    card_title.setAttribute("id", "card_title");
    card_title.innerHTML = `From ${departureDate}, until ${returnDate } and the length of the trip is : ${daysLength}`;

    let card_weather = document.createElement('p');
    card_weather.setAttribute("id", "card_weather");
    card_weather.innerHTML = `The weather is : ${weatherDescription} and the temprature will be : ${temprature}`;

    // document.querySelector(".card").innerHTML = container;
    document.querySelector(".card").appendChild(container);
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
    onClick
}
export {
    performAction
}
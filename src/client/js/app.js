// Pixabay API Setup

// Weatherbit API Setup
// Create a new date instance dynamically with JS


document.getElementById("save_trip").addEventListener("click", performAction);

async function performAction(event) {
    event.preventDefault();
    console.log('In Perform Action');

    const newCity = document.getElementById("city").value;
    const departure = document.getElementById("departure_date").value;
    let departureDate = new Date(departure);
    const returnD = document.getElementById("return_date").value;
    let returnDate = new Date(returnD);
    const tripLength = returnDate.getTime() - departureDate.getTime();
    const daysLength = tripLength / (1000 * 60 * 60 * 24);


    const coordiantesData = await getGeo('http://localhost:8080/getGeo');
    const weatherData = await getWeather(`http://localhost:8080/getWeatherBit`, coordiantesData);
    let minTemp = weatherData[minTemp];
    let maxTemp = weatherData[maxTemp];
    const imgData = await getImage(`http://localhost:8080/getPixabay`);
    let image = imgData;
    await postTrip('http://localhost:8080/addTrip', {
        city: newCity,
        departureDate: departureDate,
        returnDate: returnDate,
        tripLength: daysLength,
        minTemp: minTemp,
        maxTemp: maxTemp,
        image: imgData
    });
    createCard(newCity, departureDate, returnDate, daysLength, minTemp, maxTemp, image)

};

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
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    try {
        const data = await res.json();
        return;

    } catch (e) {
        console.log(e);
    }
}

// WeatherBitAPI

const getWeather = async(url, coordiantesData) => {
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json:charset=utf-8'
        },
        body: {
            json: JSON.stringify(coordiantesData)
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

function createCard(city, departureDate, returnDate, daysLength, minTemp, maxTemp, image) {
    container = document.createElement('div').classList.add('container');
    card = document.createElement('div').classList.add('card');
    card_header = document.createElement('h4').id('card_header');
    card_header.innerHTML = `${city}`;
    image = document.createElement('img').id('pixabay_image');
    image.setAttribute('src', image);
    card_title = document.createElement('h2').id('card_title');
    card_title.innerHTML = `From ${departureDate}, until ${returnDate } and the length of the trip is : ${daysLength}`;
    card_weather = document.createElement('p').id('card_weather');
    card_weather.innerHTML = `The minimum temprature is : ${minTemp} and the maximum temprature will be : ${maxTemp}`;
    document.querySelector(".card").innerHTML = container;
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

export { onClick }
export { performAction }
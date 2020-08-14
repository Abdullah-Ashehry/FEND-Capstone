// Pixabay API Setup

// Weatherbit API Setup
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("save_trip").addEventListener("click", performAction);

function performAction(e) {
    const newCity = document.getElementById("city").value;
    const userName = "abady301";
    getDataFromGeoNames(userName, newCity);
    console
        .log(getDataFromGeoNames)
        .then(getWeatherFromWeatherbit(lat, lng))
        .then(getPicFromPixabay(newCity))
        .then(function(data) {
            postData("/add", {});
        });
}

// GeoNames API

const getDataFromGeoNames = async(username, city) => {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    try {
        return await axios.get(url).then((res) => {
            return {
                lat: res.data.geonames[0].lat,
                lng: res.data.geonames[0].lng,
                countryName: res.data.geoname[0].countryName,
            };
        });
    } catch (e) {
        console.log(e);
    }
};

// WeatherBit API

const getWeatherFromWeatherbit = async(latitude, longitude) => {
    const weatherBitApiKey = "f0e0fd1fc3af481aac136783ebbb1894";
    const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weatherBitApiKey}`;
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(res.data.temp);
        return res.data.temp;
    } catch (e) {
        console.log(e);
    }
};

// Pixabay API

const getPicFromPixabay = async(city) => {
    const pixabayApiKey = "17890716-25481aa580131a2d454b71ece";
    const pixabayLink = `https://pixabay.com/api/?key=${pixabayApiKey}&?q=${city}`;
    const res = await fetch(pixabayLink)
    try {
        const data = await res.json();
        console.log(res.data.hits[0].pageURL);
        return res.data.hits[0].pageURL;
    } catch (e) {
        console.log(e);
    }
};

// Sending Data to be saved 

const postData = async(url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Work in progress

const updateUI = async() => {
    const req = await fetch("all");
    try {
        const projectData = await req.json();
        console.log(projectData);
        document.getElementById("temp").innerHTML = projectData.temp;
        document.getElementById("date").innerHTML = projectData.date;
        document.getElementById("content").innerHTML = projectData.userInput;
        console.log("updateUI");
    } catch (error) {
        console.log("error", error);
    }
};

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

function showTrip(e) {
    const container = document.getElementById("add_trip_info");
    if (container.style.display === "none") {
        container.remove.style.display;
    } else {
        container.style.display = "none";
    }
}

document.getElementById("add_trip").addEventListener("click", showTrip());

// Exporting Functions

export { showTrip };
export { onClick }
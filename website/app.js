/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=aed012664aaa477a8a4bb8013206d222&units=metric";

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZipCode = document.getElementById('zip').value;
    getWeather(baseURL, newZipCode, apiKey)
        .then(function(data) {
            const userResponse = document.getElementById('feelings').value;
            postData('/add', { temperature: data.main.temp, date: newDate, userInput: userResponse })
                .then(updateUI());
        })

};

const getWeather = async(baseURL, newZipCode, apiKey) => {
    link = baseURL + newZipCode + apiKey;
    console.log(link);
    const res = await fetch(link)

    try {

        const data = await res.json();
        console.log(data)
        return data;

    } catch (error) {
        console.log("error", error);
    }
}

const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async() => {

    const req = await fetch('all');
    try {
        const projectData = await req.json();
        console.log(projectData);
        document.getElementById('temp').innerHTML = projectData.temp;
        document.getElementById('date').innerHTML = projectData.date;
        document.getElementById('content').innerHTML = projectData.userInput;
        console.log('updateUI')
    } catch (error) {
        console.log('error', error);
    }
}
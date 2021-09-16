const api = {
    key: "5ad07154c8a1da2f9129514fb0a28ca8",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
console.log(search)
const btn = document.querySelector(".btn");
btn.addEventListener('click', getInput);

function getInput(event) {
    event.preventDefault();
    if (event.type == 'click') {
        getData(search.value);
        console.log(search.value);
    }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=metrics&appid=${api.key}`)
        .then(res => {
            return res.json();
        })
        .then(displayData);
}

function displayData(res) {
    if (res.cod === "404") {
        const error = document.querySelector(".error")
        error.textContent = "Please enter a valid city"
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${res.name}, ${res.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(res.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${res.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(res.main.temp_min)}°C / ${Math.round(res.main.temp_max)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + res.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction(d) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;

}
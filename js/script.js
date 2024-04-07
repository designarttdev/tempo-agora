// 540e857dc6f17a69b6c8ab9d0e0c41c9 -- minha
// ba605efc18f1572f61892fe426f18a1a -- do curso
// link da api JSON https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=540e857dc6f17a69b6c8ab9d0e0c41c9
// link da api https://openweathermap.org/weather-conditions
// link da api flags para bandeiras dos países https://flagsapi.com/#quick

// Variáveis e seleções de elementos
const apiKey = "540e857dc6f17a69b6c8ab9d0e0c41c9";
const apiCountryURL = "https://flagsapi.com/BR/shiny/64.png";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

// Funções 
const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    return (data);

};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute(
        "src",
        `https://flagsapi.com/${data.sys.country}/shiny/64.png`
    );
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};


// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
})
import "./style.css";
import { getWeather, processWeatherData, displayWeather } from "./weather.js";

const weatherForm = document.querySelector("#weatherForm");
const locationInput = document.querySelector("#location");
const locationHeader = document.querySelector("#locationHeader");

let currentWeather = null;

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const location = locationInput.value;
        const weatherData = await getWeather(location);
        console.log("Weather data:", weatherData);
        currentWeather = processWeatherData(weatherData);
        displayWeather(currentWeather);

    } catch (error) {
        console.error("Could not load weather:", error)
    }
});
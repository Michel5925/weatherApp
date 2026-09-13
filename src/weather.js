import sunny from "./images/sunny.jpg";
import cloudy from "./images/cloudy.jpg";
import rainy from "./images/rainy.jpg";
import snowy from "./images/snowy.jpg";
import stormy from "./images/stormy.jpg";
import foggy from "./images/foggy.jpg";

import sunnyGif from "./images/sunny.gif";
import cloudyGif from "./images/cloudy.gif";
import rainyGif from "./images/rainy.gif";
import snowyGif from "./images/snowy.gif";
import stormyGif from "./images/stormy.gif";
import foggyGif from "./images/foggy.gif";

export async function getWeather(location) {
    try 
    {
        const response = await fetch(`/api/weather/${encodeURIComponent(location)}`);

        if(!response.ok)
        {
            throw new Error("Could not get weather data");
        }

        const weatherData = await response.json();

        return weatherData;
    } 
    
    catch (error) 
    {
        console.error("Error:", error);
        throw error;
    }
}

export function processWeatherData(data) {
    return {
        location: data.resolvedAddress,
        temperature: data.days[0].temp,
        maxtemp: data.days[0].tempmax,
        mintemp: data.days[0].tempmin,
        feelsLike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        description: data.description,
        icon: data.currentConditions.icon,
        windSpeed: data.currentConditions.windspeed
    };
}

let isCelsius = false;
let currentWeather = null;
const unitToggle = document.querySelector("#unitToggle");

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

export function displayWeather(weather) {

    currentWeather = weather;
    changeBackground(weather.icon);
    
    const weatherDisplay = document.querySelector("#weatherDisplay");

    weatherDisplay.textContent = "";

    const container = document.createElement("div");
    container.setAttribute("id", "container");
    weatherDisplay.appendChild(container);

    const location = document.createElement("h2");
    location.textContent = weather.location;
    container.appendChild(location);

    const temperatureValue = isCelsius ? fahrenheitToCelsius(weather.temperature) : weather.temperature;

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${temperatureValue.toFixed(1)} °${isCelsius ? "C" : "F"}`;
    container.appendChild(temperature);

    const maxTemperatureValue = isCelsius ? fahrenheitToCelsius(weather.maxtemp) : weather.maxtemp;

    const maxTemperature = document.createElement("p");
    maxTemperature.textContent = `Maximum Temperature of: ${maxTemperatureValue.toFixed(1)} °${isCelsius ? "C" : "F"}`;
    container.appendChild(maxTemperature);

    const minTemperatureValue = isCelsius ? fahrenheitToCelsius(weather.mintemp) : weather.mintemp;

    const minTemperature = document.createElement("p");
    minTemperature.textContent = `Minimum Temperature of: ${minTemperatureValue.toFixed(1)} °${isCelsius ? "C" : "F"}`;
    container.appendChild(minTemperature);

    const weatherGif = document.createElement("img");

    weatherGif.src = getWeatherGif(weather.icon);
    weatherGif.alt = weather.description;
    weatherGif.classList.add("weatherGif");
    container.appendChild(weatherGif);

    const description = document.createElement("p");
    description.textContent = weather.description;
    container.appendChild(description);

    const feelsLikeValue = isCelsius ? fahrenheitToCelsius(weather.feelsLike) : weather.feelsLike;

    const feelsLike = document.createElement("p");
    feelsLike.textContent = `Feels like: ${feelsLikeValue.toFixed(1)} °${isCelsius ? "C" : "F"}`;
    container.appendChild(feelsLike);

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${weather.humidity}%`;
    container.appendChild(humidity);

    const wind = document.createElement("p");
    wind.textContent = `Wind: ${weather.windSpeed} km/h`;
    container.appendChild(wind);
}

unitToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;

    if(currentWeather)
    {
        displayWeather(currentWeather);
    }

    unitToggle.textContent = isCelsius ? "Switch to °F" : "Switch to °C";
});

function changeBackground(icon) {
    const body = document.body;

    if (icon === "clear-day" || icon === "clear-night") {
        body.style.backgroundImage = `url(${sunny})`;
    }

    else if (icon === "cloudy" || icon === "partly-cloudy-day" || icon === "partly-cloudy-night") {
        body.style.backgroundImage = `url(${cloudy})`;
    }

    else if (icon.includes("rain")) {
        body.style.backgroundImage = `url(${rainy})`;
    }

    else if (icon.includes("snow")) {
        body.style.backgroundImage = `url(${snowy})`;
    }

    else if (icon.includes("thunder")) {
        body.style.backgroundImage = `url(${stormy})`;
    }

    else if (icon === "fog") {
        body.style.backgroundImage = `url(${foggy})`;
    }
}

function getWeatherGif(icon) {
    if (icon === "clear-day" || icon === "clear-night") {
        return sunnyGif;
    }

    if (
        icon === "cloudy" ||
        icon === "partly-cloudy-day" ||
        icon === "partly-cloudy-night"
    ) {
        return cloudyGif;
    }

    if (icon.includes("rain")) {
        return rainyGif;
    }

    if (icon.includes("snow")) {
        return snowyGif;
    }

    if (icon.includes("thunder")) {
        return stormyGif;
    }

    if (icon === "fog") {
        return foggyGif;
    }

    return cloudyGif; // default
}
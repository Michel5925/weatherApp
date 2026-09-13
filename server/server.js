import express from "express";
import dotenv from "dotenv";

dotenv.config();
console.log("API key loaded:", !!process.env.WEATHER_API_KEY);

const app = express();
const PORT = 3000;

app.get("/api/weather/:location", async (req, res) => {
    try {
        const location = encodeURIComponent(req.params.location);

        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.WEATHER_API_KEY}`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                message: "Could not get weather data"
            });
        }

        const weatherData = await response.json();

        res.json(weatherData);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
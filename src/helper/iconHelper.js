import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun } from "lucide-react";

// Function to map weather condition to Lucide icon
const getWeatherIcon = (weather) => {
    switch (weather) {
        case "Clear":
            return <Sun className="forecast-icon" />;
        case "Clouds":
            return <Cloud className="forecast-icon" />;
        case "Rain":
            return <CloudRain className="forecast-icon" />;
        case "Snow":
            return <CloudSnow className="forecast-icon" />;
        case "Drizzle":
            return <CloudDrizzle className="forecast-icon" />;
        default:
            return <Cloud className="forecast-icon" />; // Default to Cloud icon
    }
};

export { getWeatherIcon };

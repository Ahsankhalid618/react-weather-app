import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun } from "lucide-react";

// Function to map weather condition to Lucide icon
const getWeatherIcon = (weather = "Rain", props) => {
    // console.log(...props);
    switch (weather) {
        case "Clear":
            return <Sun className="forecast-icon" {...props} />;
        case "Clouds":
            return <Cloud className="forecast-icon" {...props} />;
        case "Rain":
            return <CloudRain className="forecast-icon" {...props} />;
        case "Snow":
            return <CloudSnow className="forecast-icon" {...props} />;
        case "Drizzle":
            return <CloudDrizzle className="forecast-icon" {...props} />;
        default:
            return <Cloud className="forecast-icon" {...props} />; // Default to Cloud icon
    }
};

export { getWeatherIcon };

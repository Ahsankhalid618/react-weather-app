import {
    Droplets,
    Sunrise,
    Sunset,
    ThermometerSnowflake,
    ThermometerSun,
    Wind,
} from "lucide-react";
import moment from "moment";
import Graph from "./Graph";

function WeatherCard({ data }) {
    return (
        <div className="weather-card">
            <div className="weather-card-grid">
                <div className="city-info">
                    <h1 className="city-name">{data.city.name}</h1>
                    <p className="date">
                        {moment
                            .utc(new Date().setTime(data.list[0].dt * 1000))
                            .add(data.city.timezone, "seconds")
                            .format("dddd, MMMM Do YYYY")}
                    </p>
                </div>
                <div className="graph-container">
                    <Graph data={data.list} />
                </div>

                <div className="current-weather">
                    <div className="weather-main">
                        <div className="weather-display">
                            <img
                                src={`./icons/${data.list[0].weather[0].icon}.svg`}
                                alt="weather"
                                className="weather-icon"
                            />
                            <div className="temperature-container">
                                <h2 className="temperature">
                                    {data.list[0].main.temp.toFixed(1)}°C
                                </h2>
                                <p className="weather-description">
                                    {data.list[0].weather[0].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weather Details Grid */}
            <div className="weather-details">
                {[
                    {
                        icon: (
                            <ThermometerSun className="detail-icon high-temp" />
                        ),
                        label: "High",
                        value: `${data.list[0].main.temp_max.toFixed(1)}°C`,
                    },
                    {
                        icon: (
                            <ThermometerSnowflake className="detail-icon low-temp" />
                        ),
                        label: "Low",
                        value: `${data.list[0].main.temp_min.toFixed(1)}°C`,
                    },
                    {
                        icon: <Wind className="detail-icon wind" />,
                        label: "Wind",
                        value: `${data.list[0].wind.speed.toFixed(1)} km/h`,
                    },
                    {
                        icon: <Droplets className="detail-icon humidity" />,
                        label: "Humidity",
                        value: `${data.list[0].main.humidity}%`,
                    },
                    {
                        icon: <Sunrise className="detail-icon sunrise" />,
                        label: "Sunrise",
                        value: moment
                            .utc(data.city.sunrise, "X")
                            .add(data.city.timezone, "seconds")
                            .format("h:mm a"),
                    },
                    {
                        icon: <Sunset className="detail-icon sunset" />,
                        label: "Sunset",
                        value: moment
                            .utc(data.city.sunset, "X")
                            .add(data.city.timezone, "seconds")
                            .format("h:mm a"),
                    },
                ].map((item, index) => (
                    <div key={index} className="detail-card">
                        <div className="detail-header">
                            {item.icon}
                            <span className="detail-label">{item.label}</span>
                        </div>
                        <div className="detail-value">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherCard;

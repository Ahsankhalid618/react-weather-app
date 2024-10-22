import React, { useState, useEffect } from "react";
import {
  Sun,
  Cloud,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  ThermometerSun,
  ThermometerSnowflake,
  Search,
  Moon,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
} from "lucide-react";
import moment from "moment";
import "../Componentstyle/Main.css";

const Maindata = ({ city = "london", setBackgroundImageURL }) => {
  const [data, setData] = useState();
  /* eslint-disable-next-line no-unused-vars */
  const [cityvalid, setCityvalid] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchValue, setSearchValue] = useState(city); // State for search input

  const Dweather = async (cityName) => {
    const key = "24f4cabc9b1a10af6e3eeb4cc150a9ef";
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric&formatted=0`
    )
      .then((response) => response.json())
      .then((actualData) => {
        if (actualData.city) {
          setCityvalid(true);
          setData(actualData);
        } else {
          setCityvalid(false);
        }
      });
  };

  useEffect(() => {
    Dweather(city); // Fetch weather data on component mount or city change
  }, [city]);

  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  setBackgroundImageURL(data.list[0].weather[0].icon); // Set the background image based on weather icon

  const handleSearch = () => {
    Dweather(searchValue); // Fetch new data when search icon is clicked
  };

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

  return (
    <div className="weather-container">
      <div className="main-content">
        {/* Header Controls */}
        <div className="header-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search location..."
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} // Update search input value
            />
            <Search className="search-icon" onClick={handleSearch} /> {/* Trigger search */}
          </div>
          <button onClick={() => setIsDark(!isDark)} className="theme-toggle">
            {isDark ? (
              <Sun className="sun-icon" size={24} />
            ) : (
              <Moon className="moon-icon" size={24} />
            )}
          </button>
        </div>

        {/* Main Weather Card */}
        <div className="weather-card">
          <div className="city-info">
            <h1 className="city-name">{data.city.name}</h1>
            <p className="date">
              {moment
                .utc(new Date().setTime(data.list[0].dt * 1000))
                .add(data.city.timezone, "seconds")
                .format("dddd, MMMM Do YYYY")}
            </p>
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

          {/* Weather Details Grid */}
          <div className="weather-details">
            {[
              {
                icon: <ThermometerSun className="detail-icon high-temp" />,
                label: "High",
                value: `${data.list[0].main.temp_max.toFixed(1)}°C`,
              },
              {
                icon: <ThermometerSnowflake className="detail-icon low-temp" />,
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

        {/* 5-Day Forecast */}
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-grid">
          {[7, 15, 23, 31, 39].map((index) => (
            <div key={index} className="forecast-card">
              <h4 className="forecast-day">
                {moment(new Date().setTime(data.list[index].dt * 1000)).format(
                  "ddd"
                )}
              </h4>
              {/* Use Lucide icon for weather forecast */}
              {getWeatherIcon(data.list[index].weather[0].main)}
              <div className="forecast-details">
                <div className="forecast-temp">
                  {data.list[index].main.temp.toFixed(1)}°C
                </div>
                <div className="forecast-feels-like">
                  Feels like {data.list[index].main.feels_like.toFixed(1)}°C
                </div>
                <div className="forecast-humidity">
                  Humidity {data.list[index].main.humidity}%
                </div>
                <div className="forecast-condition">
                  {data.list[index].weather[0].main}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maindata;

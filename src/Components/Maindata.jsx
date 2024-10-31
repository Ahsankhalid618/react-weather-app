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
  const [aqiData, setAqiData] = useState(); // State for AQI data
  const [cityvalid, setCityvalid] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(city);

  const Dweather = async (cityName) => {
    const key = process.env.REACT_APP_API_KEY;
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric&formatted=0`
    )
      .then((response) => response.json())
      .then(async (actualData) => {
        if (actualData.city) {
          setCityvalid(true);
          setData(actualData);
          await fetchAqiData(actualData.city.coord.lat, actualData.city.coord.lon);
        } else {
          setCityvalid(false);
        }
      });
  };

  const fetchAqiData = async (lat, lon) => {
    const key = process.env.REACT_APP_AQI_API_KEY; // Your AQI API key
    await fetch(
      `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${key}`
    )
      .then((response) => response.json())
      .then((aqiData) => {
        setAqiData(aqiData);
      });
  };

  useEffect(() => {
    Dweather(city);
    setSearchValue(city);
  }, [city]);

  useEffect(() => {
    setBackgroundImageURL(data?.list[0].weather[0].icon);
  }, [data, setBackgroundImageURL]);

  if (!data || !aqiData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  const handleSearch = async () => {
    setLoading(true);
    await Dweather(searchValue);
    setLoading(false);
  };

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
        return <Cloud className="forecast-icon" />;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const aqiLevel = aqiData.list[0].main.aqi; // AQI value
  const aqiDescription = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqiLevel - 1];

  return (
    <div className="weather-container">
      <div className="main-content">
        <div className="header-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search location..."
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="search-controls">
              {loading && <div className="searchLoader"></div>}
              <Search className="search-icon" onClick={handleSearch} />
            </div>
          </div>
          <button onClick={() => setIsDark(!isDark)} className="theme-toggle">
            {isDark ? <Sun className="sun-icon" size={24} /> : <Moon className="moon-icon" size={24} />}
          </button>
        </div>

        <div className="weather-card">
          <div className="city-info">
            <h1 className="city-name">{data.city.name}</h1>
            <p className="date">
              {moment.utc(new Date().setTime(data.list[0].dt * 1000)).add(data.city.timezone, "seconds").format("dddd, MMMM Do YYYY")}
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
            {/* Other weather details... */}
            <div className="detail-card">
              <div className="detail-header">
                <Droplets className="detail-icon aqi" />
                <span className="detail-label">AQI</span>
              </div>
              <div className="detail-value">{aqiDescription} ({aqiLevel})</div>
            </div>
            {/* Other weather details... */}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-grid">
          {[7, 15, 23, 31, 39].map((index) => (
            <div key={index} className="forecast-card">
              <h4 className="forecast-day">
                {moment(new Date().setTime(data.list[index].dt * 1000)).format("ddd")}
              </h4>
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
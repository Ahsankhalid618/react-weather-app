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
  Heart
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
  const [state, setState] = useState("");

  const getCoordinates = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
    const data = await response.json();
    if (data.coord) {
      return { lat: data.coord.lat, lon: data.coord.lon };
    } else {
      throw new Error('City not found');
    }
  };

  const Dweather = async (cityName) => {
    try {
      const { lat, lon } = await getCoordinates(cityName);
      const key = process.env.REACT_APP_API_KEY;

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
      );
      const actualData = await weatherResponse.json();

      if (actualData.city) {
        setCityvalid(true);
        setData(actualData);
        await fetchAqiData(lat, lon); // Use the coordinates here
      } else {
        setCityvalid(false);
      }
    } catch (error) {
      console.error(error);
      setCityvalid(false);
    }
  };
  
  const fetchAqiData = async (lat, lon) => {
    const key = process.env.REACT_APP_AQI_API_KEY; // Your AQI API key
    const response = await fetch(
      `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${key}`
    );
    const aqiData = await response.json();
    console.log(aqiData);
    if (aqiData.status === "success") {
      setAqiData(aqiData.data);
    } else {
      console.error("Failed to fetch AQI data", aqiData);
    }
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

  const aqiLevel = aqiData.current.pollution.aqius; // Adjusted for AirVisual response
  const aqiDescription = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][
    aqiLevel >= 0 && aqiLevel <= 50 ? 0 :
    aqiLevel > 50 && aqiLevel <= 100 ? 1 :
    aqiLevel > 100 && aqiLevel <= 150 ? 2 :
    aqiLevel > 150 && aqiLevel <= 200 ? 3 :
    4
  ]; // Adjusted index based on AQI levels

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
            {isDark ? (<Sun className="sun-icon" size={24} />) : (<Moon className="moon-icon" size={24} />)}
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
            {
              icon: <Heart className="detail-icon aqi" />, // Use a suitable icon for AQI
              label: "AQI",
              value: `${aqiDescription} (${aqiLevel})`, // Display AQI level and description
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
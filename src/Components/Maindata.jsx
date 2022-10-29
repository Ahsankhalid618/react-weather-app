import React, { useState, useEffect } from "react";
import "../Componentstyle/Main.css";
export default function Maindata() {
  const [data, setData] = useState(null);

  let weather = async () => {
    const key = "1ab6ef20384db1d7d9d205d609f7eef0";
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=${key}&units=metric&formatted=0`
    )
      .then((response) => response.json())
      .then((actualData) => setData(actualData));
  };
  useEffect(() => {
    weather();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const link = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  return (
    <div className="maindata">
      <div className="city">{data.name}</div>
      <div className="temp">{data.main.temp} C</div>
      <div className="icon">
        <img src={link} alt="not found" />{" "}
      </div>
      <div className="feel">feels Like {data.main.feels_like} C</div>
      <div className="wind">Wind {data.wind.speed} Km/hr</div>
      <div className="cloudy">{data.weather[0].main}</div>
      <div className="humidity">humidity {data.main.humidity}%</div>
      <div className="sunrise">
        sunrise :- {new Date(data.sys.sunrise * 1000).toUTCString()}{" "}
      </div>
      <div className="sunset">
        sunset :- {new Date(data.sys.sunset * 1000).toUTCString()}
      </div>
    </div>
  );
}

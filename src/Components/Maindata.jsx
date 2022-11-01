import React, { useState, useEffect } from "react";
import "../Componentstyle/Main.css";
export default function Maindata({ city = "mansehra" }) {
  const [data, setData] = useState();
  const [cityValid, setCityValid] = useState(false);
  const weather = async (city) => {
    const key = "1ab6ef20384db1d7d9d205d609f7eef0";

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&formatted=0`
    )
      .then((response) => response.json())
      .then((actualData) => {
        if (actualData.weather) {
          setCityValid(true);
          setData(actualData)
        } else {
          setCityValid(false);
        }
      });
  };
  useEffect(() => {
    weather(city);
  }, [city]);

  if (!data) {
    return <div>Loading...</div>;
  }
  if (!data.weather) {
    return <div>City "{city}" not recognized</div>;
  }

  const link = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  return (
    <>
   
    <div className="maindata">
        {/* {!cityValid && <span>City "{city}" not found</span>} */}
        <div className="city">{data.name}</div>
        <div className="temp">{data.main.temp.toFixed()} C</div>
        <div className="icon">
          <img src={link} alt="not found" />{" "}
        </div>
        <div className="feel">feels Like {data.main.feels_like.toFixed()} C</div>
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
    
      
    </>
  );
}
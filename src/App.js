import React, { useEffect, useState } from "react";
import "./App.css";
import Maindata from "./Components/Maindata";
/* eslint-disable-next-line no-unused-vars */
import Search from "./Components/Search";
import { ThemeProvider } from "./Components/ThemeContext.jsx";
import ThemeToggle from "./Components/ThemeToggle.jsx";

function App() {
  /* eslint-disable-next-line no-unused-vars */
  const [location, setLocation] = useState();
  const [backgroundImageURL, setBackgroundImageURL] = useState("01n");

  const handle = (e) => {
    setBackgroundImageURL(e);
  };

  useEffect(() => {
    async function getCity(position) {

      // get your API KEY: https://my.locationiq.com/dashboard/?firstLogin=1#accesstoken

      const GEOLOCATION_API_KEY = "pk.8a5c18c4b30439387c76d708aa36784b";
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${GEOLOCATION_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
      );
      const json = await response.json();
      setLocation(json?.address?.city)
    }


    navigator.geolocation.getCurrentPosition(getCity);
  }, []);

  return (
    <ThemeProvider>
      <div
        className="mainpage"
        style={{
          backgroundImage: `url("./pics/${backgroundImageURL}.jpg")`,
          backgroundSize: "cover",
        }}
      >
        {/* <div className="searchComp">
          <Search {...{ location, setLocation }} />
        </div> */}
        <ThemeToggle />
        <Maindata city={location} setBackgroundImageURL={handle} />
      </div>
    </ThemeProvider>
  );
}

export default App;

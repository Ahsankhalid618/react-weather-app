import React, { useState } from "react";
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

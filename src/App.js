import React, { useState } from "react";
import "./App.css";
import Maindata from "./Components/Maindata";
import Search from "./Components/Search";

function App() {
  const [location, setLocation] = useState();
  const [backgroundImageURL, setBackgroundImageURL] = useState("01n");

  const handle = (e)=>{
    setBackgroundImageURL(e);
  }
  
  return (
    <div className="mainpage"
    style={{
      backgroundImage: `url("./pics/${backgroundImageURL}.jpg")`,
      backgroundSize: "cover",
    }}
    >
      <div className="searchComp">
        <Search {...{ location, setLocation }} />
      </div>
      
        <Maindata city={location} setBackgroundImageURL={handle} />

    </div>
  );
}

export default App;

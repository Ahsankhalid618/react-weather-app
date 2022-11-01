import React, {useState} from "react";
import "./App.css";
import Maindata from "./Components/Maindata";
import Search from "./Components/Search";

// import Time from "./Components/Time";

function App() {
  const [location, setLocation] = useState();

  return (
    <div className="mainpage">
      <div className="searchComp">
        <Search {...{ location, setLocation }} />
      </div>
      <div className="details">
        <Maindata city={location} />
      </div>
    </div>
  );
}

export default App;

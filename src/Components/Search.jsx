import React, { useState } from "react";
import "../Componentstyle/search.css";

export default function Search({ setLocation }) {
  const [city, setCity] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    setLocation(city);
    
  };

  return (
    <div className="main">
      <nav className="istclass">
        <form className="form" onSubmit={handlesubmit}>
          <div className="search">
            <input
              value={city}
              placeholder="search city"
              className="searchbox"
              onChange={(e) => setCity(e.target.value)}
            />

            <button className="nd" type="button" onClick={handlesubmit}>
              Submit
            </button>
          </div>
        </form>
      </nav>
    </div>
  );
}

import React, { useState } from "react";
import "../Componentstyle/search.css";

export default function Search({ setLocation }) {
  const [city, setCity] = useState("");


  const handlesubmit = (e) => {
    e.preventDefault();
    setLocation(city );
    
  };

  return (
    <>
    
    <div className="main">
      <nav className="istclass">
        <form className="form" onSubmit={handlesubmit}>
          <div className="search">
            <input
              value={city}
              placeholder="Search your location"
              className="searchbox"
              onChange={(e) => setCity(e.target.value)}
            />

            <button className="nd" type="button" onClick={handlesubmit}>
            <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </nav>
    </div>
    </>
  );
}

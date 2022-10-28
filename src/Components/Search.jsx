import React from "react";
import "../Componentstyle/search.css";
export default function Search() {
  return (
    <div className="main">
      <nav className="istclass">
        <form>
          <div className="search">
            <input placeholder="search" className="searchbox" />
            <button className="nd">Submit</button>
          </div>
        </form>
      </nav>
    </div>
  );
}

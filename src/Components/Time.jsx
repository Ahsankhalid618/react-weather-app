import React from "react";
import "../Componentstyle/time.css"
import Clock from "react-live-clock";
export default function Time() {
  return (
    <div className="clock">
      <Clock format={"HH:mm:ss"} ticking={true} timezone={"PK/asia"} />
    </div>
  );
}

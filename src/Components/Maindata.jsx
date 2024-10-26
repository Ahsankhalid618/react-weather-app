import React, { useState, useEffect } from "react";

import "../Componentstyle/Main.css";
import Graph from "./Graph";
import WeatherCard from "./WeatherCard";

import { Dweather } from "../helper/fetchData";
import ForecastCard from "./ForecastCard";
import Header from "./Header";

const Maindata = ({ city = "london", setBackgroundImageURL }) => {
    const [data, setData] = useState(null);
    /* eslint-disable-next-line no-unused-vars */
    const [cityValid, setCityValid] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState(city); // State for search input
    // const [showGraph, setShowGraph] = useState(true);

    useEffect(() => {
        async function fetchWether() {
            const data = await Dweather(city);
            if (!data) {
                setCityValid(false);
            }
            setCityValid(true);
            setData(data);
            setSearchValue(city); // Fetch weather data on component mount or city change
        }
        fetchWether();
    }, [city]);

    useEffect(() => {
        setBackgroundImageURL(data?.list[0].weather[0].icon); // Set background in useEffect
    }, [data, setBackgroundImageURL]);

    const handleSearch = async () => {
        setLoading(true);
        const data = await Dweather(searchValue); // Fetch new data when search icon is clicked

        if (data) {
            setData(data);
        }
        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(); // Call the search when the ENTER key is pressed
        }
    };

    if (!data) {
        return (
            <div className="loading-container">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="weather-container">
            <div className="main-content">
                {/* Header Controls */}
                <Header
                    searchValue={searchValue}
                    setIsDark={setIsDark}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                    handleKeyDown={handleKeyDown}
                    loading={loading}
                    isDark={isDark}
                />

                {/* Main Weather Card */}
                <WeatherCard data={data} />
                {/* 5-Day Forecast */}
                <span className="forecast-title-container">
                    <h3 className="forecast-title">5-Day Forecast</h3>
                    {/* <button
                        className="primary-btn"
                        onClick={() => setShowGraph((s) => !s)}
                    >
                        {showGraph ? "show 5 day forcast" : "24-hour graph"}
                    </button> */}
                </span>
                <div className="forecast-grid">
                    {[7, 15, 23, 31, 39].map((index) => (
                        <ForecastCard data={data} index={index} key={index} />
                    ))}
                </div>
                {/* {!showGraph ? (
                
                ) : (
                    <Graph />
                )} */}
            </div>
        </div>
    );
};

export default Maindata;

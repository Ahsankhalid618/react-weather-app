import moment from "moment";
import { getWeatherIcon } from "../helper/iconHelper";

function ForecastCard({ index, data }) {
    return (
        <div key={index} className="forecast-card">
            <h4 className="forecast-day">
                {moment(new Date().setTime(data.list[index].dt * 1000)).format(
                    "ddd"
                )}
            </h4>
            {/* Use Lucide icon for weather forecast */}
            {getWeatherIcon(data.list[index].weather[0].main)}
            <div className="forecast-details">
                <div className="forecast-temp">
                    {data.list[index].main.temp.toFixed(1)}
                    °C
                </div>
                <div className="forecast-feels-like">
                    Feels like {data.list[index].main.feels_like.toFixed(1)}
                    °C
                </div>
                <div className="forecast-humidity">
                    Humidity {data.list[index].main.humidity}%
                </div>
                <div className="forecast-condition">
                    {data.list[index].weather[0].main}
                </div>
            </div>
        </div>
    );
}

export default ForecastCard;

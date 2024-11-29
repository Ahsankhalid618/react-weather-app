const Dweather = async (cityName) => {
    // get WEATHER_API_KEY = https://home.openweathermap.org/api_keys
    const key = process.env.REACT_APP_API_KEY;
    console.log(key);
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric&formatted=0`
    );
    const data = await res.json();

    if (data.city) {
        console.log(data);
        return data;
    } else {
        return null;
    }
};

function getTempArrayForGraph(data) {
    if (!data) {
        return [];
    }
    //takes the next 8 temp in consider as temp window is of 3 hours (8*3=24hr)
    return data.slice(0, 8).map((data) => {
        const dateInfo = data.dt_txt.split(" ");
        const time = dateInfo[1].slice(0, 5);
        const date = dateInfo[0];

        return {
            time,
            temp: data.main.temp,
            date,
            weather: data.weather[0].main,
        };
    });
}

export { Dweather, getTempArrayForGraph };

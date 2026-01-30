export { requestWeather, getRequiredData };

async function requestWeather(location, units) {
    
    const API_KEY = "QLGARWVEYH54HN8ZTT5SLZXQ8";
    const url =
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`
        + `${location}` + `?unitGroup=${units}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

function getRequiredData(data) {
    
    const address = data.resolvedAddress;
    const currentConditions = data.currentConditions;
    const days = data.days;

    const today = days[0].datetime;
    const low = days[0].tempmin;
    const high = days[0].tempmax;

    const forecast = getForeCast(days);

    return {
        address,
        today,
        temp: currentConditions.temp,
        feelsLike: currentConditions.feelslike,
        humidity: currentConditions.humidity,
        precipProb: currentConditions.precipprob,
        windspeed: currentConditions.windspeed,
        conditions: currentConditions.conditions,
        low, high,
        forecast,
        icon: currentConditions.icon,
    };
};

function getForeCast(days) {
    return days.slice(1,8).map(day=>({
        date:day.datetime,
        max:day.tempmax,
        min:day.tempmin,
        conditions: day.conditions,
        icon: day.icon
    }));
}


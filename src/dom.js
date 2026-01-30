import { format, parseISO} from "date-fns"
import { getGif } from "./theme.js";

function createElement(type,className,text,){
    let el = document.createElement(type);
    if(text){
        el.textContent = text;
    }
    if(className){
        el.classList.add(className);
    }
    return el;
}

export function getSearchInput(){
    const searchBar = document.querySelector(".search-bar input");
    return searchBar.value.trim() || "New Delhi";
}

export function initSearch(searchHandler) {
    const newSearchButton = document.querySelector(".search-bar button");
    newSearchButton.addEventListener("click", searchHandler);

    const newSearchInput = document.querySelector(".search-bar input");
    newSearchInput.addEventListener("keydown",(event)=>{
        if(event.key === "Enter"){
            searchHandler();
        }
    });
}

export function initToggle(toggleHandler){
    const toggleButton = document.querySelector(".switch input");
    toggleButton.addEventListener("change",toggleHandler);
}

export function getUnitInput(){
    const toggleButton = document.querySelector(".switch input");
    return toggleButton.checked? "us": "metric";
}

let tempunit = "°C";
let speedunit = "km/h";

function setUnits(system){
    if(system==="us"){
        tempunit = "°F";
        speedunit = "mph";
    }else{
        tempunit = "°C";
        speedunit = "km/h"
    }
}

export const loadingAnimation = document.querySelector("dialog");

async function loadIcon(iconCode) {
    const icon = await import(`./images/icons/${iconCode}.svg`);
    return icon.default;
}

async function loadAirConditionIcon(iconCode) {
    const icon = await import(`./images/${iconCode}.svg`);
    return icon.default;
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function renderUpperLeft(reqData){
    const address = createElement("p","address",toTitleCase(reqData.address));
    const today = createElement("p","today",format(parseISO(reqData.today),"dd MMMM, eeee"));

    const temp = createElement("p","temp",`${reqData.temp} ${tempunit}`);
    const high = createElement("p","high",`${reqData.high} ${tempunit}`);
    const low = createElement("p","low",`${reqData.low} ${tempunit}`);

    const lowHighFlex = createElement("div","low-high-flex");
    lowHighFlex.append(high,low);

    const conditions = createElement("p","conditions",reqData.conditions);
    const icon = createElement("img","conditions-icon");
    loadIcon(reqData.icon).then(src=>{
        icon.src = src;
    });
    const iconFlex = createElement("div","icon-flex");
    iconFlex.append(conditions,icon);
    
    const tempFlex = createElement("div","temp-flex");
    tempFlex.append(temp, lowHighFlex,iconFlex);
    
    const upperleft = document.querySelector(".left .upper");
    upperleft.replaceChildren();
    upperleft.append(address, today, tempFlex);
}

function renderLowerLeft(reqData){
    const feelsLike = createAirCondition("Feels Like",`${reqData.feelsLike} ${tempunit}`,"feels-like-thermometer");
    const windspeed = createAirCondition("Wind Speed",`${reqData.windspeed} ${speedunit}`,"wind-speed");
    const precipProb = createAirCondition("Chace of rain",reqData.precipProb+" %","rain-umbrella");
    const humidity = createAirCondition("Humidity",reqData.humidity+" %","humidity-drops");

    const lowerleft = document.querySelector(".left .lower");
    lowerleft.replaceChildren();
    lowerleft.append(feelsLike,windspeed,precipProb,humidity);
}

function createAirCondition(parameterName,value,iconCode){
    const containerDiv = createElement("div","air-condition","");

    const name = createElement("p","name",parameterName);
    const val = createElement("p","value",value);
    const info = createElement("div","air-condition-info");
    info.append(name, val);

    const icon = createElement("img","air-condition-icon");
    loadAirConditionIcon(iconCode).then(src=>{
        icon.src = src;
    })
    containerDiv.append(icon,info);
    return containerDiv;
}

function renderForecast(forecast){
    const right = document.querySelector(".right");
    right.replaceChildren();
    for(let i = 0;i<forecast.length;i++){
        let day = forecast[i];
        const dayFlex = createElement("div","day-flex");
        const date = createElement("p","day-date",format(parseISO(day.date), "dd MMM"));
        const icon = createElement("img","day-icon");
        loadIcon(day.icon).then(src=>{
            icon.src = src;
        });
        const conditions = createElement("p","day-condition",`${day.conditions}`);
        const conditionFlex = createElement("div","day-condition-flex");
        conditionFlex.append(icon,conditions);
        const minmax = createElement("p","day-minmax",`${day.max} / ${day.min}`);
        dayFlex.append(date, conditionFlex, minmax);
        right.appendChild(dayFlex);
    }
}

async function setBackgroundImg(searchTerm){
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.backgroundImage = `url(${await getGif(searchTerm)})`;
}

export function render(system, reqData){
    setUnits(system);
    renderUpperLeft(reqData);
    renderLowerLeft(reqData);
    renderForecast(reqData.forecast);
    setBackgroundImg(reqData.conditions);
}
const ul = document.querySelector(".row");
const key = `&key=0602d47b54d7446fa486ca4f81fbf26d`;
const url = `https://api.weatherbit.io/v2.0/current?city=`;
const container = document.querySelector(".container");
const row = document.querySelector(".row");
const form = document.querySelector(".city-form")


document.addEventListener("DOMContentLoaded", function()
{
    start();
})

let start = () => 
{
    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(data => renderPage(data));
}

let renderPage = (stuff) => 
{
    document.innerText = " ";
    for (let i=0; i < stuff.length; i++)
    {
        let newDiv = document.createElement("div");
        newDiv.classList.add("col-lg-6");
        newDiv.innerText = stuff[i].username;
        addEventsToNames(newDiv, stuff[i]);
        ul.append(newDiv);
    }
}

let addEventsToNames = (div, person) => 
{
    div.addEventListener("click", function()
    {
        renderSinglePerson(person);
    })
}
//For every person, call a fn to make a div 
function renderSinglePerson(person)
{
    row.innerHTML = "";
    for (let i=0; i < person.citylikes.length; i++)
    {
        appendWeatherToDOM(person.citylikes[i]);
    }
    container.append(makeReturnButton());
}
//Make a return button 
let makeReturnButton = () => 
{
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-danger");
    btn.innerText = "Return to all Users";
    addEventListenerToReturnButton(btn);  
    return btn;
}

let addEventListenerToReturnButton = (btn) => 
{
    btn.addEventListener("click", function()
    {
        row.innerHTML = "";
        btn.remove();
        start();
    })
}
//Call fetchweather
let appendWeatherToDOM = (place) => 
{
    let city = place.city;
    fetchWeatherFromAPI(city);
}
//Fetching singular weather from API
let fetchWeatherFromAPI = (city) => 
{
    fetch(`${url}${city}${key}`)
    .then(resp => resp.json())
    .then(data => renderLikedWeather(data));
}
//Code for actually rendering the div with details in it
let renderLikedWeather = (weather) => 
{
    let divBlock = document.createElement("div");
    divBlock.classList.add("col-lg-6");
    divBlock.classList.add("individualpage-css");
    divBlock.style.border = "2px black solid";
    let access = weather.data["0"];
    let intermediate = 
    `
    <h1>${access.city_name},${access.state_code} </h1>
    `
    divBlock.innerHTML = intermediate;
    addListenerToDivBlock(divBlock, weather);
    row.append(divBlock);
}

//Click on div, go to more info 
let addListenerToDivBlock = (div, weather) => 
{
    div.addEventListener("click", function()
    {
        container.innerHTML = "";
        let newDiv = document.createElement("div");
        let access = weather.data["0"];
        newDiv.innerHTML = 
        `
        <h1>${access.city_name}, ${access.state_code}</h1>
        <h2> It is ${access.temp} degrees</h2>
        <p> Feels Like: ${access.app_temp} degrees</p>
        <h3>${access.weather.description} </h3>
        <hr>
        <h3> Humidity: ${access.rh}%</h3>
        <h3> UV Index: ${access.uv}</h3>
        <h3> Cloud Coverage: ${access.clouds}%</h3>
        `
        container.append(newDiv);
    })
}


form.addEventListener("submit", function(e){
  e.preventDefault()
  let city = e.target.name.value 
  fetch(`${url}${city}${key}`)
  .then(resp => resp.json())
  .then(data => renderWeatherOnPage(data))
})

function renderWeatherOnPage(weather){
  let myWeather = weather.data["0"]
 }
  
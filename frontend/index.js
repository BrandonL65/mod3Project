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

function renderSinglePerson(person)
{
    container.innerHTML = "";
    for (let i=0; i < person.citylikes.length; i++)
    {
        appendWeatherToDOM(person.citylikes[i]);
    }
}

let appendWeatherToDOM = (place) => 
{
    let city = place.city;
    fetchWeatherFromAPI(city);
}

let fetchWeatherFromAPI = (city) => 
{
    fetch(`${url}${city}${key}`)
    .then(resp => resp.json())
    .then(data => renderLikedWeather(data));
}
let renderLikedWeather = (weather) => 
{
    let divBlock = document.createElement("div");
    divBlock.classList.add("col-lg-6");
    let access = weather.data["0"];
    let intermediate = 
    `
    <h1>${access.city_name},${access.state_code} </h1>
    <h2>It is ${access.temp} degrees Celsius</h2>
    <h3>Conditions: ${access.weather.description}</h3>
    `
    container.innerHTML = intermediate
}

form.addEventListener("submit", function(e){
  e.preventDefault()
  let city = e.target.name.value 
  fetch(`${url}${city}${key}`)
  .then(resp => resp.json())
  .then(data => console.log(data))
})
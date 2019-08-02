const ul = document.querySelector(".row");
const key = `&key=50416b6893144dd0965bf662cd2f132c`;
const url = newFunction();
const container = document.querySelector(".container");
const row = document.querySelector(".row");
const form = document.querySelector(".city-form")
const newUser = document.querySelector(".user-form")



document.addEventListener("DOMContentLoaded", function()
{
    start();
    login()
})

let start = () => 
{
    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(data => renderPage(data));
}

let renderPage = (stuff) => 
{
    row.innerText = " ";
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
function newFunction() {
  return `https://api.weatherbit.io/v2.0/current?city=`;
}

//For every person, call a fn to make a div 
function renderSinglePerson(person)
{
    let formDiv = document.createElement("div");
    formDiv.classList.add("delete-later");
    //MAKING BUTTON TO ENTER AND VIEW ANOTHER CITY 
    let middle = 
    `
        <br><p>Search For A City:</p><br>
        <input class="search-input", type="text", placeholder="City, State" name="cityName"> <br>
        <button id="newCityButton" class="btn btn-primary"> Search </button><br><br>
    `
    formDiv.innerHTML = middle;
    container.append(formDiv);
    //ADD LISTENER TO THE BUTTON
    addListenerToFormDiv(formDiv, person);
    row.classList = "city-row"
    row.innerHTML = "";
    
    for (let i=0; i < person.citylikes.length; i++)
    {
        appendWeatherToDOM(person.citylikes[i], person);
    }
    container.append(makeReturnButton());
}

let addListenerToFormDiv = (formDiv, person) => 
{
    //find button in document 

    let btn = document.querySelector(".btn-primary");
    //add listener to it 
    btn.addEventListener("click", function()
    {
        let result = document.querySelector(".search-input").value;
        fetch(`${url}${result}${key}`)
        .then(resp => resp.json())
        .then(data => renderData(data, person));
        // .then(data => console.log(data))
    }) 
    
}

let renderData = (stuff, person) => 
{

    let access = stuff.data["0"];
    let fahrenheit = Math.round((access.temp * 1.8) + 32)
    let fahrenheitFeelsLike = Math.round((access.app_temp * 1.8) + 32)
    container.innerHTML = "";
    container.innerHTML = 
    `
    <h1>${access.city_name},${access.state_code}</h1>
    <h2> It is ${fahrenheit} degrees</h2>
    <p> Feels Like: ${fahrenheitFeelsLike} degrees</p>
    <h3>${access.weather.description} </h3>
    
    <h3> Humidity: ${access.rh}%</h3>
    <h3> UV Index: ${access.uv}</h3>
    <h3> Cloud Coverage: ${access.clouds}%</h3>
    `
    let newButton = document.createElement("button");
    newButton.classList.add("btn-warning");
    newButton.innerText = "Click To Favorite";
    newButton.addEventListener("click", function(e)
    {
        fetch(`http://localhost:3000/citylikes`, 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify
            ({
                "city": `${access.city_name},${access.state_code}`,
                "user_id": person.id 
            })
        })
        .then(resp => resp.json())
        .then(function(data)
        {
          location.reload();
        });
    });
    container.append(newButton);
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
        let del = document.querySelector(".delete-later");
        del.remove();
        btn.remove();
        start();
    })
}
//Call fetchweather
let appendWeatherToDOM = (place, person) => 
{
    let city = place.city;
    fetchWeatherFromAPI(city, person, place);
}
//Fetching singular weather from API
let fetchWeatherFromAPI = (city, person, place) => 
{
    fetch(`${url}${city}${key}`)
    .then(resp => resp.json())
    .then(data => renderLikedWeather(data, person, place));
}
//Code for actually rendering the div with details in it
let renderLikedWeather = (weather, person, place) => 
{
    let divBlock = document.createElement("div");
    divBlock.classList.add("col-lg-6");
    divBlock.classList.add("individualpage-css");
    divBlock.style.border = "2px skyblue inset";
    
    let access = weather.data["0"];
    // let intermediate = 
    // `
    // <h1>${access.city_name},${access.state_code} </h1>
    // <button> Delete </button>
    // `
    // divBlock.innerHTML = intermediate;
    let h4 = document.createElement("h4");
    let button = document.createElement("button");
    h4.innerText = `${access.city_name},${access.state_code}, ${access.country_code}`;
    button.innerText = "Delete";
    button.classList = "btn-delete"
    divBlock.append(h4);
    divBlock.append(button);
    addListenerToDivBlock(divBlock, weather,h4); //CHANGED
    row.append(divBlock);

    button.addEventListener("click", function()
    {
        fetch(`http://localhost:3000/citylikes/${place.id}`, 
        {
            method: "DELETE",
            headers: 
            {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(function(data)
        {
            let all = document.querySelectorAll(".col-lg-6");
            for (let i=0; i < all.length; i++)
            {
                if (all[i].innerText.includes(data.city))
                {
                    all[i].remove();
                }
            }
        })
    })
}


//Click on div, go to more info 
let addListenerToDivBlock = (div, weather,h1) => 
{
    
    h1.addEventListener("click", function()
    {
        container.innerHTML = "";
        let newDiv = document.createElement("div");
        let access = weather.data["0"];
        let fahrenheit = Math.round((access.temp * 1.8) + 32)
        let fahrenheitFeelsLike = Math.round((access.app_temp * 1.8) + 32)
        newDiv.classList.add("font-size");
        newDiv.innerHTML = 
        `
        <h1>${access.city_name}, ${access.state_code}, ${access.country_code}<h1>
        <h2> It is ${fahrenheit} degrees</h2>
        <p> Feels Like: ${fahrenheitFeelsLike} degrees</p>
        <h3>${access.weather.description} </h3>

        <h3> Humidity: ${access.rh}%</h3>
        <h3> UV Index: ${access.uv}</h3>
        <h3> Cloud Coverage: ${access.clouds}%</h3>
        `
        container.append(newDiv);
    })
}


function login(){
  newUser.addEventListener("submit", function(e){
    e.preventDefault()
    let user = e.target.name.value 
    user = capitalize(user)
    createUser(user)
  })
}

function createUser(user){
  fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user
    })
  })
  .then(resp => resp.json())
  .then(data => start())
}
/// All usernames have first letter capitalized \\\
function capitalize(string) {
  const str = string.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1)
}



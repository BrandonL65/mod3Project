const ul = document.querySelector(".row");
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
    // fetch(`http://localhost:3000/users/${person.id}`)
    // .then(resp => resp.json())
    // .then(data => console.log(data));
    let container = document.querySelector(".container");
    container.innerHTML = "";
    container.innerHTML = 
    `
    <h1> ${person.username} </h1>
    `
    for (let i=0; i < person.citylikes.length; i++)
    {
        console.log(person.citylikes[i]);
    }
    
}
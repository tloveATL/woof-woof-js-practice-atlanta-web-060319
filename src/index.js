document.addEventListener("DOMContentLoaded", pageSetup)

const BASE_URL = "http://localhost:3000/pups"

function pageSetup(){
    fetchDogs()
}

function fetchDogs(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => setupDogBar(data))
}

function setupDogBar(dogsData){
    dogsData.forEach(function(dog) {
    let dogSpan = document.createElement("span")
    dogSpan.innerHTML += dog.name
    dogSpan.setAttribute("data-id", dog.id)
    const dogBar = document.querySelector("#dog-bar")
    dogBar.appendChild(dogSpan)
    dogSpan.addEventListener("click", handleClick)
})
}

function handleClick(e){
    let id = e.target.dataset.id
    fetch(`${BASE_URL}/${id}`)
    .then(resp => resp.json())
    .then(data => displayDog(data))
}

function displayDog(dogInfo){
let image = document.createElement("img")
let name = document.createElement("h2")
let dogBtn = document.createElement("button")
let phrase
if (dogInfo.isGoodDog === true){
    phrase = "Good Dog!"
} else {
    phrase = "Bad Dog!"
}
image.src = dogInfo.image
name.innerText = dogInfo.name
dogBtn.innerText = phrase
let dogSection = document.querySelector("#dog-info")
dogSection.innerText = " "
dogSection.appendChild(image)
dogSection.appendChild(name)
dogSection.appendChild(dogBtn)
dogBtn.setAttribute("data-id", dogInfo.id)
dogBtn.addEventListener("click", toggleGood)
}

function toggleGood(e){
    let goodness
    if (e.target.innerText === "Good Dog!"){
        goodness = true
    } else {
        goodness = false
    }
    let newGoodness = { isGoodDog: goodness = !goodness}
    let id = e.target.dataset.id
    fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers:{
            'Content-Type' :'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newGoodness)
    })
    .then(resp => resp.json())
    .catch(res => console.log("Error", res))
    .then(data => displayDog(data))
    }

    let dogFilter = document.querySelector("#good-dog-filter")
    dogFilter.addEventListener("click", filterDogs)

    function filterDogs(e){
        e.preventDefault()
        console.log(e)
    }

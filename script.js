// DOM variables
const userCity = document.getElementById("city");
const weatherDisplay = document.getElementById("weather");
const cityList = document.getElementById("Buttons");
const submitBtn = document.getElementById("submit-btn");
let baseURL = "http://api.weatherapi.com/v1/current.json";
let apiKey = "3ddf5074f36545f3bf1160157220505";

// make a request function

const makeRequest = async (userInput) => {
//   console.log(userInput);
  let response = await fetch(
    `${baseURL}?key=${apiKey}&q=${userInput}`
  );
    console.log(response);
    //to handel error use if statment 
  if (response.ok) {
    let data = await response.json();
    renderWeather(data);
    setCurrentCity(userInput);
    addCityButton(userInput);
  }

  if (response.status >= 400 && response.status <= 600) {
    console.log("error: " + response.status);
  }
};

if (!localStorage.getItem("city")) {
  localStorage.setItem("city", "");
} else {
  let currentCity = localStorage.getItem("city");
  makeRequest(currentCity);
}
// gets user input and submit the request

const handleSubmit = (event) => {
  event.preventDefault();
  makeRequest(userCity.value.trim());
  userCity.value = "";
};

const renderWeather = (data) => {
  console.log(data);
  weatherDisplay.innerHTML = `<p>City: ${data.location.name}</p>
<p>Condition: ${data.current.condition.text}</p>
<img src="${data.current.condition.icon}">
<p>Current Temp: ${data.current.temp_f}°</p>
`;
};

const setCurrentCity = (city) => {
  localStorage.setItem("city", city);
};

const addCityButton = (city) => {
    let newButton = document.createElement("button");
    newButton.setAttribute("class", "cityBtn");
    newButton.innerText = city;
    cityList.appendChild(newButton);
}

// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "49b5f21bfe1fcc543f6801a953bf48e5";

weatherForm.addEventListener("submit", async event => {

  event.preventDefault();

  const city = cityInput.value;

  if(city){
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please entre a city");
  }

});

async function getWeatherData(city){

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if(!response.ok){
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data){

  const {name: city,
          main: {temp,temp_min, temp_max, humidity, feels_like},
          wind: {speed},
          weather: [{description, id}]} = data;

          card.textContent ="";
          card.style.display = "flex";

          const cityDisplay = document.createElement("h1");
          const tempDisplay = document.createElement("p");
          const tempMin = document.createElement("p");
          const tempMax = document.createElement("p");
          const feelsLike = document.createElement("p");
          const humidityDisplay = document.createElement("p");
          const windSpeed = document.createElement("p");
          const descDisplay = document.createElement("p");
          const weatherEmoji = document.createElement("p");

          cityDisplay.textContent = city;
          tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
          tempMin,tempMax.textContent = `Lows of ${(temp_min - 273.15).toFixed(1)}°C & highs of ${(temp_max - 273.15).toFixed(1)}°C `
          feelsLike.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°C`;
          humidityDisplay.textContent = `Humidity: ${humidity}%`;
          windSpeed.textContent = `Wind speed: ${speed} mph`;
          descDisplay.textContent = description;
          weatherEmoji.textContent = getWeatherEmoji(id);

          

          cityDisplay.classList.add("cityDisplay");
          tempDisplay.classList.add("tempDisplay");
          tempMin.classList.add("tempMin");
          tempMax.classList.add("tempMax");
          feelsLike.classList.add("feelsLike");
          humidityDisplay.classList.add("humidityDisplay");
          windSpeed.classList.add("windSpeed");
          descDisplay.classList.add("descDisplay");
          weatherEmoji.classList.add("weatherEmoji");


          card.appendChild(cityDisplay);
          card.appendChild(tempDisplay);
          card.appendChild(tempMin);
          card.appendChild(tempMax);
          card.appendChild(feelsLike);
          card.appendChild(humidityDisplay);
          card.appendChild(windSpeed);
          card.appendChild(descDisplay);
          card.appendChild(weatherEmoji);

          console.log(data);
}

function getWeatherEmoji(weatherId){

  switch(true){
    case (weatherId >= 200 && weatherId < 300):
      return "⛈";
      case (weatherId >= 300 && weatherId < 400):
        return "🌧";
        case (weatherId >= 500 && weatherId < 600):
          return "🌨";
          case (weatherId >= 600 && weatherId < 700):
            return "❄";
            case (weatherId >= 700 && weatherId < 800):
              return "🌫";
              case (weatherId === 800):
                return "☀";
                case (weatherId >= 801 && weatherId < 810):
                  return "☁";
                  default:
                    return "⁉"
  }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    
}
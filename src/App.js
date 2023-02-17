import React, {useState, useEffect} from 'react'
import './App.css'

import { FaArrowUp, FaArrowDown, FaWind} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi"

function App() {
  
  const apiKey = 'ef2dd6be0db70da9f14f883675a9084c';
  
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  
  // const [icon, makeIcon]=useState();

  // ICON
//   const [weatherIcons, setWeatherIcons] = useState({
//     Thunderstorm: "wi-thunderstorm",
//     Drizzle: "wi-sleet",
//     Rain: "wi-storm-showers",
//     Snow: "wi-snow", 
//     Atmosphere: "wi-fog",
//     Clear: "wi-day-sunny",
//     Clouds: "wi-day-fog"
// })

 //Display the icons based on the value
//  const displayIcons = (icons, rangeId) => {
//   switch(true) {
//       case rangeId >=200 && rangeId < 232 :
//           setWeatherIcons(icons.Thunderstorm);
//           break;
//       case rangeId >= 300 && rangeId <= 321: 
//           setWeatherIcons(icons.Drizzle);
//           break;
//       case rangeId >= 500 && rangeId <= 521:
//           setWeatherIcons(icons.Rain);
//           break;
//       case rangeId >= 600 && rangeId <= 622:
//           setWeatherIcons(icons.Snow);
//           break;
//       case rangeId >= 701 && rangeId <= 781:
//           setWeatherIcons(icons.Atmosphere);
//           break;
//       case rangeId === 800:
//           setWeatherIcons(icons.Clear);
//           break;
//       case rangeId >= 801 && rangeId <= 804:
//           setWeatherIcons(icons.Clouds);
//           break;
//       default : 
//           setWeatherIcons(icons.Clouds)
//   }
// }

 
  const getWeather = (event) => {
    if (event.key === "Enter") { 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(
      response => response.json()
    ).then(
      data => {
        setCity("");
        setWeatherData(data)
         }   
    )
  }
}


  return (
<div className='main '>
  
  <div className='container'  > 
      <input 
      className='input' 
      placeholder='Enter City...' 
      onChange={e => setCity(e.target.value)}
      value={city}
      onKeyPress={getWeather}
      />

    {typeof weatherData.main === 'undefined' ? (
      <div>
        <p>Welcome to weather app! Enter city to get the weather info...</p>
      </div>      
    )  : ( 
        <div className={
        (typeof weatherData.main != "undefined") 
        ? (( weatherData.main.temp > 18)
        ? 'weather-data warm'
        : 'weather-data')
        : 'weather-data' } >
        
        
        <p className='city'>City: {weatherData.name}</p>
        <div className='box'>
        <img src= {` https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />  
        <h1>{weatherData.weather[0].main}</h1>
        </div>
        <img className='box' src={weatherData.makeIcon} />
        <p className='temp'>{Math.round(weatherData.main.temp)}°C</p>
        <p className='box'>Max:<FaArrowUp /> {Math.round(weatherData.main.temp_max)}°C</p>
        <p className='box'>Min:<FaArrowDown /> {Math.round(weatherData.main.temp_min)}°C</p>
        {/* <p className='box'>Weather: <TiWeatherCloudy />{weatherData.weather[0].main}</p> */}
        <p className='box'>Humidity:<WiHumidity /> {weatherData.main.humidity}</p>

       
        
        {/* <img className='box' src= {displayIcons(weatherData.weather && weatherData.weather[0].rangeId)}/> */}
      
      </div>
    )}


    {weatherData.cod === "404" ? (
      <p>city not found</p>
    ) : (
      <></>
    )}
    
    </div>
    
    </div>
  )
 
 
  
}



export default App

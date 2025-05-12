import React, {useEffect, useState} from 'react'
import './Weather.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
 '@fortawesome/free-solid-svg-icons'
// import {faCloud } from '@fortawesome/free-solid-svg-icons'
import {faCloudRain } from '@fortawesome/free-solid-svg-icons'
import {faWind } from '@fortawesome/free-solid-svg-icons'


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState ('');
  const [searchCity, setSearchCity] = useState ('London');
  const search = async (city) =>{
   try {
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
 const response = await fetch(url);
 const data = await response.json();
 console.log(data);
 if (data.cod === 200){
 setWeatherData({
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  temperature: Math.floor(data.main.temp),
  location: data.name,
  iconCode: data.weather[0].icon,
});} else{
  alert('City not found, please try again.');
  setWeatherData(null);
}
   } catch (error) {
    console.error(error);
   }
};
const handleSearchSubmit = (e) => {
  /** Prevent page reload on form submit */
  e.preventDefault(); 
  setSearchCity(city);
};

const handleInputChange = (e) => {
  /** Update the city state as user types */
  setCity(e.target.value); 
};
/**Trigger search on initial load and when the user submits a new search */
useEffect(()=>{
  search(searchCity);
/** Runs whenever searchCity changes */
},[searchCity]); 

  return (
  <div className='weather'>
  <div className='search-bar'>
    <form onSubmit={handleSearchSubmit}>
  <input 
  type="text" 
  value={city}
  onChange={handleInputChange}
  placeholder='Enter city name' 
  />      
   <FontAwesomeIcon className='search-icon' icon={faSearch} />
   </form>
  </div>
  {weatherData && (
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png`}
          alt="weather icon"
        />
      )}
 <p className="temperature">{weatherData ? `${weatherData.temperature}°C` : 'Loading...'}</p>
      <p className="location">{weatherData ? weatherData.location : 'Loading...'}</p>

      <div className="weather-data">
        <div className="col">
          <FontAwesomeIcon className="humidity_icon" icon={faCloudRain} />
          <div>
            <p>{weatherData ? `${weatherData.humidity} %` : 'Loading...'}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <FontAwesomeIcon className="wind_icon" icon={faWind} />
          <div>
            <p>{weatherData ? `${weatherData.windSpeed} km/h` : 'Loading...'}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
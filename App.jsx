import React, { useState } from "react";
import "./App.css"


function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  const [unit, setUnit] = useState("metric"); // metric = °C, imperial = °F
  const [darkMode, setDarkMode] = useState(false);
  var [found,setFound] = useState("")

  async function handleWeather() {
    const API_KEY = "c73fcf1e1f3a41556fb0584b6508e17c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=${unit}`;
    try {
      const result = await fetch(url);
      const response = await result.json();
      if (response.cod === 200) {
        setWeather(response);
        setFound("")
        
      } else {
        setFound("city not found")
        setWeather(null);
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  }

  function toggleUnit() {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
    if (input) handleWeather(); // Refresh on toggle
  }

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  const temperatureSymbol = unit === "metric" ? "°C" : "°F";

  return (
  
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="top-bar">
        <h1 className="app-title">🌤️ Weather App</h1>
        <div className="toggle-buttons">
          <button onClick={toggleUnit} className="toggle-btn">
            {unit === "metric" ? "Show °F" : "Show °C"}
          </button>
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
 </div>

      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="city-input"
          placeholder="Enter city name"
          type="text"
        />
        <button onClick={handleWeather} className="get-weather-btn">
          Get Weather Update
        </button>
      </div>

      {weather && (
        <div className="weather-card animate-fadein">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="description">{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
          <p>🌡️ Temp: {weather.main.temp} {temperatureSymbol}</p>
          <p>💨 Wind: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
        </div>
      )}
      <h1>{found}</h1>
    </div>
  );
}

export default App;

{/*import {BrowserRouter,Routes,Route} from "react-router-dom"
import "./Home.jsx"
import Login from "./login.jsx";
import SignUp from "./SignUp.jsx";
import Home2 from "./Home2.jsx";
   <Route path="/py" element = {<Python/>}></Route>
    <Route path="js" element = {<JavaScript/>}></Route>
    <Route path="/home" element = {<Home/>}></Route>
    <Route path="/C" element = {<C/>}></Route>
    <Route path="/Java" element = {<Java/>}></Route>
    <Route path="/TypeScript" element = {<TypeScript/>}></Route>
     */}



{/* <BrowserRouter>
  <Routes>
    <Route path="/" element = {<SignUp/>}></Route> 
    <Route path="/login" element = {<Login/>}></Route>
    <Route path="/home2" element = {<Home2/>}></Route>
  </Routes>
  </BrowserRouter> */}
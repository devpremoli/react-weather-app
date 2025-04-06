import { useState } from "react";
import "./App.css";
import MainWeatherWindow from "./components/MainWeatherWindow";
import CityInput from "./components/CityInput";
import WeatherBox from "./components/WeatherBox";

function App() {
  const [city, setCity] = useState();
  const [days, setDays] = useState([]);

  const updateState = (data) => {
    const newCity = data.city.name;
    const newDays = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      newDays.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
      });
    }

    setCity(newCity);
    setDays(newDays);
  };

  const makeApiCall = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=6557810176c36fac5f0db536711a6c52`
      );
      const api_data = await response.json();

      if (api_data.cod === "200") {
        updateState(api_data);
        return true;
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
    return false;
  };

  const getDayIndices = (data) => {
    const dayIndices = [0];
    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "15"
      ) {
        index++;
        if (index >= data.list.length) break;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  const WeatherBoxes = () => (
    <ul className="weather-box-list">
      {days.slice(1).map((day, idx) => (
        <li key={idx}>
          <WeatherBox {...day} />
        </li>
      ))}
    </ul>
  );

  console.log(city);
  console.log(days);

  return (
    <div className="App">
      <header className="App-header">
        {days[0] && (
          <MainWeatherWindow data={days[0]} city={city}>
            <CityInput city={city} makeApiCall={makeApiCall} />
            <WeatherBoxes />
          </MainWeatherWindow>
        )}
        {!days[0] && (
          <MainWeatherWindow city={city}>
            <CityInput city={city} makeApiCall={makeApiCall} />
          </MainWeatherWindow>
        )}
      </header>
    </div>
  );
}

export default App;

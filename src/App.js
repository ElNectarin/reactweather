import react, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";
import "moment/locale/ru";

function App() {
  const [weather, setWeather] = useState(null);
  const [foundCity, setFoundCity] = useState("");
  const [forecast, setForecast] = useState(null);

  const currenDay =
    moment().format("dddd").charAt(0).toUpperCase() +
    moment().format("dddd").slice(1);
  const defaultDay = moment().format("LL");

  const apiKey = "64c9c702dcce4e3eb9295411241104";

  useEffect(() => {
    moment.locale("ru");
    getWeather();

    return () => {};
  }, []);

  const getWeather = async (city = "Moscow") => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&lang=ru&days=5`
      );
      setWeather(response.data);
      setForecast(response.data.forecast.forecastday);
    } catch (error) {
      return error;
    }
  };

  const handleFoundCity = (e) => {
    setFoundCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getWeather(foundCity);
  };

  console.log(weather);
  console.log(forecast);

  return (
    <>
      {weather ? (
        <div className="container">
          <div className="wrapper">
            <div className="img_section">
              <div className="default_info">
                <h2 className="default_day">{currenDay}</h2>
                <span className="default_date">{defaultDay}</span>
                <div className="icons">
                  <img src={weather.current.condition.icon} alt="" />
                  <h2 className="weather_temp">{weather.current.temp_c} °C</h2>
                  <h3 className="cloudtxt">{weather.current.condition.text}</h3>
                </div>
              </div>
            </div>
            <div className="content_section">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search Location"
                  className="input_field"
                  name="city"
                  value={foundCity}
                  onChange={handleFoundCity}
                />
                <button type="submit" className="btn_search">
                  Search
                </button>
              </form>
              <div className="day_info">
                <div className="content">
                  <p className="title">NAME</p>
                  <span className="value">{weather.location.name}</span>
                </div>
                <div className="content">
                  <p className="title">TEMP</p>
                  <span className="value">{weather.current.temp_c} °C</span>
                </div>
                <div className="content">
                  <p className="title">HUMIDITY</p>
                  <span className="value">{weather.current.humidity}%</span>
                </div>
                <div className="content">
                  <p className="title">WIND SPEED</p>
                  <span className="value">{weather.current.wind_kph} Km/h</span>
                </div>
              </div>

              <div className="list_content">
                <ul>
                  {forecast
                    ? forecast.map((item, index) => {
                        if (index > 0) {
                          const date = moment(item.date);
                          const dayOfWeek = date.format("ddd");
                          return (
                            <li key={item.date_epoch}>
                              <img
                                src={item.day.condition.icon}
                                alt="weatherImg"
                              />
                              <span>{dayOfWeek}</span>
                              <span className="day_temp">
                                {item.day.avgtemp_c}°C
                              </span>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;

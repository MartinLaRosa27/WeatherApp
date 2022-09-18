import React, { useRef, useState } from "react";
import axios from "axios";

export const Main = () => {
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const city = useRef("");
  const country = useRef("");

  const getWeather = async (e) => {
    setResultado({});
    setCargando(true);
    e.preventDefault();
    const keyApi = `${process.env.key}`;
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city.current.value},${country.current.value}&limit=1&appid=${keyApi}`
      );
      const { lat, lon } = data[0];
      const { data: clima } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
      );
      setResultado(clima);
    } catch (e) {
      alert("city ​​not found");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className=" container mt-5">
      <div className="row">
        {/* FORMULARIO */}
        <div className="formulario col">
          <form method="POST" onSubmit={(e) => getWeather(e)}>
            <div className="mb-3">
              <label htmlFor="City" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="ciudad"
                name="City"
                placeholder="Las Vegas"
                required
                ref={city}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                id="country"
                name="country"
                required
                ref={country}
              >
                <option defaultValue="US">United Stades</option>
                <option value="AR">Argentina</option>
                <option value="MX">Mexico</option>
                <option value="ES">Spain</option>
              </select>
            </div>
            <button type="text" className="btn btn-primary">
              check weather
            </button>
          </form>
        </div>

        {/* CLIMA */}
        <div className="clima col text-center ">
          {cargando ? (
            <div className="spinner-border text-primary mt-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <></>
          )}
          {resultado.name ? (
            <>
              <h3 className="fst-italic mb-3">
                Weather of {city.current.value}
              </h3>
              <p>
                <strong>
                  Actual temperature: {parseInt(resultado.main.temp - 273.15)}°C
                </strong>
              </p>

              <p className="img">
                <img
                  src={`http://openweathermap.org/img/wn/${resultado.weather[0].icon}@2x.png`}
                />
              </p>
              <div className="min-max">
                <p>
                  Minimum temperature:{" "}
                  {parseInt(resultado.main.temp_max - 273.15)}
                  °C
                </p>
                <p>
                  Maximum temperature:{" "}
                  {parseInt(resultado.main.temp_min - 273.15)}
                  °C
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

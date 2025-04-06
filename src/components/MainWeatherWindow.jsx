import "./MainWeatherWindow.css";

const images = import.meta.glob("../images/*.svg", { eager: true });

export default function MainWeatherWindow({ city, data, children }) {
  const Title = city ? null : <h1 className="title">Weather Forecast</h1>;

  const iconPath =
    data && images[`../images/${data.icon}.svg`]
      ? images[`../images/${data.icon}.svg`].default
      : images["../images/01d.svg"].default;

  return (
    <div className="main">
      <div className="inner-main">
        {Title}
        <img
          src={iconPath}
          alt="sun"
          style={{
            visibility: city ? "visible" : "hidden",
            opacity: city ? "1" : "0",
          }}
        />

        <div
          className="today"
          style={{
            visibility: city ? "visible" : "hidden",
            opacity: city ? "1" : "0",
          }}
        >
          <span>Today</span>
          <h1>{city}</h1>
          <p>Temperature: {data ? Math.round(data.temp - 273.15) : 0}°C</p>
          <p>{data ? data.weather_desc.toLowerCase() : ""}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

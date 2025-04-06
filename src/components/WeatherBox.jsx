import "./WeatherBox.css";

const images = import.meta.glob("../images/*.svg", { eager: true });

export default function WeatherBox({ date, icon, temp }) {
  const getDay = (date) => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekday[new Date(date).getDay()];
  };

  const iconPath =
    icon && images[`../images/${icon}.svg`]
      ? images[`../images/${icon}.svg`].default
      : images["../images/01d.svg"].default;

  return (
    <div className="weather-box">
      <h1>{date ? getDay(date) : ""}</h1>
      <img src={iconPath} alt="weather icon" />
      <span className="temp">{Math.round(temp - 273.15)}°C</span>
    </div>
  );
}

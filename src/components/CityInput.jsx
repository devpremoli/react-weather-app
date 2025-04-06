// CityInput.jsx
import React from "react";

export default function CityInput({ city, makeApiCall }) {
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const input = e.target;
      const cityName = input.value;

      if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(cityName)) {
        input.classList.add("loading");

        if (await makeApiCall(cityName)) {
          input.placeholder = "Enter a City...";
        } else {
          input.placeholder = "City was not found, try again...";
        }
      } else {
        input.placeholder = "Please enter a valid city name...";
      }
      input.classList.remove("loading");
      input.value = "";
    }
  };

  const style = {
    top: city ? "-380px" : "-20px",
    width: "600px",
    display: "inline-block",
    padding: "10px 0px 10px 30px",
    lineHeight: "120%",
    position: "relative",
    borderRadius: "20px",
    outline: "none",
    fontSize: "20px",
    transition: "all 0.5s ease-out",
  };

  return (
    <input
      className="city-input"
      style={style}
      type="text"
      placeholder="Enter a City..."
      onKeyDown={handleKeyDown}
    />
  );
}

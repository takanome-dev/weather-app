class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.details = document.getElementById("w-details");
    this.icon = document.getElementById("w-icon");
    this.humidity = document.getElementById("w-humidity");
    this.pressure = document.getElementById("w-pressure");
    this.feelslike = document.getElementById("w-feels-like");
    this.wind = document.getElementById("w-wind");
  }

  paint(weather) {
    const tempCelcius = this.convertToCelcius(weather.main.temp);
    const tempFahrenheit = this.convertToFahrenheit(tempCelcius);

    const feelsLikeCelcius = this.convertToCelcius(weather.main.feels_like);
    const feelsLikeFahrenheit = this.convertToFahrenheit(feelsLikeCelcius);

    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = `${tempFahrenheit}° F (${tempCelcius}° C)`;
    this.icon.setAttribute(
      "src",
      ` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    );
    this.humidity.textContent = `Relative Humidity : ${weather.main.humidity}%`;
    this.pressure.textContent = `Pressure : ${weather.main.pressure} hPa`;
    this.feelslike.textContent = `Feels Like : ${feelsLikeFahrenheit}° F (${feelsLikeCelcius}° C)`;
    this.wind.textContent = `Wind :  ${this.getCardinalDirection(
      weather.wind.deg
    )}`;
  }

  showAlert(msg) {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".rounded");
    const location = document.querySelector("#w-location");

    container.insertBefore(div, location);

    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    document.querySelector(".alert").remove();
  }

  convertToCelcius(kelvin) {
    const celcius = Math.floor(kelvin - 273);
    return celcius;
  }

  convertToFahrenheit(celcius) {
    const fahrenheit = Math.floor(celcius * (9 / 5) + 32);
    return fahrenheit;
  }

  // Go to : https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words
  getCardinalDirection(angle) {
    const directions = [
      "↑ N",
      "↗ NE",
      "→ E",
      "↘ SE",
      "↓ S",
      "↙ SW",
      "← W",
      "↖ NW",
    ];
    return directions[Math.round(angle / 45) % 8];
  }

  // Go to : https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words
  // degToCompass(num) {
  //   const value = Math.floor(num / 22.5 + 0.5);
  //   const arr = [
  //     "N",
  //     "NNE",
  //     "NE",
  //     "ENE",
  //     "E",
  //     "ESE",
  //     "SE",
  //     "SSE",
  //     "S",
  //     "SSW",
  //     "SW",
  //     "WSW",
  //     "W",
  //     "WNW",
  //     "NW",
  //     "NNW",
  //   ];
  //   return arr[value % 16];
  // }

  // Conversion : 1 Hectopascals = 0.4015 Inches of water
  // hPaToInOfWater(num) {
  //   const convertNum = Math.round((num * 0.4015) / 1);
  //   return convertNum;
  // }
}

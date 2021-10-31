const storage = new LocalStorage();
const weatherLocation = storage.getLocationData();
// Init Weather & UI
const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI();

const getWeather = async () => {
  try {
    const response = await weather.getWeather();

    if (response.cod !== 200) {
      throw response;
    } else {
      return ui.paint(response);
    }
  } catch (error) {
    ui.showAlert(`${error.message}, please try again.`);
  }
};

document.getElementById("w-change-btn").addEventListener("click", (e) => {
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;

  weather.changeLocation(city, state);

  storage.setLocationData(city, state);

  getWeather();

  $("#locModal").modal("hide");
});

document.addEventListener("DOMContentLoaded", getWeather);
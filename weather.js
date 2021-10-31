class Weather {
  constructor(city, state) {
    this.city = city;
    this.state = state;
  }
  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`/.netlify/functions/getWeather`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: this.city,
        state: this.state,
      }),
    });

    const data = await response.json();

    return data;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}

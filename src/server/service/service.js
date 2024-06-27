const axios = require("axios");

class ServerService {
  constructor() {
    this.apiKey = "64c9c702dcce4e3eb9295411241104";
  }

  async getWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }
}

module.exports = { ServerService }; // Экспорт класса ServerService

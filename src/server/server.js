const express = require("express");
const { ServerService } = require("./service/service");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());

// Создаем экземпляр сервиса
const weatherService = new ServerService(); // Используем заглавную букву ServerService

// Обработка GET запросов
app.get("/weather", async (req, res) => {
  const city = req.query.city;

  try {
    const weatherData = await weatherService.getWeather(city);
    res.json(weatherData);
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
    res.status(500).json({ error: "Не удалось получить данные о погоде" });
  }
});

// Запускаем Express сервер
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

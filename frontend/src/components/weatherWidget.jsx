import { useEffect, useState } from "react";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  const getWeatherEmoji = (icon) => {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "🌙",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[icon] || "🌤️";
  };

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Colombo&appid=6f9ec36adc7fdc52acf07e4806a2a4bc&units=metric"
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  }, []);

  if (!weather) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        Loading weather...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-sky-500 to-blue-700 text-white rounded-3xl shadow-2xl p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          <span role="img" aria-hidden="true">📍</span> Colombo
        </h2>

        <div className="text-7xl my-4">
          <span role="img" aria-hidden="true">{getWeatherEmoji(weather.weather[0].icon)}</span>
        </div>

        <h1 className="text-6xl font-bold">
          {Math.round(weather.main.temp)}°
        </h1>

        <p className="text-xl capitalize mt-2">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white/20 rounded-xl p-4 text-center">
          <p className="text-sm">Humidity</p>
          <p className="text-2xl font-bold">
            {weather.main.humidity}%
          </p>
        </div>

        <div className="bg-white/20 rounded-xl p-4 text-center">
          <p className="text-sm">Feels Like</p>
          <p className="text-2xl font-bold">
            {Math.round(weather.main.feels_like)}°
          </p>
        </div>

        <div className="bg-white/20 rounded-xl p-4 text-center">
          <p className="text-sm">Wind</p>
          <p className="text-2xl font-bold">
            {weather.wind.speed} m/s
          </p>
        </div>

        <div className="bg-white/20 rounded-xl p-4 text-center">
          <p className="text-sm">Pressure</p>
          <p className="text-2xl font-bold">
            {weather.main.pressure}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
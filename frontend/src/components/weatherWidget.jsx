import { useEffect, useState } from "react";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );

          const data = await response.json();

          if (data.cod !== 200) {
            throw new Error(data.message);
          }

          setWeather(data);
        } catch (err) {
          setError("Failed to load weather data");
        }
      },
      () => setError("Location permission denied")
    );
  }, []);

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
        {error}
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        Loading weather...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm border border-green-100">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Weather Near You
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">📍 Location:</span> {weather.name}
        </p>

        <p>
          <span className="font-semibold">🌡 Temperature:</span>{" "}
          {Math.round(weather.main.temp)}°C
        </p>

        <p>
          <span className="font-semibold">☁ Condition:</span>{" "}
          {weather.weather[0].description}
        </p>

        <p>
          <span className="font-semibold">💧 Humidity:</span>{" "}
          {weather.main.humidity}%
        </p>

        <p>
          <span className="font-semibold">💨 Wind:</span>{" "}
          {weather.wind.speed} m/s
        </p>
      </div>
    </div>
  );
}

export default WeatherWidget;
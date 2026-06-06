import { useState } from "react";

function LocationFinder() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);

        setLocation(`${lat}, ${lng}`);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Unable to retrieve location");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <div className="location-card">
      <h3>Your Location</h3>

      <button
        className="secondary-btn"
        onClick={getLocation}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Locating..." : "Find My Location"}
      </button>

      {location && (
        <p className="location-text">
          <strong>Coordinates:</strong> {location}

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Map
          </a>
        </p>
      )}

      {error && (
        <p className="location-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default LocationFinder;
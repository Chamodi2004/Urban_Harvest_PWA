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
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	};

	return (
		<div className="card" style={{ maxWidth: 420 }}>
			<h3 style={{ marginTop: 0 }}>Your Location</h3>

			<button
				className="secondary-btn"
				onClick={getLocation}
				disabled={loading}
				aria-busy={loading}
			>
				{loading ? "Locating..." : "Find My Location"}
			</button>

			{location && (
				<p style={{ marginTop: 12 }}>
					<strong>Coordinates:</strong> {location}
					{" "}
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
							location
						)}`}
						target="_blank"
						rel="noreferrer"
						style={{ display: "inline-block", marginLeft: 8 }}
					>
						View on map
					</a>
				</p>
			)}

			{error && <p style={{ color: "#b00020", marginTop: 12 }}>{error}</p>}
		</div>
	);
}

export default LocationFinder;
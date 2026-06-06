import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const sampleEvents = [
  {
    _id: "1",
    title: "Urban Gardening Workshop",
    description: "Learn to grow vegetables in small spaces",
    category: "Gardening",
    location: "Downtown Park",
    image: "/workshop.jpg",
    date: "2026-06-15"
  },
  {
    _id: "2",
    title: "Composting 101",
    description: "Master the art of composting for your garden",
    category: "Composting",
    location: "Community Center",
    image: "/composite bin.jpg",
    date: "2026-06-20"
  },
  {
    _id: "3",
    title: "Recycling Drive",
    description: "Join our community recycling initiative",
    category: "Recycling",
    location: "Main Street",
    image: "/recycling.jpg",
    date: "2026-06-25"
  }
];

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        setEvents(res.data && res.data.length > 0 ? res.data : sampleEvents);
      })
      .catch((err) => {
        console.error(err);
        setEvents(sampleEvents);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchMatch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      event.category === category;

    return searchMatch && categoryMatch;
  });

  if (loading) {
    return (
      <div className="container">
        <h2>Loading events...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Events</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="All">
          All Categories
        </option>

        <option value="Gardening">
          Gardening
        </option>

        <option value="Composting">
          Composting
        </option>

        <option value="Recycling">
          Recycling
        </option>
      </select>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="cards-grid">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="card"
            >
              <img
                src={event.image}
                alt={event.title}
              />

              <h3>{event.title}</h3>

              <p>{event.description}</p>

              <p>
                <strong>Category:</strong>{" "}
                {event.category}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {event.location}
              </p>

              <Link
                to={`/events/${event._id}`}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
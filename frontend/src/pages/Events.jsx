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

  // Authentication & CRUD States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventCategory, setEventCategory] = useState("Gardening");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("/workshop.jpg");

  const fetchEvents = () => {
    setLoading(true);
    api
      .get("/events")
      .then((res) => {
        setEvents(res.data && res.data.length > 0 ? res.data : sampleEvents);
      })
      .catch((err) => {
        console.error("Failed to fetch events from API:", err);
        setEvents(sampleEvents);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      title,
      description,
      category: eventCategory,
      location,
      date,
      image
    };

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, eventData);
        alert("Event updated successfully!");
      } else {
        await api.post("/events", eventData);
        alert("Event created successfully!");
      }

      // Reset Form State
      setTitle("");
      setDescription("");
      setEventCategory("Gardening");
      setLocation("");
      setDate("");
      setImage("/workshop.jpg");
      setEditingId(null);
      setShowForm(false);

      // Refresh data
      fetchEvents();
    } catch (error) {
      console.error("CRUD operation failed:", error);
      alert("Operation failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setTitle(event.title || "");
    setDescription(event.description || "");
    setEventCategory(event.category || "Gardening");
    setLocation(event.location || "");
    setDate(event.date ? event.date.substring(0, 10) : "");
    setImage(event.image || "/workshop.jpg");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      alert("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Delete operation failed:", error);
      alert("Delete failed: " + (error.response?.data?.message || error.message));
    }
  };

  const filteredEvents = events.filter((event) => {
    const searchMatch = (event.title || "")
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
      <h1 className="text-5xl font-bold text-center text-red-500 mb-8">
  Events
</h1>

      {/* CRUD Add Button */}
      {isLoggedIn && (
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <button
            className="primary-btn"
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingId(null);
                setTitle("");
                setDescription("");
                setLocation("");
                setDate("");
              }
            }}
          >
            {showForm ? "Cancel" : "Add New Event"}
          </button>
        </div>
      )}

      {/* CRUD Form */}
      {showForm && (
        <div className="card" style={{ maxWidth: "600px", margin: "0 auto 40px auto", padding: "30px" }}>
          <h2>{editingId ? "Edit Event" : "Create Event"}</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "var(--text)" }}>Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Tree Planting Drive"
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "var(--text)" }}>Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe the event..."
                rows="4"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid #d6e3d6",
                  background: "#fbfdfb",
                  color: "#17321f",
                  fontFamily: "inherit"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "var(--text)" }}>Category</label>
              <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
                <option value="Gardening">Gardening</option>
                <option value="Composting">Composting</option>
                <option value="Recycling">Recycling</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "var(--text)" }}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Community Garden"
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "var(--text)" }}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "var(--text)" }}>Image Preset</label>
              <select value={image} onChange={(e) => setImage(e.target.value)}>
                <option value="/workshop.jpg">Workshop (Default)</option>
                <option value="/composite bin.jpg">Composting</option>
                <option value="/recycling.jpg">Recycling</option>
                <option value="/gardening.jpg">Gardening</option>
                <option value="/seeds.jpg">Seeds</option>
              </select>
            </div>
            <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: "10px" }}>
              {editingId ? "Save Changes" : "Create Event"}
            </button>
          </form>
        </div>
      )}

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Gardening">Gardening</option>
        <option value="Composting">Composting</option>
        <option value="Recycling">Recycling</option>
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

              <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "16px" }}>
                <Link
                  to={`/events/${event._id}`}
                  style={{ flex: 1, textAlign: "center", marginTop: 0 }}
                >
                  View Details
                </Link>
                
                {isLoggedIn && (
                  <>
                    <button
                      className="secondary-btn"
                      onClick={() => handleEdit(event)}
                      style={{ padding: "10px 16px", fontSize: "0.95rem", borderRadius: "8px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="primary-btn"
                      onClick={() => handleDelete(event._id)}
                      style={{ padding: "10px 16px", fontSize: "0.95rem", borderRadius: "8px", background: "#c62828", boxShadow: "none" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
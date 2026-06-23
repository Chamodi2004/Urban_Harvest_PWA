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
    date: "2026-06-15",
  },
  {
    _id: "2",
    title: "Composting 101",
    description: "Master the art of composting for your garden",
    category: "Composting",
    location: "Community Center",
    image: "/composite bin.jpg",
    date: "2026-06-20",
  },
  {
    _id: "3",
    title: "Recycling Drive",
    description: "Join our community recycling initiative",
    category: "Recycling",
    location: "Main Street",
    image: "/recycling.jpg",
    date: "2026-06-25",
  },
];

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

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
      .get("/api/events")
      .then((res) => {
        setEvents(res.data?.length ? res.data : sampleEvents);
      })
      .catch(() => {
        // Offline / network error fallback: load and merge local storage changes
        const offlineEvents = JSON.parse(localStorage.getItem("offline_events") || "[]");
        const editedEvents = JSON.parse(localStorage.getItem("edited_events") || "{}");
        const deletedEvents = JSON.parse(localStorage.getItem("deleted_events") || "[]");

        // Filter out deleted events from sampleEvents
        let merged = sampleEvents.filter((event) => !deletedEvents.includes(event._id));

        // Apply edits to remaining sampleEvents
        merged = merged.map((event) => {
          if (editedEvents[event._id]) {
            return { ...event, ...editedEvents[event._id] };
          }
          return event;
        });

        // Append offline created events
        merged = [...merged, ...offlineEvents];

        setEvents(merged);
      })
      .finally(() => setLoading(false));
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
      image,
    };

    try {
      if (editingId) {
        await api.put(`/api/events/${editingId}`, eventData);
      } else {
        await api.post("/api/events", eventData);
      }

      setTitle("");
      setDescription("");
      setEventCategory("Gardening");
      setLocation("");
      setDate("");
      setImage("/workshop.jpg");
      setEditingId(null);
      setShowForm(false);

      fetchEvents();
    } catch (error) {
      if (!error.response) {
        // Backend is down / network error -> Offline mode
        if (editingId) {
          // Edit event offline
          if (String(editingId).startsWith("mock-event-")) {
            // It's an offline-created event, update it in offline_events
            const offlineEvents = JSON.parse(localStorage.getItem("offline_events") || "[]");
            const updatedOffline = offlineEvents.map((evt) =>
              evt._id === editingId ? { ...evt, ...eventData } : evt
            );
            localStorage.setItem("offline_events", JSON.stringify(updatedOffline));
          } else {
            // It's a backend or sample event, save edits to edited_events
            const editedEvents = JSON.parse(localStorage.getItem("edited_events") || "{}");
            editedEvents[editingId] = { ...eventData, _id: editingId };
            localStorage.setItem("edited_events", JSON.stringify(editedEvents));
          }
          alert("Event updated successfully (Offline Mode)");
        } else {
          // Create event offline
          const newId = `mock-event-${Date.now()}`;
          const newEvent = { ...eventData, _id: newId };
          const offlineEvents = JSON.parse(localStorage.getItem("offline_events") || "[]");
          offlineEvents.push(newEvent);
          localStorage.setItem("offline_events", JSON.stringify(offlineEvents));
          alert("Event created successfully (Offline Mode)");
        }

        setTitle("");
        setDescription("");
        setEventCategory("Gardening");
        setLocation("");
        setDate("");
        setImage("/workshop.jpg");
        setEditingId(null);
        setShowForm(false);

        fetchEvents();
        return;
      }
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setTitle(event.title);
    setDescription(event.description);
    setEventCategory(event.category);
    setLocation(event.location);
    setDate(event.date?.substring(0, 10));
    setImage(event.image);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;

    try {
      await api.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      if (!error.response) {
        // Backend is down / network error -> Offline mode
        if (String(id).startsWith("mock-event-")) {
          // Delete from offline_events
          const offlineEvents = JSON.parse(localStorage.getItem("offline_events") || "[]");
          const updatedOffline = offlineEvents.filter((evt) => evt._id !== id);
          localStorage.setItem("offline_events", JSON.stringify(updatedOffline));
        } else {
          // Add to deleted_events
          const deletedEvents = JSON.parse(localStorage.getItem("deleted_events") || "[]");
          if (!deletedEvents.includes(id)) {
            deletedEvents.push(id);
            localStorage.setItem("deleted_events", JSON.stringify(deletedEvents));
          }
        }
        alert("Event deleted successfully (Offline Mode)");
        fetchEvents();
        return;
      }
      alert(error.message);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || event.category === category;

    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="page-content">
        <h2 className="text-xl font-semibold text-green-900">
          Loading events...
        </h2>
      </div>
    );
  }

  return (
    <div className="page-content">

      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-900 mb-8 sm:mb-10">
        Events
      </h1>

      {/* ADD BUTTON */}
      {isLoggedIn && (
        <div className="text-center mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
            }}
            className="px-6 py-3 min-h-11 bg-green-700 text-white font-bold rounded-full hover:bg-green-800 transition"
          >
            {showForm ? "Cancel" : "Add New Event"}
          </button>
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto mb-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-900">
            {editingId ? "Edit Event" : "Create Event"}
          </h2>

          <input
            className="w-full p-3 border rounded-xl bg-green-50 mb-4"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-3 border rounded-xl bg-green-50 mb-4"
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-xl bg-green-50 mb-4"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
          >
            <option>Gardening</option>
            <option>Composting</option>
            <option>Recycling</option>
          </select>

          <input
            className="w-full p-3 border rounded-xl bg-green-50 mb-4"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="date"
            className="w-full p-3 border rounded-xl bg-green-50 mb-4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-xl bg-green-50 mb-4"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          >
            <option value="/workshop.jpg">Workshop</option>
            <option value="/composite bin.jpg">Composting</option>
            <option value="/recycling.jpg">Recycling</option>
            <option value="/gardening.jpg">Gardening</option>
          </select>

          <button className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800">
            {editingId ? "Save Changes" : "Create Event"}
          </button>
        </form>
      )}

      {/* SEARCH */}
      <input
        className="w-full p-3 mb-4 border border-green-200 rounded-xl bg-green-50"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <select
        className="w-full p-3 mb-6 border border-green-200 rounded-xl bg-green-50"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Gardening">Gardening</option>
        <option value="Composting">Composting</option>
        <option value="Recycling">Recycling</option>
      </select>

      {/* CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
          >
            <img
              src={event.image}
              className="w-full h-48 object-cover rounded-xl mb-4"
              alt={event.title}
              width="400"
              height="192"
              loading="lazy"
              decoding="async"
            />

            <h3 className="text-xl font-bold text-green-900 mb-2">
              {event.title}
            </h3>

            <p className="text-gray-600 mb-2">{event.description}</p>

            <p className="text-sm text-gray-500">
              <b>Category:</b> {event.category}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              <b>Location:</b> {event.location}
            </p>

            <div className="event-actions">
              <Link
                to={`/events/${event._id}`}
                className="text-center bg-green-700 text-white py-2.5 px-4 rounded-xl font-semibold hover:bg-green-800 inline-flex items-center justify-center"
              >
                View
              </Link>

              {isLoggedIn && (
                <>
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-4 py-2.5 bg-yellow-500 text-white rounded-xl font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="px-4 py-2.5 bg-red-600 text-white rounded-xl font-semibold"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
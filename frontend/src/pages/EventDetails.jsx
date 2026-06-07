import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch(() => {
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
        const found = sampleEvents.find((e) => e._id === id);
        if (found) {
          setEvent(found);
        }
      });
  }, [id]);

  if (!event) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <article className="detail-card">
        <img
          src={event.image}
          alt={event.title}
          width="800"
          height="420"
          loading="lazy"
          decoding="async"
        />

        <h1>{event.title}</h1>

        <p>{event.description}</p>

        <p>
          <strong>Category:</strong> {event.category}
        </p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>
      </article>
    </div>
  );
}

export default EventDetails;
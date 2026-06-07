import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then((res) => {
        setEvent(res.data);
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
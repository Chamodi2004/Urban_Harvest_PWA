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
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <img
        src={event.image}
        alt={event.title}
        width="500"
      />

      <h1>{event.title}</h1>

      <p>{event.description}</p>

      <p>
        <strong>Category:</strong>
        {event.category}
      </p>

      <p>
        <strong>Location:</strong>
        {event.location}
      </p>
    </div>
  );
}

export default EventDetails;
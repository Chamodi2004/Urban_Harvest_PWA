import { useEffect, useState } from "react";
import api from "../services/api";

const sampleWorkshops = [
  {
    _id: "1",
    title: "Beginner's Gardening",
    description: "Learn the basics of home gardening",
    instructor: "Sarah Green",
    image: "/workshop.jpg"
  },
  {
    _id: "2",
    title: "Advanced Composting Techniques",
    description: "Master composting methods for different climates",
    instructor: "John Brown",
    image: "/composite bin.jpg"
  },
  {
    _id: "3",
    title: "Sustainable Living 101",
    description: "Reduce your environmental footprint",
    instructor: "Emily Earth",
    image: "/recycling.jpg"
  }
];

function Workshops() {

  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    api.get("/api/workshops")
      .then((res) => {
        setWorkshops(res.data && res.data.length > 0 ? res.data : sampleWorkshops);
      })
      .catch(() => {
        setWorkshops(sampleWorkshops);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-900 mb-10">
  Workshops
</h1>

      <div className="cards-grid">
        {workshops.map((workshop) => (
          <div key={workshop._id} className="card">

            <img
              src={workshop.image}
              alt={workshop.title}
              width="400"
              height="200"
              loading="lazy"
              decoding="async"
            />

            <h3>{workshop.title}</h3>

            <p>{workshop.description}</p>

            <p><strong>Instructor:</strong> {workshop.instructor}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Workshops;
import { useEffect, useState } from "react";
import api from "../services/api";

const sampleProducts = [
  {
    _id: "1",
    name: "Organic Seeds Pack",
    description: "High quality organic seeds for vegetables",
    price: 499,
    image: "/seeds.jpg"
  },
  {
    _id: "2",
    name: "Eco-Friendly Compost Bin",
    description: "Perfect for composting food waste",
    price: 1999,
    image: "/composite bin.jpg"
  },
  {
    _id: "3",
    name: "Bamboo Garden Tools Set",
    description: "Sustainable garden tools made from bamboo",
    price: 799,
    image: "/tools.jpg"
  }
];

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data && res.data.length > 0 ? res.data : sampleProducts);
      })
      .catch(() => {
        setProducts(sampleProducts);
      });
  }, []);

  return (
    <div className="container">
     <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-900 mb-10">
  Products
</h1>

      <div className="cards-grid">
        {products.map((product) => (
          <div key={product._id} className="card">

            <img
              src={product.image}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p><strong>Rs. {product.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

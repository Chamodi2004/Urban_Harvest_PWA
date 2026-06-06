const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes =
  require("./routes/eventRoutes");

const productRoutes =
  require("./routes/productRoutes");

const workshopRoutes =
  require("./routes/workshopRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send(
    "Urban Harvest Hub API Running"
  );
});

app.use("/events", eventRoutes);
app.use("/products", productRoutes);
app.use("/workshops", workshopRoutes);
app.use(
  "/api/auth",
  authRoutes
);

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
const express = require("express");
const mongoose = require("mongoose");
const AdminRouter = require("./routes/admin-routes");
const ProjectRouter = require("./routes/project-routes")
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://promange-app-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/admin", AdminRouter);
app.use("/api/projects" , ProjectRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

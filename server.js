// app.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth/user");
const adminRoutes = require("./routes/auth/admin");
const taskRoutes = require("./routes/task/task");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://shikamaru:nara@projectmanagement.zotqcex.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

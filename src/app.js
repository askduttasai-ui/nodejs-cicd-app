const express = require("express");
const dotenv  = require("dotenv");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    status      : "success",
    message     : "Node.js CI/CD App is Running!",
    version     : "1.0.0",
    environment : process.env.NODE_ENV || "development"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status    : "healthy",
    uptime    : process.uptime(),
    timestamp : new Date().toISOString()
  });
});

app.get("/api/info", (req, res) => {
  res.status(200).json({
    app     : "nodejs-cicd-app",
    version : "1.0.0",
    author  : "DevOps Engineer",
    cicd    : "GitHub Actions"
  });
});

app.get("/api/greet/:name", (req, res) => {
  const { name } = req.params;
  if (!name || name.trim() === "") {
    return res.status(400).json({ status: "error", message: "Name parameter is required" });
  }
  res.status(200).json({
    status  : "success",
    message : `Hello, ${name}! Welcome to CI/CD with GitHub Actions!`
  });
});

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

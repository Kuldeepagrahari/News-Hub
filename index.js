import express from "express";
import fetch from "node-fetch"; // for API calls
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = 106;

// Enable CORS so frontend can access backend
app.use(cors());

app.use(express.static("public"));

// Test route
app.get("/", (req, res) => res.send("✅ Server is live... at " + PORT));

// === News API proxy route ===
const API_KEY = process.env.API_KEY;
console.log("api key: " + API_KEY)

app.get("/api/news", async (req, res) => {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=india&pageSize=100&apiKey=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// 2️⃣ Query route: search specific topic
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q || "india";
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching search results:", err);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

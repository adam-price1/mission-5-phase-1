import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import auctionRoutes from "./routes/auctionRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Mission 5 API is running 🚀" });
});

// Auction routes
app.use("/api/auctions", auctionRoutes);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start();

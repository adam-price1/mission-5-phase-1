import express from "express";
import Auction from "../models/auction.js";

const router = express.Router();

// ✅ GET /api/auctions?search=keyword
router.get("/", async (req, res) => {
  try {
    const query = req.query.search || "";

    const items = await Auction.find({
      $or: [
        { title: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
      ],
    });

    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching auctions:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

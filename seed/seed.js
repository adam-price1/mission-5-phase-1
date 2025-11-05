import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Auction from "../src/models/auction.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function connect() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
}

async function seedData() {
  try {
    await connect();

    const filePath = path.join(__dirname, "seedData.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    await Auction.deleteMany({});
    await Auction.insertMany(data);

    console.log("✅ Seeded auction data successfully");
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

async function clearData() {
  try {
    await connect();
    await Auction.deleteMany({});
    console.log("🧹 Cleared auction data successfully");
  } catch (error) {
    console.error("❌ Error clearing data:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

const command = process.argv[2];

if (command === "seed") {
  seedData();
} else if (command === "clear") {
  clearData();
} else {
  console.log("Usage: node seed/seed.js [seed|clear]");
}

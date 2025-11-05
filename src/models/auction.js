import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    start_price: { type: Number, required: true },
    reserve_price: { type: Number, required: true },
  },
  { timestamps: true }
);

// ✅ create model
const Auction = mongoose.model("Auction", auctionSchema);

// ✅ export it as default (critical for import Auction from "...")
export default Auction;

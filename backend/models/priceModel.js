import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
  centre: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Centre",
  },
  name: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Item",
  },
  price: {
    type: Number,
    require: true,
    default: 0.0,
  },
  date: {
    type: Date,
    require: true,
  },
});

const Price = mongoose.model("Price", priceSchema);

export default Price;

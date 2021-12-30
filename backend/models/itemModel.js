import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;

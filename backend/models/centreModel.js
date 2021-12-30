import mongoose from "mongoose";

const centreSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Centre = mongoose.model("Centre", centreSchema);

export default Centre;

import { mongoose } from "mongoose";

const itemSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required:true
  },
  cost: {
    type: Number,
    required: true
  },
});

const Item = mongoose.model("item", itemSchema);

export default Item
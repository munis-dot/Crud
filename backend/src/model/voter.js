import { mongoose } from "mongoose";

const voterSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required:true
  },
  address: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required: true
  }
});

const Voter = mongoose.model("voter", voterSchema);

export default Voter
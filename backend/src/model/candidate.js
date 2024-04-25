import { mongoose } from "mongoose";

const candidateSchema = new mongoose.Schema({
  symbol: {
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
  },
  count:{
    type:Number
  }
});

const Candidate = mongoose.model("candidate", candidateSchema);

export default Candidate
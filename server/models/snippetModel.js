import mongoose from "mongoose";
// import User from "./userModel.js";
import User from "./User.js";
const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  language: {
    type: String
  },
  code: {
    type: String,
    required: true
  },
  tags: [String],
  description: String,
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Snippet", snippetSchema);
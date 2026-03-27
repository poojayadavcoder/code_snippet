import mongoose from "mongoose";

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
  description: String
}, { timestamps: true });

export default mongoose.model("Snippet", snippetSchema);
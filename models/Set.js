import mongoose from "mongoose";
import Todo from "./Todo";

const SetSchema = new mongoose.Schema({
  todos: {
    type: [Todo]
  },
  for: {
    type: Date,
    required: true
  }
})

export default mongoose.model('Set', SetSchema)
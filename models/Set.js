import mongoose from "mongoose";
// import Todo, { TodoSchema } from "./Todo.js";

const SetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "New Set"
  },
  todos: {
    type: [mongoose.Types.ObjectId],
    ref: 'Todo',
    required: true
  },
  // for: {
  //   type: Date,
  //   required: true
  // },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  }
},
  { timestamps: true }
)

export default mongoose.model('Set', SetSchema)
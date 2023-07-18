import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  }
})

export default mongoose.model('Todo', TodoSchema)
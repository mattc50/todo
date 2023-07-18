import mongoose from "mongoose";

/*export*/ const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  belongsTo: {
    type: [mongoose.Types.ObjectId],
    ref: 'Set',
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  }
},
  { timestamps: true }
)

export default mongoose.model('Todo', TodoSchema)
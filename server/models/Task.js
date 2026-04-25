import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    default: 'Misc'
  },
  packed: {
    type: Boolean,
    default: false
  },
  tripDestination: {
    type: String,
    trim: true
  },
  tripType: {
    type: String
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;

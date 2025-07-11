import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low', 'Lowest'],
    default: 'Medium',
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  trashed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);

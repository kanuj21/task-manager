const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  isExpired: { type: Boolean, default: false }, // New field added
});

taskSchema.pre('save', function (this:any, next:any) {
  this.isExpired = this.status !== 'Completed' && new Date() > this.deadline;
  next();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
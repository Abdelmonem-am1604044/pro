import { Schema, models, model } from "mongoose";

const tasksSchema = new Schema({
  taskId: {
    type: Number,
  },
  surahId: {
    type: Number,
  },
  studentId: {
    type: Number,
  },
  studentName: {
    type: String,
  },
  surahName: {
    type: String,
  },
  fromAya: {
    type: Number,
  },
  toAya: {
    type: Number,
  },
  type: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  masteryLevel: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const Tasks = models.task || model("task", tasksSchema);
export default Tasks;

import { Schema, models, model } from "mongoose";

const teachersSchema = new Schema({
  staffNo: {
    type: Number,
  },
  userName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  halaqa: {
    type: String,
  },
  isCoordinator: {
    type: Boolean,
  },
});

const Teachers = models.teachers || model("teachers", teachersSchema);
export default Teachers;

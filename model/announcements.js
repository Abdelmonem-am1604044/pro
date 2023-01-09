import { Schema, models, model } from "mongoose";

const announcmentsSchema = new Schema({
  to: {
    type: String,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Announcements =
  models.announcements || model("announcements", announcmentsSchema);
export default Announcements;

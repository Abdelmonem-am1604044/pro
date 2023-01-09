import { Schema, models, model } from "mongoose";

const messagesSchema = new Schema({
  to: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Messages = models.messages || model("messages", messagesSchema);
export default Messages;

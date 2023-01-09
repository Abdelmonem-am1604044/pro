import mongoose from "mongoose";
const MONGODB_URI =
  "mongodb+srv://admin:admin@halaqametrash.bcdwu0q.mongodb.net/?retryWrites=true&w=majority";
// const connection = {};

const connect = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    console.log("connection: " + connection.readyState);
    if (connection.readyState == 1) {
      console.log("database connected");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connect;

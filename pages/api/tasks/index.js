import Tasks from "../../../model/task";
import { runMiddleware } from "../../../database/rumMiddleware";
import Morgan from "morgan";
import connect from "../../../database/mongodb";

export default async (req, res) => {
  const { method, body } = req;
  const morgan = Morgan("dev");
  connect().catch(() => res.status(405).json({ error: "Error in connection" }));

  switch (method) {
    case "GET":
      try {
        const tasks = await Tasks.find();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "POST":
      try {
        const newTask = new Tasks(body);
        const savedTask = await newTask.save();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(savedTask);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};

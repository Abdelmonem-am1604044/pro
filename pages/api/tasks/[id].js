import Tasks from "../../../model/task";
import { runMiddleware } from "../../../database/rumMiddleware";
import Morgan from "morgan";
import connect from "../../../database/mongodb";

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  const morgan = Morgan("dev");
  connect().catch(() => res.status(405).json({ error: "Error in connection" }));

  switch (method) {
    case "GET":
      try {
        const tasks = await Tasks.findById(id);
        if (!tasks) return res.status(404).json({ msg: "task doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedTask = await Tasks.findByIdAndDelete(id);
        if (!deletedTask)
          return res.status(404).json({ msg: "Task doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(204).json();
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, body);
        if (!updatedTask)
          return res.status(404).json({ msg: "task doesn't exists" });
        return res.status(200).json(updatedTask);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};

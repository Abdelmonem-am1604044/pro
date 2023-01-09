import Teachers from "../../../model/teachers";
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
        const { email, password } = req.body;
        const teachers = await Teachers.find();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(teachers);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "POST":
      try {
        const newTeacher = new Teachers(body);
        const saved = await newTeacher.save();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(saved);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};

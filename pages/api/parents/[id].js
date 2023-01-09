import Students from "../../../model/student";
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
        const student = await Students.findById(id);
        if (!student)
          return res.status(404).json({ msg: "student doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(student);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedStudent = await Students.findByIdAndDelete(id);
        if (!deletedStudent)
          return res.status(404).json({ msg: "Student doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(204).json();
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatedStudent = await Students.findByIdAndUpdate(id, body);
        if (!updatedStudent)
          return res.status(404).json({ msg: "Student doesn't exists" });
        return res.status(200).json(updatedStudent);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};

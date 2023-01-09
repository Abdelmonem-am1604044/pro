import Messages from "../../../model/messages";
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
        const message = await Messages.findById(id);
        if (!message)
          return res.status(404).json({ msg: "message doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(message);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedMessage = await Messages.findByIdAndDelete(id);
        if (!deletedMessage)
          return res.status(404).json({ msg: "message doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(204).json();
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatedMessage = await Messages.findByIdAndUpdate(id, body);

        if (!updatedMessage)
          return res.status(404).json({ msg: "message doesn't exists" });
        return res.status(200).json(updatedMessage);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};

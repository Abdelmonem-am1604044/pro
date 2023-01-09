import Announcements from "../../../model/announcements";
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
        const announcements = await Announcements.findById(id);
        if (!announcements)
          return res.status(404).json({ msg: "announcements doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(announcements);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedAnnouncement = await Announcements.findByIdAndDelete(id);
        if (!deletedAnnouncment)
          return res.status(404).json({ msg: "announcements doesn't exists" });
        await runMiddleware(req, res, morgan);
        return res.status(204).json();
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatedAnnouncement = await Announcements.findByIdAndUpdate(
          id,
          body
        );

        if (!updatedAnnouncement)
          return res.status(404).json({ msg: "announcement doesn't exists" });
        return res.status(200).json(updatedAnnouncement);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};

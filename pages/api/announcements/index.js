import Announcements from "../../../model/announcements";
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
        const announcements = await Announcements.find();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(announcements);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "POST":
      try {
        const newAnnouncements = new Announcements(body);
        const savedAnnouncement = await newAnnouncements.save();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(savedAnnouncement);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};

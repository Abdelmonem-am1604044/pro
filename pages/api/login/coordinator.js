import Teachers from "../../../model/teachers";
import connect from "../../../database/mongodb";
export default async function handler(req, res) {
  connect().catch(() => res.status(405).json({ error: "Error in connection" }));

  const { email, password } = req.query;
  const user = await Teachers.findOne({ email, password, isCoordinator: true });
  if (!user) {
    return res.json({
      status:
        "Not able to log in, make sure to type in the correct email , password and make sure that the use is a coordinator",
    });
  } else {
    return res.json({ user });
  }
}

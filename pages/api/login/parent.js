import Students from '../../../model/student';
import connect from '../../../database/mongodb';
export default async function handler(req, res) {
  connect().catch(() => res.status(405).json({ error: 'Error in connection' }));

  const { email, password } = req.query;
  console.log(await Students.find());
  const user = await Students.findOne({ email, password });
  if (!user) {
    return res.json({ user: null });
  } else {
    return res.json({ user });
  }
}

import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
export default async function handler(req, res) {
    await connectToDatabase();
    if (req.method === "POST") {
        try {
            const user = await User.create(req.body);
            return res.status(201).json({ success: true, data: user });
        } catch (error) {
            return res.status(400).json({
                success: false, error: error.message
            });
        }
    } else if (req.method === "GET") {
        const users = await User.find();
        return res.status(200).json({ success: true, data: users });
    } else {
        return res.status(405).json({ message: "Método no permitido" });
    }
}
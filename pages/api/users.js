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
    } else if (req.method === "PUT") {
        try {
            const { id, ...updateData } = req.body;
            const user = await User.findByIdAndUpdate(id, updateData, { new: true });
            if (!user) {
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });
            }
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            return res.status(400).json({
                success: false, error: error.message
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const { id } = req.body;
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });
            }
            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            return res.status(400).json({
                success: false, error: error.message
            });
        }
    } else {
        return res.status(405).json({ message: "Método no permitido" });
    }
}
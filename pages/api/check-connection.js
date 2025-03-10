import dbConnect from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ message: "Conexión a MongoDB exitosa 🚀" });
  } catch (error) {
    res.status(500).json({ message: "Error al conectar a MongoDB ❌", error: error.message });
  }
}

import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const userExists = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Username already taken" });
    }

    await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);

    res.status(201).json({
      success: true,
      data: { message: "Usuário criado com sucesso." },
    });
  } catch {
    res.status(500)
  }  
})

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const userResult = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = userResult.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    res.status(201).json({
      success: true,
      data: { message: "Usuário criado com sucesso." },
    });
  } catch {
    res.status(500)
  }
})
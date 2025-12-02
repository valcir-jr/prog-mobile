import express from "express";
import cors from "cors";
import db from "./config/db.js";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, type } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const userExists = await db.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Username already taken" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (username, password, type) VALUES ($1, $2, $3) RETURNING id, username, type",
      [username, hashedPwd, parseInt(type)]
    );

    const newUser = result.rows[0];

    return res.status(201).json({
      success: true,
      data: { user: newUser, message: "Usuário criado com sucesso." },
    });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const userResult = await db.query(
      "SELECT username, password, type FROM users WHERE username = $1",
      [username]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const { password: pwd, ...userData } = user;

    return res.status(200).json({
      success: true,
      data: { user: userData, message: "Usuário logado com sucesso." },
    });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

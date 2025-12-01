import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

// ==============================================================<<

app.post("/professores", async (req, res) => {
  try {
    const { nome, titulacao, tempo_docencia } = req.body;
    if (!nome || !titulacao || tempo_docencia == null) {
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
    }

    const result = await db.query(
      "INSERT INTO teachers (name, title, teaching_time) VALUES ($1, $2, $3) RETURNING *",
      [nome, titulacao, tempo_docencia]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.post("/disciplinas", async (req, res) => {
  try {
    const { nome, carga_horaria, professor_id } = req.body;
    if (!nome || !carga_horaria || !professor_id) {
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
    }

    const professor = await db.query("SELECT id FROM teachers WHERE id = $1", [professor_id]);
    if (professor.rows.length === 0) return res.status(404).json({ success: false, message: "Professor não encontrado" });

    const result = await db.query(
      "INSERT INTO subjects (name, workload, professor_id) VALUES ($1, $2, $3) RETURNING *",
      [nome, carga_horaria, professor_id]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.post("/alunos", async (req, res) => {
  try {
    const { nome, matricula, curso } = req.body;
    if (!nome || !matricula || !curso) return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });

    const result = await db.query(
      "INSERT INTO students (name, registration, course) VALUES ($1, $2, $3) RETURNING *",
      [nome, matricula, curso]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.post("/matriculas", async (req, res) => {
  try {
    const { aluno_id, disciplina_id } = req.body;
    if (!aluno_id || !disciplina_id) return res.status(400).json({ success: false, message: "Aluno e disciplina obrigatórios" });

    const aluno = await db.query("SELECT id FROM students WHERE id = $1", [aluno_id]);
    if (aluno.rows.length === 0) return res.status(404).json({ success: false, message: "Aluno não encontrado" });

    const disciplina = await db.query("SELECT id FROM subjects WHERE id = $1", [disciplina_id]);
    if (disciplina.rows.length === 0) return res.status(404).json({ success: false, message: "Disciplina não encontrada" });

    const jaExiste = await db.query("SELECT id FROM enrollments WHERE student_id=$1 AND subject_id=$2", [aluno_id, disciplina_id]);
    if (jaExiste.rows.length > 0) return res.status(409).json({ success: false, message: "Aluno já matriculado" });

    const result = await db.query("INSERT INTO enrollments (student_id, subject_id) VALUES ($1, $2) RETURNING *", [aluno_id, disciplina_id]);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.post("/notas", async (req, res) => {
  try {
    const { aluno_id, disciplina_id, nota1, nota2 } = req.body;
    if (!aluno_id || !disciplina_id || nota1 == null || nota2 == null)
      return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });

    const matricula = await db.query("SELECT id FROM enrollments WHERE student_id=$1 AND subject_id=$2", [aluno_id, disciplina_id]);
    if (matricula.rows.length === 0) return res.status(403).json({ success: false, message: "Aluno não matriculado nesta disciplina" });

    const media = (Number(nota1) + Number(nota2)) / 2;

    const result = await db.query(
      "INSERT INTO grades (student_id, subject_id, grade1, grade2, average) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [aluno_id, disciplina_id, nota1, nota2, media]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

app.get("/boletim/:alunoId", async (req, res) => {
  try {
    const { alunoId } = req.params;

    const aluno = await db.query("SELECT * FROM students WHERE id=$1", [alunoId]);
    if (aluno.rows.length === 0) return res.status(404).json({ success: false, message: "Aluno não encontrado" });

    const boletim = await db.query(
      `SELECT 
         s.name AS disciplina,
         s.workload,
         t.name AS professor,
         g.grade1 AS nota1,
         g.grade2 AS nota2,
         g.average AS media
       FROM grades g
       JOIN subjects s ON s.id = g.subject_id
       JOIN teachers t ON t.id = s.professor_id
       WHERE g.student_id=$1
       ORDER BY s.name`,
      [alunoId]
    );

    res.status(200).json({ success: true, aluno: aluno.rows[0], boletim: boletim.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

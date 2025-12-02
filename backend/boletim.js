import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

// ==============================================================<<

app.post("/professores", async (req, res) => {
  try {
    const { nome, titulacao, tempo_docencia } = req.body;
    if (!nome || !titulacao || tempo_docencia == null) {
      return res
        .status(400)
        .json({ success: false, message: "Todos os campos são obrigatórios" });
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

app.get("/professores", async (req, res) => {
  try {
    const professores = await db.query(
      "SELECT id, name, title, teaching_time FROM teachers ORDER BY name"
    );
    res.status(200).json({ success: true, data: professores.rows });
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
      return res
        .status(400)
        .json({ success: false, message: "Todos os campos são obrigatórios" });
    }

    const professor = await db.query("SELECT id FROM teachers WHERE id = $1", [
      professor_id,
    ]);
    if (professor.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Professor não encontrado" });

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

app.get("/disciplinas", async (req, res) => {
  try {
    const disciplinas = await db.query(
      `SELECT s.id, s.name, s.workload, t.name AS professor
       FROM subjects s
       LEFT JOIN teachers t ON t.id = s.professor_id
       ORDER BY s.name`
    );
    res.status(200).json({ success: true, data: disciplinas.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.post("/alunos", async (req, res) => {
  try {
    const { nome, registration, disciplinas } = req.body;

    if (!nome || !registration || !Array.isArray(disciplinas) || disciplinas.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nome, matrícula e ao menos uma disciplina são obrigatórios",
      });
    }

    // Criar aluno com registration
    const alunoResult = await db.query(
      "INSERT INTO students (name, registration) VALUES ($1, $2) RETURNING *",
      [nome, registration]
    );
    const aluno = alunoResult.rows[0];

    // Criar matrículas para cada disciplina
    for (const disciplina_id of disciplinas) {
      // Verifica se a disciplina existe
      const disciplina = await db.query(
        "SELECT id FROM subjects WHERE id = $1",
        [disciplina_id]
      );
      if (disciplina.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Disciplina ${disciplina_id} não encontrada`,
        });
      }

      await db.query(
        "INSERT INTO enrollments (student_id, subject_id) VALUES ($1, $2)",
        [aluno.id, disciplina_id]
      );
    }

    res.status(201).json({
      success: true,
      data: aluno,
      message: "Aluno cadastrado com sucesso e matriculado nas disciplinas",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

app.get("/alunos", async (req, res) => {
  try {
    const result = await db.query("SELECT id, name, registration FROM students ORDER BY name");
    res.status(200).json({ success: true, alunos: result.rows });
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
      return res
        .status(400)
        .json({ success: false, message: "Todos os campos são obrigatórios" });

    const matricula = await db.query(
      "SELECT id FROM enrollments WHERE student_id=$1 AND subject_id=$2",
      [aluno_id, disciplina_id]
    );
    if (matricula.rows.length === 0)
      return res.status(403).json({
        success: false,
        message: "Aluno não matriculado nesta disciplina",
      });

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

// ==============================================================<<

app.get("/boletim/:alunoId", async (req, res) => {
  try {
    const { alunoId } = req.params;

    const aluno = await db.query("SELECT * FROM students WHERE id=$1", [
      alunoId,
    ]);
    if (aluno.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Aluno não encontrado" });

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

    res
      .status(200)
      .json({ success: true, aluno: aluno.rows[0], boletim: boletim.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.get("/professores/:id/disciplinas", async (req, res) => {
  try {
    const { id } = req.params;

    const prof = await db.query("SELECT * FROM teachers WHERE id=$1", [id]);
    if (prof.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Professor não encontrado" });

    const disciplinas = await db.query(
      "SELECT id, name, workload FROM subjects WHERE professor_id = $1 ORDER BY name",
      [id]
    );

    res.status(200).json({
      success: true,
      professor: prof.rows[0],
      disciplinas: disciplinas.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.get("/disciplinas/:id/alunos", async (req, res) => {
  try {
    const { id } = req.params;

    const disciplina = await db.query(
      "SELECT id, name, workload, professor_id FROM subjects WHERE id=$1",
      [id]
    );
    if (disciplina.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Disciplina não encontrada" });

    const alunos = await db.query(
      `SELECT st.id, st.name, st.registration
       FROM enrollments e
       JOIN students st ON st.id = e.student_id
       WHERE e.subject_id = $1
       ORDER BY st.name`,
      [id]
    );

    res.status(200).json({
      success: true,
      disciplina: disciplina.rows[0],
      alunos: alunos.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// ==============================================================<<

app.put("/notas", async (req, res) => {
  try {
    const { aluno_id, disciplina_id, nota1, nota2 } = req.body;

    if (!aluno_id || !disciplina_id || nota1 == null || nota2 == null) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios",
      });
    }

    // Verificar se aluno está matriculado na disciplina
    const exists = await db.query(
      "SELECT id FROM enrollments WHERE student_id=$1 AND subject_id=$2",
      [aluno_id, disciplina_id]
    );
    if (exists.rows.length === 0)
      return res
        .status(403)
        .json({ success: false, message: "Aluno não matriculado" });

    const media = (Number(nota1) + Number(nota2)) / 2;

    // Verificar se já existe nota
    const notaExistente = await db.query(
      "SELECT id FROM grades WHERE student_id=$1 AND subject_id=$2",
      [aluno_id, disciplina_id]
    );

    let result;

    if (notaExistente.rows.length > 0) {
      // Atualizar nota
      result = await db.query(
        `UPDATE grades
         SET grade1=$1, grade2=$2, average=$3
         WHERE student_id=$4 AND subject_id=$5
         RETURNING *`,
        [nota1, nota2, media, aluno_id, disciplina_id]
      );

      return res.status(200).json({
        success: true,
        message: "Notas atualizadas com sucesso",
        data: result.rows[0],
      });
    } else {
      // Inserir nova nota
      result = await db.query(
        `INSERT INTO grades (student_id, subject_id, grade1, grade2, average)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [aluno_id, disciplina_id, nota1, nota2, media]
      );

      return res.status(201).json({
        success: true,
        message: "Notas lançadas com sucesso",
        data: result.rows[0],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
});

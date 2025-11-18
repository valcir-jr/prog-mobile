import { Pool } from "pg";

export default new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  database: "app-scholar",
  port: 5432,
});

/*
  1: aluno
  2: professor
  3: administrador

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    type INT NOT NULL DEFAULT 1 CHECK (type IN (1,2,3))
  );
*/
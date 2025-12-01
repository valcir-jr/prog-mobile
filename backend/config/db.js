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

  CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    title VARCHAR(255),
    teaching_time INT
  );

  CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    workload INT,
    professor_id INT REFERENCES teachers(id)
  );

  CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    registration VARCHAR(50),
    course VARCHAR(255)
  );

  CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    subject_id INT REFERENCES subjects(id)
  );

  CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    subject_id INT REFERENCES subjects(id),
    grade1 NUMERIC,
    grade2 NUMERIC,
    average NUMERIC
  );
*/

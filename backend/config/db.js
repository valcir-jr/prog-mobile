import { Pool } from "pg";

export default new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  database: "app-scholar",
  port: 5432,
});

/*
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
*/
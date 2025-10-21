import { Pool } from "pg";

export default new Pool({
  host: "postgres",
  user: "postgres",
  password: "123",
  database: "db-app-scholar",
  port: 5432,
});
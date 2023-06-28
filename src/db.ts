import { createPool } from "mysql2/promise";

export function connect() {
  const connection = createPool({
    host: "localhost",
    user: "root",
    database: "node_mysql_ts",
    connectionLimit: 10,
  });

  return connection;
}

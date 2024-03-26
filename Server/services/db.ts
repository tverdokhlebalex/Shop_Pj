import mysql, { Connection } from "mysql2/promise";

export async function initDataBase(): Promise<Connection | null> {
  let connection: Connection | null = null;

  try {
    connection = await mysql.createConnection({
      host: process.env.SQL_HOST,
      port: Number(process.env.SQL_PORT),
      password: process.env.SQL_PASSWORD,
      user: process.env.SQL_USER,
      database: process.env.SQL_DATABASE
    });
  } catch (e) {
    console.error(e.message || e);
    return null;
  }

  console.log(`Connection to DB ProductsApplication established`);

  return connection;
}

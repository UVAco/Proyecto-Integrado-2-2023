import mysql2 from "mysql2";
import config from "../config/config.js";

const conn = mysql2.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

export default conn;

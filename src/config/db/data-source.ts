import * as entities from "@ninetydays/orm-setup";
import { DataSource } from "typeorm"
import 'dotenv/config';
const DBConnection = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations:
    [
      `${__dirname}/../../../node_modules/@ninetydays/orm-setup/dist/migrations/*.js`,
    ] || [],
  entities: entities,
});

export default DBConnection;


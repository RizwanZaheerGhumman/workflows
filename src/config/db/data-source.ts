import * as entities from "@ninetydays/orm-setup";
import { DataSource } from "typeorm"
import 'dotenv/config';
const ConnectionSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrations:
    [
      `${__dirname}/../../../node_modules/@ninetydays/orm-setup/dist/migrations/*.js`,
    ] || [],
  entities: entities,
});

export default ConnectionSource;


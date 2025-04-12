import { DataSource } from "typeorm";
import {User} from "../entities/User";
import {Appointment} from "../entities/Appointment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "turnos_db",
  // dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [User, Appointment],
  subscribers: [],
  migrations: [],
});

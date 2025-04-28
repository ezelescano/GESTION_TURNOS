import {
  AppDataSource,
  AppointmentModel,
  CredentialModel,
  UserModel,
} from "../config/data-source";
import { UserStatus } from "../entities/Appointment";

const usersPreload = [
  {
    userName: "jdoe",
    password: "password123",
    userData: {
      name: "John Doe",
      email: "johndoe@example.com",
      birthday: "1990-05-15",
      nDni: 12345678,
    },
  },
  {
    userName: "mgarcia",
    password: "securePass",
    userData: {
      name: "Maria Garcia",
      email: "mariagarcia@example.com",
      birthday: "1988-09-22",
      nDni: 87654321,
    },
  },
  {
    userName: "lmartinez",
    password: "pass1234",
    userData: {
      name: "Luis Martinez",
      email: "luismartinez@example.com",
      birthday: "1995-07-10",
      nDni: 11223344,
    },
  },
  {
    userName: "srodriguez",
    password: "superSafe99",
    userData: {
      name: "Sofia Rodriguez",
      email: "sofia@example.com",
      birthday: "1992-03-18",
      nDni: 55667788,
    },
  },
];

const appoimentsPreload = [
  {
    date: "2025-04-10",
    time: "10:00",
    status: "canceled",
  },
  {
    date: "2025-04-11",
    time: "15:30",
    status: "active",
  },
  {
    date: "2025-04-12",
    time: "09:00",
    status: "active",
  },
  {
    date: "2025-04-13",
    time: "11:45",
    status: "canceled",
  },
  {
    date: "2025-04-14",
    time: "14:00",
    status: "canceled",
  },
];

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(async (trasactionalEntityManager) => {
    const user = await UserModel.find();

    // verifico si hay usuarios en la DB
    if (user.length) return console.log("No se realizo la precarga usuarios");

    // A partir de aca hace la carga de los usuarios
    for await (const user of usersPreload) {
      const { userName, password, userData } = user;
      const crendentialExist = await CredentialModel.findOne({
        where: {
          userName,
          password,
        },
      });
      if (crendentialExist) return console.log("Usuario Existente");

      const creden = CredentialModel.create({ userName, password });
      await trasactionalEntityManager.save(creden);
      const newUser = UserModel.create({
        ...userData,
        credential: creden,
      });
      await trasactionalEntityManager.save(newUser);
    }
    console.log("la precarga de datos realizada con exito");
  });
};

export const preloadAppoinmentData = async () => {
  const appoiment = await AppointmentModel.find();
  if (appoiment.length)
    return console.log("No se realizo la precarga de Turnos");
  const users = await UserModel.find();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const promises = users.map((user, i) => {
    const appoimentData = appoimentsPreload[i];
    const newAppointment = AppointmentModel.create({
      time: appoimentData.time,
      status: appoimentData.status as UserStatus,
      date: appoimentData.date,
      user: user,
    });
    queryRunner.manager.save(newAppointment);
  });
  try {
    await queryRunner.startTransaction();
    await Promise.all(promises);
    console.log("Precarga de Turnos realizada con exito");
    await queryRunner.commitTransaction();
  } catch (error) {
    console.log("Error al intentar crear los turnos");
    await queryRunner.rollbackTransaction();
  } finally {
    console.log("Ha realizado el intento de precarga");
    await queryRunner.release();
  }
};

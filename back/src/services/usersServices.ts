import { ICredentialsDto } from "../dto/CredentialDto";
import {
  credentialService,
  verifyCredentialService,
} from "../services/credentialsService";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import { AppDataSource } from "../config/data-source";

export const credentialsUsers: ICredentialsDto[] = [];

// Traer todos los usuarios
export const getUserServices = async (): Promise<User[]> => {
  try {
    const users: User[] = await UserRepository.find({
      relations: {
        appoinment: true,
      },
    });
    if (!users) throw new Error("No hay Usuarios en la Base de Datos");
    return users;
  } catch (error) {
    console.error("Hubo un error inesperado en getUserServices", error);
    throw new Error("Error inesperado en getUserServices");
  }
};

// Trae un usuario en base a su Id
export const getUserByIdService = async (
  id: string
): Promise<User | string> => {
  try {
    const userFind = await UserRepository.findOne({
      where: { id },
      relations: {
        appoinment: true,
      },
    });
    if (!userFind) {
      throw new Error("No existe este usuario");
    }
    return userFind;
  } catch (error) {
    console.error("Error al traer el detalle de usuario", error);
    throw new Error("Problema en el getUserByIdService");
  }
};

// Registra un usuario
export const registerService = async (
  userName: string,
  password: string,
  userData: User
): Promise<User | string> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const { name, email, birthday, nDni } = userData;

  try {
    await queryRunner.startTransaction();

    if (!userName || !password || !name || !email || !birthday || !nDni) {
      throw new Error("Debe ingresar todos los datos");
    }
    const verifyCred = await verifyCredentialService(userName, password);
    if (verifyCred === true) {
      return "El Usuario ya está Registrado";
    } else {
      const user = UserRepository.create(userData);
      const newCredentials = await credentialService(userName, password);
      if (!newCredentials)
        throw new Error("Error inesperado en credentialService");
      user.credential = newCredentials;
      const newUser = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return newUser;
    }
  } catch (error) {
    console.error("Error en el registerService", error);
    await queryRunner.rollbackTransaction();
    throw new Error("Error al registrar el nuevo usuario");
  } finally {
    console.log("Se ha realizado el intento de registro");
    await queryRunner.release();
  }
};

// Loguea al usuario
export const loginUserService = async (
  userName: string,
  password: string
): Promise<string | { token: string }> => {
  try {
    if (!userName || !password) {
      return "Tiene que ingresar todos los datos";
    }
    const logUser = credentialsUsers.find(
      //falta terminar
      (user) => user.password === password && user.userName === userName
    );
    if (!logUser) {
      return "Usuario no registrado";
    } else {
      const token = "Autenticado";

      return { token };
    }
  } catch (error) {
    console.error("Error en loginUserService", error);
    throw new Error ("Error inesperado al iniciar sesion");
  }
};

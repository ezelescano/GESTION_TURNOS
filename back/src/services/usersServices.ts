import { IUser } from "../interfaces/IUser";
import { ICredentialsDto } from "../dto/CredentialDto";
import {
  credentialService,
  verifyCredentialService,
} from "../services/credentialsService";
import { User } from "../entities/User";
import { UserModel } from "../config/data-source";

const users: IUser[] = [];
export const credentialsUsers: ICredentialsDto[] = [];

let id: number = 1;

// Traer todos los usuarios
export const getUserServices = async (): Promise<User[]> => {
  const users: User[] = await UserModel.find({
    relations: {
      appoinment: true,
    },
  });
  return users;
};

// Trae un usuario en base a su Id
export const getUserByIdService = async (id: number): Promise<IUser[]> => {
  const userFind = users.filter((user) => user.id == id);
  return userFind;
};

// Registra un usuario
export const registerService = async (
  userName: string,
  password: string,
  userData: User
): Promise<User | string> => {
  const verifyCred = await verifyCredentialService(userName, password);
  if (verifyCred == true) {
    return "El Usuario ya está Registrado";
  } else {
    const newCredentials = await credentialService(userName, password)
    const newUser = await UserModel.create({
      ...userData,
      credential: newCredentials
    });
    const result = await UserModel.save(newUser);
    return result;
  }
};

// Loguea al usuario
export const loginUserService = async (
  userName: string,
  password: string
): Promise<string | { token: string }> => {
  const logUser = credentialsUsers.find(
    (user) => user.password === password && user.userName === userName
  );
  if (!logUser) {
    return "Usuario no registrado";
  } else {
    const token = "Autenticado";

    return { token };
  }
};

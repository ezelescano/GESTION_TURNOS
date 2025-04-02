import {IUser} from "../interfaces/IUser";
import {ICredentialsDto} from "../dto/CredentialDto";
import {credentialService, verifyCredentialService} from "../services/credentialsService"

const users : IUser[]  = [];
export const credentialsUsers: ICredentialsDto[]= [];

let id: number = 1;

// Traer todos los usuarios
export const getUserServices = async (): Promise<IUser[]> =>{
     return users;
};

// Trae un usuario en base a su Id
export const getUserByIdService = async (id: number): Promise<IUser[]>=>{
  const userFind = users.filter((user) => user.id == id);
  return userFind;
}

// Registra un usuario
export const registerService = async (userName:string, password:string, userData: IUser): Promise<IUser | string>=>{
    console.log(userName, password, userData);
     
    const verifyCred: boolean = await verifyCredentialService(userName, password);
     if(verifyCred == true) {
        return "Usuario Registrado";
     }else{
        const credId: number = await credentialService(userName, password);
        const newUser: IUser = {
            id,
            name: userData.name,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            credentialsId: credId
        };
        users.push(newUser);
        id++;
        return newUser;
     }

}

// Loguea al usuario
export const loginUserService = async (login: string): Promise<string> => {
    return "NIY: logueo usuarios";
}
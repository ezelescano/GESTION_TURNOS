import {IUser} from "../interfaces/IUser";
import {ICredentialsDto} from "../dto/CredentialDto";
import {credentialService, verifyCredentialService} from "../services/credentialsService"

const users : IUser[]  = [];
export const credentialsUsers: ICredentialsDto[]= [];

let id: number = 1;

export const getUserServices = async (): Promise<string> =>{
     return "NIY: traigo los usuarios";
};


export const getUserByIdService = async (id: number): Promise<string>=>{
    return "NIY: traigo el usuario por ID";
}

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

  


export const loginUserService = async (login: string): Promise<string> => {
    return "NIY: logueo usuarios";
}
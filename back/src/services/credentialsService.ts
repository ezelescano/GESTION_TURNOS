import {ICredentialsDto} from '../dto/CredentialDto'

import {credentialsUsers} from '../services/usersServices';
// const credentialsUsers: ICredentialsDto[]= [];



let id: number = 1;
export const credentialService = async (userName: string, password: string): Promise<number> =>{    
    const newCredentials: ICredentialsDto = {
        id: id,
        userName,
        password,
    }  
    credentialsUsers.push(newCredentials);
    id++; 
    return newCredentials.id; 
};


export const loginCredentialService = async (userName: string, password: string): Promise<number | string>=>{
    for (let i = 0;  i < credentialsUsers.length; i++){
       if(userName == credentialsUsers[i].userName && password == credentialsUsers[i].password){
       
        return credentialsUsers[i].id;
       }
    } 
    return "Usuario no registrado";
};

export const verifyCredentialService = async (userName: string, password: string): Promise<boolean> => {
    for (let i = 0;  i < credentialsUsers.length; i++){
        if(userName == credentialsUsers[i].userName && password == credentialsUsers[i].password){
            return true;
        }
    } 
    return false;
}
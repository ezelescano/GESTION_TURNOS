import { AppDataSource, CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRepository";

export const credentialService = async (
  userName: string,
  password: string
): Promise<Credential> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    if(!userName || !password) throw new Error("Se debe infresar todos los datos")

    const newCredentials: Credential =  CredentialRepository.create({
      userName,
      password,
    });

    const saveCredentials = await queryRunner.manager.save(newCredentials);
    await queryRunner.commitTransaction();
    return saveCredentials; 
  } catch (error) {
    console.error("No se pudo crear la credencial, error en credentialService", error);
    await queryRunner.rollbackTransaction();
    throw new Error("Error inesperado en la  creacion de credenciales")
  }finally{
    console.log("Se ha realizado el intento de crear credenciales");
    await queryRunner.release()
  }

};

// export const loginCredentialService =

export const verifyCredentialService = async (
  userName: string,
  password: string
): Promise<boolean | string> => {
  try {
    
    if(!userName || !password) throw new Error("Se debe infresar todos los datos")
    const result = await CredentialRepository.findOne({
      where: {
        userName,
        password,
      },
    });
    if(result) return true;
    else return false;
  } catch (error) {
    console.error("Hubo un error en la busqueda");
    throw Error("Hubo un error en el verifyCredentalService")
  }

};

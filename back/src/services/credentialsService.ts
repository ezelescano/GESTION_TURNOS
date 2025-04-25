import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";


let id: number = 1;
export const credentialService = async (
  userName: string,
  password: string
): Promise<Credential> => {
  const newCredentials: Credential = await CredentialModel.create({
    userName,
    password,
  });
  await CredentialModel.save(newCredentials);
  return newCredentials;
};

// export const loginCredentialService =

export const verifyCredentialService = async (
  userName: string,
  password: string
): Promise<boolean | null> => {
  const result = await CredentialModel.findOne({
    where: {
      userName,
      password,
    },
  });

  
  if(result) return true;
  else return false;
};

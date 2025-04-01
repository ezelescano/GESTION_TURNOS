import { log } from "console";
import { IUser } from "../interfaces/IUser";
import { getUserByIdService, getUserServices, loginUserService, registerService } from "../services/usersServices";

import { Request, Response} from "express";

export const getUser = async (req:Request, res: Response) =>{
    const users : string = await getUserServices();
    res.status(200).json(users);
};

export const getUserById = async (req:Request, res: Response) =>{
    const {id} = req.body;
    const user : string = await getUserByIdService(id);
    res.status(200).json(user)
};

export const registerConstroller = async (req:Request, res:Response) =>{
    // console.log(req.body.userData);
    
   const {userName, password, userData} = req.body;
   try {
    const newUser: IUser | string = await registerService(userName, password, userData);
    res.status(200).json(newUser);
   } catch (error) {
    console.error("Error en registerController:", error);
    
    res.status(500).json({error: "Error al registrar el Usuario"})
   }
};





export const loginUserController = async (req:Request, res:Response) =>{
    const {login} = req.body;
    const user :string = await loginUserService(login);
    res.status(200).json(user);
}


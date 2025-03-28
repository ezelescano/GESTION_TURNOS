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
    const user :string = await registerService();
    res.status(200).json(user);
};

export const loginUserController = async (req:Request, res:Response) =>{
    const {login} = req.body;
    const user :string = await loginUserService(login);
    res.status(200).json(user);
}
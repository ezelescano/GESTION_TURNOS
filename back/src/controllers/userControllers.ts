import { log } from "console";
import { IUser } from "../interfaces/IUser";
import { getUserByIdService, getUserServices, loginUserService, registerService } from "../services/usersServices";

import { Request, Response} from "express";

// Controlador de traer a los usuarios
export const getUser = async (req:Request, res: Response) =>{
    try {
        const users : IUser[] = await getUserServices();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error en servidor: ", error);
        res.status(500).json({error: "Error al recuperar los usuarios"});
    }
};

// controlador que trar al usuario por ID
export const getUserById = async (req:Request, res: Response) =>{
    const { id } = req.params;
    console.log(typeof(id));
    
    const idChange: number = Number(id);
 try {
    const user : IUser[] = await getUserByIdService(idChange);
    res.status(200).json(user)
 } catch (error) {
    console.error("Error en el servidor", error);
    res.status(500).json({error: "Error al recuperar al usuario"});
 }
};

// controlador del registro
export const registerConstroller = async (req:Request, res:Response) =>{
    
   const {userName, password, userData} = req.body;
   try {
    const newUser: IUser | string = await registerService(userName, password, userData);
    res.status(200).json(newUser);
   } catch (error) {
    console.error("Error en registerController:", error);
    
    res.status(500).json({error: "Error al registrar el Usuario"})
   }
};

// controlador de logueo
export const loginUserController = async (req:Request, res:Response) =>{
    const {userName, password} = req.body;
    try {
        const result = await loginUserService(userName, password);
        if(typeof(result) === "string"){
            return  res.status(401).json({message: result});
        }else{
            res.setHeader("Authorization", `Bearer ${result.token}`);
            return res.status(200).json({message: "Login Exitoso", token: result.token})
        }
    } catch (error) {
        console.error("Error en login Controller", error);
        return res.status(500).json({error: "Error en login"})
    }
}



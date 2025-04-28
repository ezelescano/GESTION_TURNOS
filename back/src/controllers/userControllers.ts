import {
  getUserByIdService,
  getUserServices,
  loginUserService,
  registerService,
} from "../services/usersServices";

import { Request, Response } from "express";
import { User } from "../entities/User";

// Controlador de traer a los usuarios
export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await getUserServices();
    if (!users) {
      res.status(204).json({ message: "No hay usuarios para mostrar" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error en servidor: ", error);
    res.status(500).json({ error: "Error al recuperar los usuarios" });
  }
};

// controlador que trar al usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userFind = await getUserByIdService(id);
    if (userFind) {
      res.status(200).json(userFind);
    } else {
      res.status(404).send("No se encontró el usuario");
    }
  } catch (error) {
    console.error("Error en el servidor", error);
    res.status(500).json({ error: "Error al recuperar los datos del usuario" });
  }
};

// controlador del registro
export const registerConstroller = async (req: Request, res: Response) => {
  const { userName, password, userData } = req.body;
  const { name, email, birthday, nDni} = userData;
  try {
    if(!userName || !password || !name || !email || !birthday || !nDni){
        res.status(400).json({message: "Los datos deben estar completos"})
    }
    const newUser: User | string = await registerService(
      userName,
      password,
      userData
    );
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error en registerController:", error);

    res.status(500).json({ error: "Error al registrar el Usuario" });
  }
};

// controlador de logueo
export const loginUserController = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  try {
    if(!userName || !password){
        res.status(400).json({message: "Debe ingresar todos los datos"})
    }
    const result = await loginUserService(userName, password);
    if (typeof result === "string") {
      res.status(401).json({ message: result });
    } else {
      res.status(200).json({ message: "Login Exitoso", token: result.token });
    }
  } catch (error) {
    console.error("Error en login Controller", error);
    res.status(500).json({ error: "Error en login" });
  }
};

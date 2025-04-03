import {NextFunction, Request, Response} from "express";

export const auth = (req: Request, res: Response, next: NextFunction) =>{
    const { token} = req.headers;

    if(token === "Autenticado") next();
    else res.status(400).json({message: "Error. Falta Autenticacion"});
}
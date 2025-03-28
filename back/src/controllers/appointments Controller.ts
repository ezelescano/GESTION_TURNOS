import { Request, Response } from "express";
import { cancelAppointmentsService, getAppointmentsByIdService, getAppointmentsService, scheduleAppointmentsService } from "../services/appointmentsServices";

export const getAppointments = async (req: Request, res: Response) =>{
const appointments : string = await getAppointmentsService();
res.status(200).json(appointments);
};

export const getAppointmentsById = async (req: Request, res: Response) =>{
    const id = req.body;
    const appointments : string = await getAppointmentsByIdService(id);
    res.status(200).json(appointments);
};

export const scheduleAppointments = async (req: Request, res: Response) =>{
    const appointments : string = await scheduleAppointmentsService();
    res.status(200).json(appointments);
};

export const cancelAppointments = async (req: Request, res: Response) => {
    const id : number = req.body;
    const appointments = await cancelAppointmentsService(id);
    res.status(200).json(appointments);
}
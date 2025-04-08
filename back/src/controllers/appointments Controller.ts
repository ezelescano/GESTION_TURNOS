import { Request, Response } from "express";
import {
  cancelAppointmentsService,
  getAppointmentsByIdService,
  getAppointmentsService,
  // scheduleAppointmentsService,
} from "../services/appointmentsServices";

// controlador de turnos
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appoiments = await getAppointmentsService();
    res.status(200).json(appoiments);
  } catch (error) {
    console.error({message: "Error en el servidor", error});
    res.status(500).json({error: "No se pudo recuperar los turnos"})
  }
};

export const getAppointmentsById = async (req: Request, res: Response) => {
  const { id } = req.body;
  const idAppo = Number(id);
  try {
  const resultAppo = await getAppointmentsByIdService(idAppo);
    res.status(200).json(resultAppo);
  } catch (error) {
    console.error("Error en el servidor", error);
    res.status(500).json({error: "Error al recuperar el turno"})
  }
};

// export const scheduleAppointments = async (req: Request, res: Response) => {
//   const appointments: string = await scheduleAppointmentsService();
//   res.status(200).json(appointments);
// };

export const cancelAppointments = async (req: Request, res: Response) => {
  const id: number = req.body;
  const appointments = await cancelAppointmentsService(id);
  res.status(200).json(appointments);
};

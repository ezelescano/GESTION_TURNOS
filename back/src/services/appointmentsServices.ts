import { ReturnDocument } from "typeorm";
import { AppointmentModel } from "../config/data-source";
import { ICredentialsDto } from "../dto/CredentialDto";
import { Appointment, UserStatus } from "../entities/Appointment";
import { IAppoiments } from "../interfaces/IAppointments";
// import { IUser } from "../interfaces/IUser";
// import { verifyCredentialService } from "./credentialsService";

const appointments: IAppoiments[] = [];
let id: number = 1;
// trae todos los turnos
export const getAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments: Appointment[] = await AppointmentModel.find();

  return appointments;
};

// trae el detalle del turno
export const getAppointmentsByIdService = async (
  id: string
): Promise<Appointment | null> => {
  const findApp: Appointment | null = await AppointmentModel.findOne({
    where: { id },
  });
  if (findApp) {
    return findApp;
  } else {
    return null;
  }
};

// agenda un turno
export const scheduleAppointmentsService = async (
  appdata: Appointment
): Promise<Appointment> => {
  const newApp: Appointment = AppointmentModel.create(appdata);
  const appnew = AppointmentModel.save(newApp);
  return appnew;
};

// cancela un turno
export const cancelAppointmentsService = async (
  id: string
): Promise<string | null> => {
  const cancelApp: Appointment | null = await getAppointmentsByIdService(id);
  if (!cancelApp) {
    return "No se encontro turno";
  } else {
    cancelApp.status = UserStatus.CANCELED;
    await AppointmentModel.save(cancelApp);
    return "El turno fue cancelado";
  }
};

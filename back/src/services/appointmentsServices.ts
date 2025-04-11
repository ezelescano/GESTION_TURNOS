import { ICredentialsDto } from "../dto/CredentialDto";
import {IAppoiments} from "../interfaces/IAppointments";
// import { IUser } from "../interfaces/IUser";
// import { verifyCredentialService } from "./credentialsService";


const appointments: IAppoiments[] = [];
let id: number = 1;
// trae todos los turnos
export const getAppointmentsService = async (): Promise<IAppoiments[]> =>{
    return appointments;
};

// trae el detalle del turno
export const getAppointmentsByIdService = async (id:number): Promise<IAppoiments[]> =>{
    const appoimentFind = appointments.filter((appointment)=> appointment.id == id)
    return appoimentFind;
};

// agenda un turno
export const scheduleAppointmentsService = async (appdata: IAppoiments ): Promise<IAppoiments> =>{
    console.log(appdata);
    
    const newAppo: IAppoiments = {
       id,
       date: new Date(appdata.date ),
       time: appdata.time,
       userId: appdata.id,
       status: appdata.status
    };

    appointments.push(newAppo);
    id++;
    return newAppo;
};

// cancela un turno
export const cancelAppointmentsService  = async (id: number): Promise<string> =>{
    return "NIY: cancelo un turno";
};


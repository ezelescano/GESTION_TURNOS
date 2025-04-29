import { AppDataSource } from "../config/data-source";
import { Appointment, UserStatus } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";

// trae todos los turnos
export const getAppointmentsService = async (): Promise<Appointment[]> => {
  try {
    const appointments: Appointment[] = await AppointmentRepository.find();
    if (appointments.length === 0)
      throw new Error("No hay Turnos en la Base de Datos");

    return appointments;
  } catch (error) {
    console.error("Hubo un error inesperado en getAppointmentsService", error);
    throw new Error("Error en getAppointmentsService");
  }
};

// trae el detalle del turno
export const getAppointmentsByIdService = async (
  id: string
): Promise<Appointment | string> => {
  try {
    const findApp: Appointment | null = await AppointmentRepository.findOne({
      where: { id },
    });
    if (!findApp) {
      throw new Error("No existe el turno");
    }
    return findApp;
  } catch (error) {
    console.error("Error al traer el detalle del turno", error);
    throw new Error("Problema inesperado con getAppointmentsByIdService");
  }
};

// agenda un turno
export const scheduleAppointmentsService = async (
  appdata: Appointment
): Promise<Appointment> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    const { date, time, user } = appdata;
    if (!date || !time || !user)
      throw new Error("Debe ingresar todos los datos");

    const newApp: Appointment = AppointmentRepository.create(appdata);
    const appnew = await queryRunner.manager.save(newApp);
    await queryRunner.commitTransaction();
    return appnew;
  } catch (error) {
    console.error("Error al intertar crear el turno", error);
    await queryRunner.rollbackTransaction();
    throw new Error("Error al registrar el turno");
  } finally {
    console.log("Se intento registrar el tueno");
    await queryRunner.release();
  }
};

// cancela un turno
export const cancelAppointmentsService = async (
  id: string
): Promise<string> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();
    const cancelApp: Appointment | string = await getAppointmentsByIdService(
      id
    );
    if (typeof cancelApp === "string") {
      throw new Error(cancelApp);
    }
    cancelApp.status = UserStatus.CANCELED;
    await queryRunner.manager.save(cancelApp);
    await queryRunner.commitTransaction();
    return "Turno cancelado con exito!";
  } catch (error) {
    console.error("Error al Cancelar el turno", error);
    await queryRunner.rollbackTransaction();
    throw new Error("Error al cancelar el turno");
  } finally {
    console.log("Se ha intentado cancelar el turno");
    await queryRunner.release();
  }
};

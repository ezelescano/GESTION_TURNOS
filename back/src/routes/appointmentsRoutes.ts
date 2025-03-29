import { Router } from "express";
import { cancelAppointments, getAppointments, getAppointmentsById, scheduleAppointments } from "../controllers/appointments Controller";

const appointmentRouter : Router = Router();

appointmentRouter.get("/", getAppointments);
appointmentRouter.get("/:id", getAppointmentsById);
appointmentRouter.post("/", scheduleAppointments);
appointmentRouter.put("/cancel", cancelAppointments);

export default appointmentRouter;
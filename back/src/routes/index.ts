import {Request, Response, Router} from "express";

import userRouter from "../routes/userRouter";

import appointmentRouter from "../routes/appointmentsRoutes";

const router: Router = Router();

router.use("/users", userRouter);

router.use("/appointments", appointmentRouter)

export default router;
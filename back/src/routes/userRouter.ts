import {Router} from "express";

import { getUser, getUserById, loginUserController, registerConstroller} from "../controllers/userControllers";
import {auth} from "../middlewares/auth";
const userRouter: Router = Router();

userRouter.get("/",  getUser );
userRouter.get("/:id",   getUserById);
userRouter.post("/", registerConstroller);
userRouter.post("/login", loginUserController);

export default userRouter;
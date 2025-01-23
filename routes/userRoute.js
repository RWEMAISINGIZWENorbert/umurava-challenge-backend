import { Router } from "express";
import { loginUserController, logoutController, registerUserController } from "../controllers/userController.js";
import { auth } from "../middleware/Auth.js";
const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.get('/logout', auth, logoutController);
export default userRouter;
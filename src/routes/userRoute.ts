// import { Router } from "express";
// import { loginUserController, logoutController, registerUserController, updateUserController } from "../controllers/userController.js";
// import { auth } from "../middleware/Auth.js";
// const userRouter = Router();

// userRouter.post('/register', registerUserController);
// userRouter.post('/login', loginUserController);
// userRouter.put('/update', auth, updateUserController);

// userRouter.get('/logout', auth, logoutController);
// export default userRouter;

import { Router } from "express";
import { loginUserController, logoutController, registerUserController, updateUserController } from "../controllers/userController";
import { auth } from "../middleware/Auth";

const userRouter = Router();

userRouter.post('/register',registerUserController);
userRouter.post('/login',  loginUserController);
userRouter.put('/update', auth, updateUserController);
userRouter.get('/logout', auth, logoutController);

export default userRouter;
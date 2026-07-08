import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', auth, getUsers);
userRouter.get('/:userId', auth, getUser);
userRouter.put('/:userId', auth, updateUser);
userRouter.delete('/:userId', auth, deleteUser);

export default userRouter;
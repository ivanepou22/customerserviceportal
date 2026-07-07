import express from "express";
const userRouter = express.Router();
import { createUser, getUser, getUsers, updateUser } from "../controllers/userController.js";

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.put('/:userId', updateUser);

export default userRouter;
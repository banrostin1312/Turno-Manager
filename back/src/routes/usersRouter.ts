import { Router } from "express";
import { getUsers,createUser,deleteUser, getUserById, userLoggin, editUser } from "../controllers/usersControllers";


const userRouter:Router = Router();

userRouter.get("/users",getUsers);
userRouter.delete("/users/:id",deleteUser);
userRouter.post("/users/register",createUser);
userRouter.post("/users/login",userLoggin);
userRouter.get("/users/:id",getUserById);
userRouter.put("/users/profile/:id",editUser)
export default userRouter;
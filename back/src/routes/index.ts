import { Router } from "express";
import auth from "../middlewares/auth";
import userRouter from "./usersRouter";
import turnosRouter from "./turnosRouter";
import crentialsRouter from "./crentialsRouter";
const router:Router = Router();

router.use("/",userRouter);
router.use("/",turnosRouter);
router.use("/",crentialsRouter)
export default router;
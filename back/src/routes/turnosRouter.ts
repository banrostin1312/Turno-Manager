import { Router } from "express";
import { cancelTurn, createTurn, deleteTurn, getAppointmentsByUserId, getTurn, getTurns } from "../controllers/appointmentController";

const turnosRouter:Router = Router();

turnosRouter.get("/appointments",getTurns);
turnosRouter.get("/appointment/:id",getTurn);
turnosRouter.post("/appointment/schedule",createTurn);
turnosRouter.put("/appointment/cancel/:id",cancelTurn);
turnosRouter.get("/appointments/:userId", getAppointmentsByUserId);
turnosRouter.delete("/appointment/delete/:id",deleteTurn);
export default turnosRouter;
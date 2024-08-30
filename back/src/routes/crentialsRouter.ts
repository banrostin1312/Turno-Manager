import { Router } from "express"
import { editCredentials } from "../controllers/credentialsController";

const crentialsRouter:Router = Router();

crentialsRouter.put('/credentials/update/:id',editCredentials);

export default crentialsRouter;
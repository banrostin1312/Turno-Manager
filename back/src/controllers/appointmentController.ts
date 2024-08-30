import { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, 
    getAppointmentsService, getAppoitmentByIdService ,getAppointmentsByUserIdService,
    deleteAppointmentService} from "../services/appoitmentServices";
import { Appointment } from "../entities/appointment";

export const getAppointmentsByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    

    if (isNaN(userId)) {
        return res.status(400).json({ message: "El userId no es válido" });
    }

    try {
        const turns: Appointment[] = await getAppointmentsByUserIdService(userId);
        res.status(200).json(turns);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



export const getTurns = async (req:Request,res:Response)=>{
try {
    const appointments = await getAppointmentsService();
    res.status(200).json({appointments})

} catch (error) {
    
    res.status(500).json({error:"Error al obtener los turnos"});
}

}



export const getTurn = async (req:Request,res:Response)=>{
const id = parseInt(req.params.id);

try {
const appointment = await getAppoitmentByIdService(id);
res.status(200).json(appointment);
} catch (error) {
    res.status(404).json({message:"La cita con ese ID no fue encontrada"});
}


}


export const createTurn = async (req: Request, res: Response) => {
    try {
        const { date, time, status, description,userId,userName} = req.body;
        
       
        const newAppointment = await createAppointmentService({ date, time,status,description,userId,userName });
        
        // Responder con la nueva cita creada
        res.status(201).json({ newAppointment });
    } catch (error) {
        // Manejar cualquier error que ocurra durante la creación de la cita
        console.error("Error al crear la cita:", error);
        res.status(500).json({ error: "Error al crear la cita" });
    }
};




export const cancelTurn = async(req:Request,res:Response) =>{
   const id = parseInt(req.params.id);

   try {
    const appointment = await cancelAppointmentService(id);
    res.status(200).json({message:"Turno cancelado con exito"});
   } catch (error) {
    res.status(404).json({mesagge:"El turno no se pudo cancelar"});
   }


}


export const deleteTurn = async (req:Request,res:Response)=>{
const id = parseInt(req.params.id)

try {
    const deletedAppoinment = await deleteAppointmentService(id)
    res.status(200).json({message:"Appointment Deleted successfully"});
} catch (error) {
    res.status(400).json({message:"Appoinment could not be deleted"});
}
}
import IAppointmentDto from "../dto/appointmentDto";
import { Appointment } from "../entities/appointment"
import appointmentRepository from "../repositories/appointemntRepository";
import userRepository from "../repositories/userRepository";
import {format} from 'date-fns'

export const getAppointmentsService = async ():Promise<Appointment[]> => {
   try {
    const appointments = appointmentRepository.find();
    return appointments;
   } catch (error) {
    throw new Error ("No se pudieron obtener la lista de las citas");
   }
}

export const getAppoitmentByIdService = async (id:number): Promise<Appointment>=> {
const appointment = await appointmentRepository.findAppointmentById(id);

if(appointment){
return appointment;
} else{
    throw new Error("La cita con ese Id no se pudo encontrar");
}
}

export const getAppointmentsByUserIdService = async (userId: number): Promise<Appointment[]> => {
    try {
        const user = await userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.appointments", "appointments")
            .where("user.id = :id", { id: userId })
            .getOne();

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user.appointments;
    } catch (error) {
        console.error("Error al obtener las citas por ID de usuario:", error);
        throw new Error("Error al obtener las citas por ID de usuario");
    }
};



export const createAppointmentService = async (appointmentData: IAppointmentDto): Promise<Appointment> => {
    let isCreatingAppointment = false;
    try {
        if (isCreatingAppointment) {
            throw new Error("Ya se está creando una cita, por favor espere.");
        }

        isCreatingAppointment = true;
        const user = await userRepository.findUserByID(appointmentData.userId);
    
        if (!user) {
            throw new Error("No se encontró ningún usuario con el ID proporcionado.");
        }
      

        const newAppointment = new Appointment();

        newAppointment.date = appointmentData.date
        newAppointment.time = appointmentData.time

        newAppointment.status = appointmentData.status
        newAppointment.description = appointmentData.description;

        newAppointment.userId = appointmentData.userId; 
        newAppointment.userName = user.username;

        const savedAppointment = await appointmentRepository.save(newAppointment);
       isCreatingAppointment = false;
        return savedAppointment;
    } catch (error) {
        console.error("Error al crear la cita:", error);
        throw new Error(`Error al crear la cita: ${error}`);
    }
};


export const cancelAppointmentService = async (id:number) => {

try {
    const appointment = await appointmentRepository.findAppointmentById(id);

if(appointment){
    appointment.status = "canceled";

    const savedAppointment = await appointmentRepository.save(appointment);

    return savedAppointment;
    
} else {
    throw new Error("La cita con ese Id no se pudo encontrar");
}

} catch (error) {
    throw new Error("No se pudo cancelar el turno con exito")
}

}


export const deleteAppointmentService = async (id:number) => {
const appointment = await appointmentRepository.findAppointmentById(id);

if(!appointment){
    throw new Error("Appointment not found");
}

await appointmentRepository.delete(appointment)

return appointment;
}
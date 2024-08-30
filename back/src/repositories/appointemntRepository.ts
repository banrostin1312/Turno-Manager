import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/appointment";

const appointmentRepository = AppDataSource.getRepository(Appointment).extend({
    findAppointmentById: async (id: number) => {
        const appointment = await appointmentRepository.createQueryBuilder("appointment")
            .where("appointment.id = :id", { id })
            .getOne();
        
        return appointment;
    },
    findByUserId: async (userId: number) => {
        const appointments = await appointmentRepository.createQueryBuilder("appointment")
            .where("appointment.userId = :userId", { userId })
            .getMany();
        
        return appointments;
    }
})

export default appointmentRepository;
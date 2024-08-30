import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User).extend({

    findUserByID: async function (id: number): Promise<User> {
        const user = await this.createQueryBuilder("user")
            .leftJoinAndSelect("user.appointments", "appointments")
            .where("user.id = :id", { id })
            .getOne();
        
        if (user) return user;
        else throw Error("Invalid ID");
    },
    findUserByIDWithoutAppointments: async function (id: number): Promise<User> {
        const user = await this.createQueryBuilder("user")
            .where("user.id = :id", { id })
            .getOne();
        
        if (user) return user;
        else throw Error("Invalid ID");
    }
})

export default userRepository;



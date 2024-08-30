import credentialRepository from "../repositories/credentialRepository";
import userRepository from "../repositories/userRepository"

export const editCredentialsServices = async (userId:number,username:string,password:string) => {
try {
    
    const user = await userRepository.findUserByIDWithoutAppointments(userId)

    if(!user){
        throw new Error("User whit that ID not found")
    }

    user.username = username;
    user.password = password;

    await userRepository.save(user);
    await credentialRepository.save(user);
   return user;
   
} catch (error) {
    throw new Error("Error updating credentials");
}
}
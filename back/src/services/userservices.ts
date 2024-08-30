import { getRepository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import IUserDto from "../dto/userDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import userRepository from "../repositories/userRepository";
import credentialRepository from "../repositories/credentialRepository";



export const getUsersService = async ():Promise<User[]> => {
 try {
  const users = await userRepository.find();
  return users;
  
 } catch (error) {
  throw Error ("Error al cargar usuarios");
 }
};


export const getUserByIdService = async (userId: number): Promise<User | null> => {
 try {
  const user = await userRepository.findUserByID(userId)
  return user
 } catch (error) {
  throw Error("ID de usuario invalido");
 }
};


export const createUserService = async (userData:IUserDto):Promise<User> => {

const user = await userRepository.create(userData)
const savedUser = await userRepository.save(user)

const credentials = new Credential();
credentials.username = userData.username
credentials.password = userData.password
credentials.userId = savedUser.id

const savedCredentials = credentialRepository.save(credentials)

user.credentialsId = (await savedCredentials).id;

const updatedUser = userRepository.save(user)


return updatedUser;
};





export const deleteUserService = async (id:number):Promise<void> => {
 await userRepository.delete(id)

};

export const userLogginService = async (username:string,password:string): Promise<{ login: boolean, user?: User }>=>{
  const credential = await credentialRepository.findOne({where:{username}})

  try {
    if(credential && credential.password === password) {
        const user = await userRepository.findUserByID(credential.userId)
        if(user){
            return {login:true,user};
        } else {
            throw new Error("User not found")
        }
        
    } else {
        return{login:false};
    }
  } catch (error) {
    throw new Error("Server internal error")
  }
};

export const userEditServices = async (userId:number,username:string,email:string,nDni:string)=>{
try {
  
const userToUpdate = await userRepository.findUserByIDWithoutAppointments(userId)

if(!userToUpdate){
  return {success:false,message:"User not found"}
}

userToUpdate.username = username
userToUpdate.email = email
userToUpdate.nDni = nDni

const updatedUser = await userRepository.save(userToUpdate)
return {success:true,user:updatedUser}
} catch (error) {
  console.error("Error al actualizar el usuario:", error);

  return { success: false, error: "Error al actualizar el usuario" };
}

  
}
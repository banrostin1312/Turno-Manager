import { Request, Response } from "express"
import { getUsersService,createUserService,deleteUserService,getUserByIdService, userLogginService, userEditServices} from "../services/userservices"
import { User } from "../entities/User";
import generateJWTToken from "../helpers/generateToken";
import userRepository from "../repositories/userRepository";

export const getUsers = async (req:Request,res:Response)=>{

    try {
    const users: User[] = await getUsersService();
    res.status(200).json(users);

   } catch (error) {
    res.status(500).json({message:"Error al cargar los usuarios"})
   }
}



export const getUserById = async (req:Request,res:Response)=>{
const userId = parseInt(req.params.id);
try {
    const user = await getUserByIdService(userId);
    if(user) {
        res.status(200).json(user);
    } 
} catch (error) {
    res.status(404).json({message:"El Usuario con ese ID no existe"});
}


}




export const createUser = async (req:Request,res:Response)=>{
    const {id,username,email,nDni,password,confirmPassword} = req.body;
    if ( !username ||!password|| !nDni||!email) {
        return res.status(400).json({ message: "Faltan datos. Por favor, proporcione todos los campos necesarios." });
    }
  try {
    const newuser:User = await createUserService({id,username,email,nDni,password,confirmPassword});
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).json({message:"Error al crear el usuario"});
  }
}




export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params; 

    try {
        const user = await getUserByIdService(parseInt(id));
    if (!user) {
        return res.status(404).json({ error: "El usuario no existe" });
    }
    
    await deleteUserService(parseInt(id)); 
    
    res.status(200).json({ message: "Se eliminó el usuario con éxito" });
    } catch (error) {
        res.status(500).json({message:"Usuario a eliminar con ese ID no existe"})
    }
};



export const userLoggin = async (req: Request, res: Response)=>{
  const {username,password} = req.body;

   try {
    const result = await userLogginService(username,password);
    if(result.login){
     if(result.user){
        const token = generateJWTToken(result.user.id)

        res.status(200).json({login:true,user:result.user,token});
     }
    }else{
        res.status(400).json({login:false,mesagge:"invalid Username or password "})
    }
   } catch (error) {
    res.status(500).json({message:"internal Server error"})
   }
}

export const editUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { username, email, nDni } = req.body;
  
    const result = await userEditServices(userId,username, email, nDni);
    
    if (result.success) {
      return res.status(200).json({ message: "Usuario actualizado correctamente", user: result.user });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  };
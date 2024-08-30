import { Request,Response } from "express"
import { editCredentialsServices } from "../services/credentialsServices";


export const editCredentials = async (req:Request,res:Response)=> {
const userId = parseInt(req.params.id);
const{username,password} = req.body

try {
    await editCredentialsServices(userId,username,password)

    res.status(200).json({message:"Crentials upadated Suceffuly"})
} catch (error) {
    res.status(500).json({message:"Error updating credentials"})
}

} 
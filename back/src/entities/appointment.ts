import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({
    name:"appointments"
})

export class Appointment {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"date"})
    date:Date

     @Column({type:"time"})
    time:Date

    @Column()
    status:string 
    
    @Column()
    description:string 

    @Column()
    userId:number
    
    @Column()
    userName:string
   
   
    
    
    @ManyToOne(()=>User,user => user.appointments,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    
    user:User;
}
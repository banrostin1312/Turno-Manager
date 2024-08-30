import { Column, Entity,OneToMany,OneToOne,PrimaryGeneratedColumn,JoinColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./appointment"

@Entity({
    name:"users"
})

export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:100
    })
    username:string

    @Column()
    email:string

    @Column()
    nDni:string

    
    @Column()
    password:string
   

    @Column({nullable:true})
    credentialsId:number

    @OneToOne(()=> Credential,credential => credential.user,{cascade:true})
    @JoinColumn({ name: "credentialsId" })
    credential:Credential;

    @OneToMany(()=> Appointment,appointment => appointment.user,{cascade:true})
    appointments: Appointment[];
}
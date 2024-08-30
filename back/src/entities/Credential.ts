import { Column, Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity({
    name:"credentials"
})

export class Credential {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:50
    })
    username:string

    @Column()
    password:string

    @Column({nullable:true})
    userId:number

    @OneToOne(()=> User,user => user.credential,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:User;
}
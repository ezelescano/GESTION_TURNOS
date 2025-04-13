import {Column, Entity,  JoinColumn,  OneToMany,  OneToOne,  PrimaryGeneratedColumn} from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential";
import { join } from "path";

@Entity({name: "users"})
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length:100})
    name: string

    @Column()
    email:string

    @Column()
    birthday: Date
    
    @Column()
    nDni: number

    @OneToMany(()=>Appointment , (appoiment => appoiment.user))
    appoinment: Appointment[]

    @OneToOne(()=> Credential, (credential) => credential.user)
    @JoinColumn()
    credential: Credential
}


import {Column, Entity,  PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "users"})
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length:100})
    name: string

    @Column()
    email:string

    @Column()
    birthday: string
    
    @Column()
    nDni: number

}


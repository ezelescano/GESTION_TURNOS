import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum UserStatus {
    ACTIVE= "active",
    CANCELED = "canceled"
}

@Entity({name: "appoiments"})
export class Appointment{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("date")
    date: Date

    @Column()
    time: string

    @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus

}
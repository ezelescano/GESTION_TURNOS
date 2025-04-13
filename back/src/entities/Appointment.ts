import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum UserStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
}

@Entity({ name: "appoiments" })
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("date")
  date: Date

  @Column()
  time: string

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus

  @ManyToOne(()=> User, (user)=> user.appoinment )
  user: User
}

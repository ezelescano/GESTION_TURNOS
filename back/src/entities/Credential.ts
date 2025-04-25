import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "credentials" })
export class Credential {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 100 })
  userName: string

  @Column({ length: 50 })
  password: string

  @OneToOne(()=> User, (user)=> user.credential)
  user: User
}


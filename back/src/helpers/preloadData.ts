import {AppDataSource, UserModel  }from "../config/data-source";
import { IUserDataDto } from "../dto/UserDataDto";

const usersPreload = [
    {
      userName: "jdoe",
      password: "password123",
      userData: {
        name: "John Doe",
        email: "johndoe@example.com",
        birthdate: "1990-05-15",
        nDni: 12345678
      }
    },
    {
      userName: "mgarcia",
      password: "securePass",
      userData: {
        name: "Maria Garcia",
        email: "mariagarcia@example.com",
        birthdate: "1988-09-22",
        nDni: 87654321
      }
    },
    {
      userName: "lmartinez",
      password: "pass1234",
      userData: {
        name: "Luis Martinez",
        email: "luismartinez@example.com",
        birthdate: "1995-07-10",
        nDni: 11223344
      }
    },
    {
      userName: "srodriguez",
      password: "superSafe99",
      userData: {
        name: "Sofia Rodriguez",
        email: "sofia@example.com",
        birthdate: "1992-03-18",
        nDni: 55667788
      }
    }
  ];
  

const appoimentsPreload = [
    {
      id: 1,
      date: new Date("2025-04-10"),
      time: "10:00",
      userId: 1,
      status: "pendiente"
    },
    {
      id: 2,
      date: new Date("2025-04-11"),
      time: "15:30",
      userId: 2,
      status: "confirmado"
    },
    {
      id: 3,
      date: new Date("2025-04-12"),
      time: "09:00",
      userId: 3,
      status: "pendiente"
    },
    {
      id: 4,
      date: new Date("2025-04-13"),
      time: "11:45",
      userId: 1,
      status: "confirmado"
    },
    {
      id: 5,
      date: new Date("2025-04-14"),
      time: "14:00",
      userId: 2,
      status: "cancelado"
    }
  ];
  

export const preloadUserData = async () => {
    await AppDataSource.manager.transaction(async (trasactionalEntityManager) =>{
        const user = await UserModel.find();

        // verifico si hay usuarios en la DB
        if(user.length) return console.log("No se realizo la precarga");
        
        // A partir de aca hace la carga de los usuarios
        for await (const user of usersPreload){
           const {userName, password, userData} = user;
           
        }
    })
}
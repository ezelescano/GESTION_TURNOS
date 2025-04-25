export interface IUserDataDto {
    userName: string,
    password: string,
    userData: {
        name: string,
        email: string,
        birthdate: Date,
        nDni: number  
    }  
}
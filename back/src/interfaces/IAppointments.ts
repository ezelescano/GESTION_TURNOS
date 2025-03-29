export interface IAppoiments {
    id: number,
    date: Date,
    time: string,
    userId: number,
    status: "active" | "canceled"
}
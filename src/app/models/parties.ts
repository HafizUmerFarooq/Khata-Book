export interface IParties{
    _id?:number;
    serialNumber:string,
    name:string,
    phone: number,
    address: string,
    detail?: ''
};

export interface IGiveAndTake{
    id?:number;
    date: Date,
    billNumber: number,
    weight?:number,
    price?:number,
    youGave?:number,
    youTake?:number,
    total:number
}
export interface IAddStudent{
    _id?:number;
    studentName: string,
    fatherName: string,
    class: string,
    address: string,
    age: number
};

export interface ISignupInfo{
    name: string;
    email: string;
    password:string;
    role?: any;
};

export interface ILoginInfo{
    email: string;
    password: string;
};
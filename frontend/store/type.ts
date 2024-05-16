export interface UserItem {
    _id: string;
    email: string;
    name: string;
}
export interface ClientItem {
    _id: string;
    name: string;
    email: string;
    type: string;
    questionnaires: [];
    isBlocked: boolean
}
export interface AdminItem {
    _id: string;
    name: string;
    email: string
}
export interface TherapistItem {
    _id: string;
    name:string,
    email:string,
    phone:number,
    licenseNum:string,
    role:string,
}
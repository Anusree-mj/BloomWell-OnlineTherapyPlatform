export interface UserItem {
    id: string;
    email: string;
    name: string;
}
export interface ClientItem {
    id: string;
    name: string;
    email: string;
    type: string;
    questionnaires: [];
}
export interface AdminItem {
    id: string;
    name: string;
    email: string
}
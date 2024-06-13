
import { ClientItem } from "../clients/type";
import { TherapistItem } from "../therapists/type";

export interface AdminItem {
    _id: string;
    name: string;
    email: string
}

export interface ConnectionItems {
    _id: string;
    clientId: ClientItem;
    therapistId: TherapistItem;
    status: string;
    adminVerify: string;
    isActive: boolean;
    description: string;
    reasonForDisconnection: string;
    reasonForRejection: string
}
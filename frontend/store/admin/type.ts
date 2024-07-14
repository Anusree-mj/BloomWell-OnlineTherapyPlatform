
import { ClientItem } from "../clients/type";
import { TherapistItem } from "../therapists/type";

export interface AdminItem {
    _id: string;
    name: string;
    email: string;
    totalEarnings: number;
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

export interface FeedBackItems {
    _id: string;
    userName: string;
    feedback: string;
    userType: string;
}

export interface DashboardItems {
    totalClients: {
        count: number;
        month: string;
    }[];
    totalSubscribedClients: {
        count: number;
        month: string;
    }[];
    totalTherapists: {
        count: number;
        month: string;
    }[];
    totalActiveTherapists: {
        count: number;
        month: string;
    }[];
}

export interface TherapyCountItems {
    _id: string;
    totalCount: number
}

export interface TopTherapistsItem {
    _id: string;
    totalRatings: number,
    therapistId: string,
    therapistName: string,
    therapistImage: string,
    count: number,
    averageRating: number
}

export interface PaymentDetailsItem {
    _id: string,
    therapistId: {
        _id: string,
        name: string
    },
    totalClients: number,
    totalLiveSession: number,
    averageLiveSessionHrs: string,
    totalAmount: number,
    paymentStatus: string,
    name: string,
    updatedAt: string,
}
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
    age: string;
    questionnaires: [];
    sessionType: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    isConnected: string;
    isSubscribed: boolean;
    isBlocked: boolean
}

export interface TherapistItem {
    _id: string;
    name: string,
    email: string,
    phone: number,
    license: LicenseDetails;
    role: string,
    expertise: [],
    experience: string;
    description: string;
    image: string;
    isVerified: boolean;
    verificationStatus: string;
    isBlocked: boolean;
    averageRating?: number
}

export interface LicenseDetails {
    licenseNo: string;
    country?: string;
    licenseProof?: string;
    expirationDate?: Date;
}

export interface ReviewItems {
    comments: string;
    clientName: string;
}

export interface ConnectionItems {
    _id: string;
    clientId: ClientItem;
    therapistId: TherapistItem;
    status: string;
    adminVerify: string;
    isActive: boolean;
}

export interface AdminItem {
    _id: string;
    name: string;
    email: string
}

export interface ClientConnection {
    therapistId: TherapistItem;
    isActive: boolean,
}

export interface ClientOngoingActivityItem {
    _id: string,
    date: string,
    time: string,
    duration: string,
    remarks: string,

}
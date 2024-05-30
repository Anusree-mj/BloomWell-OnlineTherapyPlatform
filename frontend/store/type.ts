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
    isBlocked: boolean
}
export interface AdminItem {
    _id: string;
    name: string;
    email: string
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
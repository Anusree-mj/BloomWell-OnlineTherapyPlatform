export interface LicenseDetails {
    licenseNo: string;
    country: string;
    licenseProof: string;
    expirationDate: Date;
}

export interface ReviewItems {
    comments: string;
    clientName: string;
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
    isActive:boolean;
    verificationStatus: string;
    isBlocked: boolean;
    averageRating?: number;
    gender: string;
    reasonForRejection?: string;
}

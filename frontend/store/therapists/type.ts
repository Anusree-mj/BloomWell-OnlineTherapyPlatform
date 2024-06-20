export interface LicenseDetails {
    licenseNo: string;
    country: string;
    licenseProof: string;
    expirationDate: Date;
}

export interface ReviewItems {
    _id: string;
    comments: string;
    clientId: {
        _id: string;
        name: string
    };
    rating: number;
    createdAt: string;
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
    isActive: boolean;
    verificationStatus: string;
    isBlocked: boolean;
    averageRating?: number;
    gender: string;
    reasonForRejection?: string;
    reasonForQuiting?: string;
}

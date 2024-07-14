export interface LicenseDetails {
    licenseNo: string;
    country: string;
    licenseProof: string;
    expirationDate: Date;
}

export interface ReviewItems {
    clientName: string;
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
    totalClients: Number,
    totalLiveSessionPerMonth: Number,
    isMonthlyPaid:Boolean
}

export interface ScheduleItems {
    _id: string;
    clientId: {
        _id: string,
        name: string
    };
    date: string;
    time: string;
    verificationStatus: string;
    status: string;

}

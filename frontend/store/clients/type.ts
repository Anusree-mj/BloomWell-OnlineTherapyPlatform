export interface ClientItem {
    _id: string;
    name: string;
    email: string;
    type: string;
    age: string;
    questionnaire: [];
    sessionType: string;
    isConnected: boolean;
    isAnUser: boolean;
    isSubscribed: boolean;
    isBlocked: boolean;
    connectionDetails: {
        _id: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string
    };
    therapistDetails: {
        _id: string;
        name: string;
    }
    subscription: {
        stripeCustomerId: string;
        stripeSubscriptionId: string;
        stripePriceId: string;
        stripeCurrentPeriodEnd: string;
        stripeCurrentPeriodStart: string;
        stripeTrialEnd: string;
        amount: number;
        status: string;
    };
    isActiveSlots: boolean;
    activeSlotId: string;
    description: string;
    remarks: string
}

export interface BookedSlotsItems {
    _id: string,
    therapistId: string,
    date: string,
    time: string,
    verificationStatus: string,
    status: string,
    sessionStart: string,
    sessionEnd: string,
    sessionDuration: string,
}

export interface ClientAllConnectionItems {
    _id: string,
    therapistId: {
        _id: string,
        name: string
    },
    status: string,
    adminVerify: string,
    description: string,
    isActive: boolean,
    reasonForDisconnection: string,
    reasonForRejection: string
}
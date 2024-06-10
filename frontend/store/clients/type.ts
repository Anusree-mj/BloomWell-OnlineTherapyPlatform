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
    }
}

export interface ClientOngoingActivityItem {
    _id: string,
    date: string,
    time: string,
    duration: string,
    remarks: string,

}


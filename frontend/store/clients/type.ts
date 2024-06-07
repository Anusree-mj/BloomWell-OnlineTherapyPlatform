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
}

export interface ClientOngoingActivityItem {
    _id: string,
    date: string,
    time: string,
    duration: string,
    remarks: string,

}


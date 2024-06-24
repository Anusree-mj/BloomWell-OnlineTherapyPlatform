export interface UserItem {
    _id: string;
    email: string;
    name: string;
}

export interface NotificationItem {
    _id: string;
    head: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface ChatItem {
    _id: string;
    senderId: string;
    senderType: string;
    recieverId: string;
    recieverType: string;
    message: string;
    isRead: boolean;
    createdAt: string
}





export interface UserCardProps {
    item: Item;
}

export interface IMessageCard {
    text: string;
    date: string;
    direction: string;
}

export type TypeItem = {
    firstName: string;
    lastName: string;
    id: number;
}

export interface IMessage {
    text: string;
    createdAt: string;
    receiverId: string;
}
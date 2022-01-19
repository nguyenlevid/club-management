import { EventPhoto } from "./eventPhoto";

export interface ClubEvent {
    id: number;
    title: string;
    photoUrl: string;
    eventCode: string;
    purpose: string;
    teamInCharge: string;
    postingDate: Date;
    draftDeadline: Date;
    specifications: string;
    photos: EventPhoto[];
}
import { Photo } from "./photo";

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    team: string;
    introduction: string;
    email: string;
    phone: string;
    lastActive: Date;
    gender: string;
    class: string;
    photos: Photo[];
}
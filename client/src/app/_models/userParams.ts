import { User } from "./user";

export class UserParams {
    gender: string;
    team: string;
    pageNumber = 1;
    pageSize = 12;
    orderBy = 'lastActive';

    constructor(user: User) {
        this.team = "all";
    }
}
import { BaseUser } from "./user.model";

export interface ListUser extends BaseUser {
    fullName?: string; 
}
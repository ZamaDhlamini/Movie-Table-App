import { createContext } from 'react';

export interface IUser{
    FirstName: string,
    SurName: string,
    UserName: string,
    Password: string,
    PhoneNumber: number,
    EmailAddress: string,

}

export interface IUserStateContext{
    readonly UserCreated?: IUser;

}

export const INITIAL_STATE: IUserStateContext = {}

export interface IUserActionContext{
    createUser?:(payload:IUser) => void;

}

const UserContext = createContext<IUserStateContext>(INITIAL_STATE)
const UserActionContext = createContext<IUserActionContext>({})

export {UserContext, UserActionContext};
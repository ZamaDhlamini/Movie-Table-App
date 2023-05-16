import { IUser, IUserStateContext, ILogin } from "./context";
import {createAction} from "redux-actions";


export enum UserActionEnum{
    CreateUserRequest = 'CREATE',
    LoginRequest = 'LOGIN'
}

export const CreateUserRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.CreateUserRequest, (UserCreated) => ({UserCreated}));
export const LoginRequestAction = createAction<IUserStateContext, ILogin>(UserActionEnum.LoginRequest, (Login) => ({Login}));
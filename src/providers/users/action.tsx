import { IUser, IUserStateContext } from "./context";
import {createAction} from "redux-actions";


export enum UserActionEnum{
    CreateUserRequest = 'CREATE'
}

export const CreateUserRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.CreateUserRequest, () => ({}));
import { UserActionEnum } from "./action";
import { IUserStateContext } from "./context";

export function UseReducer(incomingState: IUserStateContext, action: ReduxActions.Action<IUserStateContext>): IUserStateContext{
    const {type, payload} = action;

    switch (type){
        case UserActionEnum.CreateUserRequest:
            return {...incomingState, ...payload};
            default:
                return incomingState;
    }

}
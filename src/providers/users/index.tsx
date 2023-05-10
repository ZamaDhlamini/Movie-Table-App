import { INITIAL_STATE, IUser, UserContext } from "./context";
import { PropsWithChildren, useReducer } from "react";

const UserProvider: FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(useReducer, INITIAL_STATE);

    const createUser = async (payload:IUser) => {
        
    }
}
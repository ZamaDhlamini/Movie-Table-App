// import { CreateUserRequestAction } from "./action";
// import { INITIAL_STATE, IUser, UserContext, UserActionContext } from "./context";
// import { FC, PropsWithChildren, useReducer } from "react";
// import { UseReducer } from "./reducer";

// const UserProvider: FC<PropsWithChildren> = ({children}) => {
//     const [state, dispatch] = useReducer(useReducer, INITIAL_STATE);

//     const createUser = async (payload:IUser) => {
//         await fetch('https://localhost:44311/api/services/app/Person/Create', {
//             method: 'POST',
//             cache: 'no-cache',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload)
//         }).then(res => {
//             res.json().then(data => {
//                 dispatch(CreateUserRequestAction(payload));
//             })
//         })
//         }

//         return(
//             <UserContext.Provider value={state}>
//                <UserActionContext.Provider value={createUser}>
//                     {children}
//                </UserActionContext.Provider>
//             </UserContext.Provider>
//         )
//     }
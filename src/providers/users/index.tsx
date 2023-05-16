import { CreateUserRequestAction, LoginRequestAction } from "./action";
import { INITIAL_STATE, IUser, UserContext, UserActionContext, ILogin } from "./context";
import React, { FC, PropsWithChildren, useReducer } from "react";
import { UserReducer } from "./reducer";

const UserProvider: FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    const createUser = async (payload:IUser) => {
        await fetch('https://localhost:44311/api/services/app/Person/Create', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(res => {
            res.json().then(data => {
                dispatch(CreateUserRequestAction(data.request))
                if(res.status === 200){
                    console.log(res.status)
                    window.location.href='/'
                }  
            })
        })
        }

        const login = async (payload: ILogin) => {
            await fetch ('https://localhost:44311/api/TokenAuth/Authenticate', {

            method: 'POST',
            cache: "no-cache",
            headers:{
                'content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            }).then(res => {
                res.json().then(data =>{
                    localStorage.setItem('token', data.result.accessToken);
                    dispatch(LoginRequestAction(data.request))
                    if(res.status === 200){
                        console.log(res.status)
                        window.location.href='/MovieTable'
                    }
                })
            })
             
        }

        return(
            <UserContext.Provider value={state}>
                <UserActionContext.Provider value={{createUser, login}}>
                    {children}
                </UserActionContext.Provider>
            </UserContext.Provider>
        )
    }
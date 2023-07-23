import { createContext } from "react"
import { useReducer } from "react";
import { useEffect } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {user: null, isFetching: false, error: false}

export const UserContext = createContext(INITIAL_STATE);
export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE, ()=> {
        const localData = localStorage.getItem('state');
        return localData ? JSON.parse(localData) : INITIAL_STATE;
    });
    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state))
    }, [state]);
    return (
        <UserContext.Provider value={{user:state.user, isFetching:state.isFetching, error:state.error, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
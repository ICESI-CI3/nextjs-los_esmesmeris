import {createStore} from 'zustand'

export type UserInfoState=  {
    role: string,
    id: string,
    isAuthenticated: boolean

}

export type UserInfoActions=  {
    setRole: (newRole:string) =>void; 
    setId: (newId:string) =>void; 
    setIsAuthenticated: (newIsAuthenticated:boolean) =>void; 
}

export type UserInfoStore = UserInfoState & UserInfoActions;


export const defaultInitState: UserInfoState = {
    role: "",
    id: "",
    isAuthenticated: false,
}

export const createCounterStore = (initState: UserInfoState =defaultInitState) => 
{
    return createStore<UserInfoState>((set, get)=>({
        ...initState,
        setRole: (newRole:string)=> set({role:newRole}),
        setId: (newId:string)=> set({id:newId}),
        setIsAuthenticated: (newIsAuthenticated:boolean)=> set({isAuthenticated:newIsAuthenticated})
    }))
}

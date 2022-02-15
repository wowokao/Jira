import React, {ReactNode} from "react";
import * as auth from 'auth-provider'
import {User} from "screens/project-list/search-panel";
import {http} from "utils/http";
import {useMount} from "utils";
import {useAsync} from "../utils/use-async";
import {FullPageError, FullPageLoading} from "../components/lib";

interface AuthForm {
    username: string,
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http("me", {token})
        user = data.user
    }
    return user
}


const AuthContext = React.createContext<| {
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'


export const AuthProvider = ({children}: { children: ReactNode }) => {

    const {data: user,error, isError, isLoading, isIdle, run, setData: setUser} = useAsync<User | null>()
    // FP point free style
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
        run(bootstrapUser())
    })
    if(isIdle || isLoading){
        return <FullPageLoading/>
    }
    if(isError){
        return <FullPageError error={error}/>
    }
    return <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) throw new Error('useAuth must with AuthProvider')
    return context
}
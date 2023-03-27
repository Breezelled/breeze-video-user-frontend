import {useRouter} from "next/router";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import requests from "@/utils/requests";
import {User, AuthProviderProps, IAuth} from "@/hooks/data";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    error: null,
    loading: false
})

export const AuthProvider = ({children}: AuthProviderProps ) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [initailLoading, setInitailLoading] = useState(true)
    const router = useRouter()

    // TODO Authentication Not Done Yet
    // useEffect(() => onAuthStateChanged(auth, (user: User) => {
    //     if (user) {
    //         setUser(user)
    //         setLoading(false)
    //     } else {
    //         setUser(null)
    //         setLoading(true)
    //         router.push("/login")
    //     }
    //     setInitailLoading(false)
    // }), [auth]);

    const signUp = async (email:string, password:string) => {
        setLoading(true)
        await fetch(requests.signUp, {
            method: 'post',
            body: JSON.stringify({'email': email, 'password': password}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then((res) => res.json()).then((data: User) => {
            setUser(data)
            router.push("/")
            setLoading(false)
        }).catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const signIn = async (email:string, password:string) => {
        setLoading(true)
        await fetch(requests.signIn, {
            method: 'post',
            body: JSON.stringify({'email': email, 'password': password}),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then((res) => res.json()).then((data: User) => {
            setUser(data)
            router.push("/")
            setLoading(false)
        }).catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const logOut = async () => {
        setLoading(true)
        await fetch(requests.logOut)
            .then(() => setUser(null))
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const memoValue = useMemo(() => ({
        user, signUp, signIn, logOut, error, loading
    }), [user, loading, error])

    return <AuthContext.Provider value={memoValue}>
        {!initailLoading && children}
    </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}
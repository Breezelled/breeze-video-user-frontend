import React from "react";

export interface User {
    username: string
    phone: string
    nickname: string
    intro: string
    gender: string
    email: string
    // createTime:
}

export interface AuthProviderProps {
    children: React.ReactNode
}

export interface IAuth {
    user: User | null
    signUp: (email:string, password: string) => Promise<void>
    signIn: (email:string, password: string) => Promise<void>
    logOut: () => Promise<void>
    error: string | null
    loading: boolean
}
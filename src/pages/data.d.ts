import {Info} from "@/data";

// home page
export interface Props {
    banner: Info[]
    topRated: Info[]
    actionMovies: Info[]
    comedyMovies: Info[]
}

// login page
export interface LoginImage {
    loginImage: string
}
export interface Inputs {
    email: string
    password: string
}

// TODO not finish
export interface User {
    username: string
    phone: string
    nickname: string
    intro: string
    gender: string
    email: string
    // createTime:
}
import {Genre, Info} from "@/types/data";

// home page
export interface Props {
    banner: Info[]
    topRated: Info[]
    actionMovies: Info[]
    comedyMovies: Info[]
    genres: Genre[]
}

// login page
export interface LoginImage {
    loginImage: string
}
export interface Inputs {
    email: string
    password: string
}

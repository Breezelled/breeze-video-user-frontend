import {atom} from "recoil";
import {Info} from "@/data";

export const modalState = atom({
    key: 'modalState',
    default: false,
})

export const videoState = atom<Info | null>({
    key: 'videoState',
    default: null,
})
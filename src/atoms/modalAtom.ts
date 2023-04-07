import {atom} from "recoil";
import {Info} from "@/types/data";

export const modalState = atom({
    key: 'modalState',
    default: false,
})

export const videoState = atom<Info | null>({
    key: 'videoState',
    default: null,
})
import {atom} from "recoil";
import {Info} from "@/types/data";

export const listState = atom<Info[]>({
    key: 'listState',
    default: [],
});

export const likeState = atom<Info[]>({
    key: 'likeState',
    default: [],
});
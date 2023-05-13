import {atom} from "recoil";
import {Info} from "@/types/data";

// favorite list
export const listState = atom<Info[]>({
    key: 'listState',
    default: [],
});

export const likeState = atom<Info[]>({
    key: 'likeState',
    default: [],
});

export const listPageState = atom<Info[]>({
    key: 'listPageState',
    default: [],
});
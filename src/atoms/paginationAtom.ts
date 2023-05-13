import {atom} from "recoil";
import {Pagination} from "@/pages/data";

export const listPaginationState = atom<Pagination | null>({
    key: 'listPaginationState',
    default: null,
})

export const isPostState = atom<boolean>({
    key: "isPostState",
    default: false
})

export const postContentState = atom<{}>({
    key: "postContentState",
    default: {}
})


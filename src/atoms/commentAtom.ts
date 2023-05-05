import {atom} from "recoil";
import {Comment} from "@/components/Comment/data";

export const commentState = atom<Comment[]>({
    key: 'commentState',
    default: [],
});
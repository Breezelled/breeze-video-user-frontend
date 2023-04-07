import {atom} from "recoil";

export const interestState = atom<string[]>({
    key: 'interestState',
    default: [],
});
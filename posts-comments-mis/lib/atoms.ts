import { atom } from "recoil";

export const postId = atom<number>({
    key: 'postId',
    default: 1,
 });
 
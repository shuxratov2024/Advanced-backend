import {create} from "zustand"

type CreatePostStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () =>void;
}


export const UseCreatePost= create<CreatePostStore>(set=> ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))
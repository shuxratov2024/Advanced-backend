

import {create} from 'zustand';
import type { IPost } from './../interface/index';

type ConfirmStore = {
    isOpen: boolean;
    post:IPost
    onOpen: () => void
    onClose: () => void
    setPost : (post:IPost) => void
}

export const useConfirm = create<ConfirmStore>( set => ({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false}),
    post: {} as IPost,
    setPost: (post: IPost) => set({post})

}))
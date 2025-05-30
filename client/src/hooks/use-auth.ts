
import { create } from 'zustand';
import type { AuthType, } from './../interface/index';

type AuthStore = {
    authState: AuthType
    setAuth: (state: AuthType) => void

}

export const useAuth = create<AuthStore>(set => ({
    authState: "login",
    setAuth: (state) => set(() => ({ authState: state })),
}))
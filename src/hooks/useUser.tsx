import { create } from "zustand";
interface IUseUser {
    isUser: boolean,
    setUser: (bo: boolean) => void,
    token: string,
    setToken: (tok: string) => void
}
export const useUser = create<IUseUser>((set) => ({
    isUser: false,
    setUser: (bo: boolean) => set({ isUser: bo }),
    token: '',
    setToken: (tok: string) => set({ token: tok })
}));
import { create } from "zustand";
interface IUseUser {
    isUser: boolean,
    setUser: (bo: boolean) => void,
}
export const useUser = create<IUseUser>((set) => ({
    isUser: false,
    setUser: (bo: boolean) => set({isUser: bo})
}));
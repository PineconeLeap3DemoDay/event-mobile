import { create } from "zustand";
interface IUseTheme {
    isDark: boolean,
    setTheme:(theme: boolean) => void
}

export const useTheme = create<IUseTheme>((set) => ({
    isDark: true,
    setTheme: (theme:boolean) => set({isDark: theme})
}));
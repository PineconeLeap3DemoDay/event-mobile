import { create } from "zustand";

interface IUseShadow {
    isOpen: boolean,
    setOpen:(a: boolean) => void
}

const useShadow = create<IUseShadow>((set) => ({
    isOpen: false,
    setOpen: (open: boolean) => set({isOpen: open})
}));
export default useShadow;
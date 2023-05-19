import { create } from "zustand";
export interface IModal {
    open: boolean,
    setOpen: (op: boolean) => void,
    onClose: () => void
}

const useModal = create<IModal>((set) => {
    return({
        open:false,
        setOpen: (op: boolean) => set({open: op}),
        onClose: () => set({open: false}),
    })
});
export default useModal;
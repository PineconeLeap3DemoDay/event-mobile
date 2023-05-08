import { create } from "zustand"

type IUseRefetch = {
    isFetch: boolean,
    setIsFetch: (a: boolean) => void
}
const useRefetch = create<IUseRefetch>((set) => ({
    isFetch: false,
    setIsFetch: (a: boolean) => {
        set({ isFetch: a })
    }
}))
export default useRefetch
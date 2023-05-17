import { create } from "zustand";
import { getnextday } from "./useDay";
type ISearch = {
    to: string,
    setTo: (toParam: string) => void,
    country: {
        id: string,
        label: string
    },
    city: {
        id: string,
        label: string
    },
    setCountry: (countryParam: { label: string, id: string }) => void,
    setCity: (cityParam: { label: string, id: string }) => void
}
export const useSearch = create<ISearch>((set) => {
    return ({
        to: getnextday(new Date()).toISOString().slice(0, 10),
        setTo: (toParam: string) => set({ to: toParam }),
        country: {
            label: 'Монгол',
            id: '6463159b2d2f1e3a26a496ad'
        },
        city: {
            label: "Улаанбаатар",
            id:'64631713aef5cb234f8e5bd8'
        },
        setCountry: (countryParam: { label: string, id: string }) => set({
            country: {
                label: countryParam?.label,
                id: countryParam?.id
            }
        }),
        setCity: (cityParam: { label: string, id: string }) => set({
            city: {
                label: cityParam?.label,
                id: cityParam?.id
            }
        })
    })
});